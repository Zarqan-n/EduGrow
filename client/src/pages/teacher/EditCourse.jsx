import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FileUpload from "../../components/common/FileUpload";
import { courseService } from "../../services/courseService";
import Toast from "../../components/common/Toast";
import Loader from "../../components/common/Loader";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Course Details State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    timing: "Evening",
    duration: "",
    classes: "",
    language: "English",
  });
  const [files, setFiles] = useState({
    thumbnail: null,
    demoVideo: null,
  });

  // Sections State
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({
    topic: "",
    duration: "",
    videoUrl: null,
  });
  const [editingSection, setEditingSection] = useState(null);
  const [editSectionData, setEditSectionData] = useState({
    topic: "",
    duration: "",
  });

  // UI State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await courseService.getCourseById(id);
      const course = response.data.data;
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        timing: course.timing,
        duration: course.duration,
        classes: course.classes || course.section?.length || 0,
        language: course.language,
      });
      setSections(course.section || []);
    } catch (error) {
      showToastMessage("Failed to load course", "error");
    } finally {
      setLoading(false);
    }
  };

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // Course Details Handlers
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();
      form.append("courseId", id);
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      if (files.thumbnail) form.append("thumbnail", files.thumbnail);
      if (files.demoVideo) form.append("demoVideo", files.demoVideo);

      await courseService.updateCourse(form);
      showToastMessage("Course details updated successfully", "success");
      setFiles({ thumbnail: null, demoVideo: null });
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Failed to update course", "error");
    } finally {
      setSaving(false);
    }
  };

  // Section Handlers
  const handleNewSectionChange = (e) => {
    const { name, value } = e.target;
    setNewSection({ ...newSection, [name]: value });
  };

  const handleVideoFileChange = (e) => {
    setNewSection({ ...newSection, videoUrl: e.target.files[0] });
  };

  const handleCreateSection = async (e) => {
    e.preventDefault();
    if (!newSection.topic || !newSection.duration || !newSection.videoUrl) {
      showToastMessage("All section fields are required", "error");
      return;
    }

    // Validate video file
    if (!(newSection.videoUrl instanceof File)) {
      showToastMessage("Invalid video file", "error");
      return;
    }

    setSaving(true);
    try {
      const form = new FormData();
      form.append("topic", newSection.topic);
      form.append("duration", newSection.duration);
      form.append("courseId", id);
      form.append("videoUrl", newSection.videoUrl);

      console.log("Creating section with:", {
        topic: newSection.topic,
        duration: newSection.duration,
        courseId: id,
        videoFileName: newSection.videoUrl.name,
      });

      const response = await courseService.createSection(form);
      console.log("Section created successfully:", response.data);
      
      showToastMessage("Section created successfully", "success");

      // Reset form
      setNewSection({ topic: "", duration: "", videoUrl: null });
      
      // Refresh sections
      const updatedCourse = await courseService.getCourseById(id);
      setSections(updatedCourse.data.data.section || []);
    } catch (err) {
      console.error("Error creating section:", err);
      const errorMessage = err.response?.data?.message || err.message || "Failed to create section";
      showToastMessage(errorMessage, "error");
    } finally {
      setSaving(false);
    }
  };

  const handleEditSectionOpen = (section) => {
    setEditingSection(section._id);
    setEditSectionData({
      topic: section.topic,
      duration: section.duration,
    });
  };

  const handleEditSectionChange = (e) => {
    const { name, value } = e.target;
    setEditSectionData({ ...editSectionData, [name]: value });
  };

  const handleUpdateSection = async (sectionId) => {
    if (!editSectionData.topic || !editSectionData.duration) {
      showToastMessage("Topic and Duration are required", "error");
      return;
    }

    setSaving(true);
    try {
      await courseService.updateSection({
        sectionId: sectionId,
        courseId: id,
        topic: editSectionData.topic,
        duration: editSectionData.duration,
      });

      showToastMessage("Section updated successfully", "success");
      setEditingSection(null);

      // Refresh sections
      const updatedCourse = await courseService.getCourseById(id);
      setSections(updatedCourse.data.data.section || []);
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Failed to update section", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm("Are you sure you want to delete this section?")) {
      return;
    }

    setSaving(true);
    try {
      await courseService.deleteSection({
        sectionId: sectionId,
        courseId: id,
      });

      showToastMessage("Section deleted successfully", "success");
      setSections(sections.filter((s) => s._id !== sectionId));
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Failed to delete section", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Course Details Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6 pb-6 border-b-2 border-indigo-200">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Course</h1>
            <p className="text-gray-600">Update your course details and manage sections</p>
          </div>

          <form onSubmit={handleCourseSubmit} className="space-y-6">
            {/* Row 1: Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleCourseChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Row 2: Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleCourseChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Row 3: Price & Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleCourseChange}
                  required
                  min="0"
                  max="20000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleCourseChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Marathi">Marathi</option>
                </select>
              </div>
            </div>

            {/* Row 4: Timing, Duration & Classes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Timing
                </label>
                <select
                  name="timing"
                  value={formData.timing}
                  onChange={handleCourseChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  placeholder="e.g., 30 hours"
                  value={formData.duration}
                  onChange={handleCourseChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Classes/Sections
                </label>
                <input
                  type="number"
                  name="classes"
                  value={formData.classes}
                  onChange={handleCourseChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">
                  Auto-calculated from sections ({sections.length})
                </p>
              </div>
            </div>

            {/* Row 5: Thumbnails & Demo Video */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload
                label="Course Thumbnail (Optional)"
                accept="image/*"
                onChange={(e) =>
                  setFiles({ ...files, thumbnail: e.target.files[0] })
                }
              />
              <FileUpload
                label="Demo Video (Optional)"
                accept="video/*"
                onChange={(e) =>
                  setFiles({ ...files, demoVideo: e.target.files[0] })
                }
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Course Changes"}
            </button>
          </form>
        </div>

        {/* Sections Management Section */}
        <div className="space-y-8">
          {/* Existing Sections */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6 pb-6 border-b-2 border-green-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Course Sections</h2>
              <p className="text-gray-600">
                Total Sections: <span className="font-bold text-indigo-600">{sections.length}</span>
              </p>
            </div>

            {sections.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">No sections added yet</p>
                <p className="text-gray-400 text-sm">Create your first section below</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div
                    key={section._id}
                    className="border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition"
                  >
                    {editingSection === section._id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Topic
                            </label>
                            <input
                              type="text"
                              name="topic"
                              value={editSectionData.topic}
                              onChange={handleEditSectionChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Duration
                            </label>
                            <input
                              type="text"
                              name="duration"
                              value={editSectionData.duration}
                              onChange={handleEditSectionChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleUpdateSection(section._id)}
                            disabled={saving}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                          >
                            {saving ? "Saving..." : "Save"}
                          </button>
                          <button
                            onClick={() => setEditingSection(null)}
                            className="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-bold">
                              {index + 1}
                            </span>
                            <h3 className="text-lg font-bold text-gray-800">
                              {section.topic}
                            </h3>
                          </div>
                          <p className="text-gray-600 ml-11">
                            Duration: <span className="font-semibold">{section.duration}</span>
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditSectionOpen(section)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSection(section._id)}
                            disabled={saving}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-semibold disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Create New Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Section</h2>

            <form onSubmit={handleCreateSection} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Section Topic *
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={newSection.topic}
                    onChange={handleNewSectionChange}
                    placeholder="e.g., Introduction to React"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={newSection.duration}
                    onChange={handleNewSectionChange}
                    placeholder="e.g., 2 hours"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Section Video *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoFileChange}
                    required
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {newSection.videoUrl
                      ? `Selected: ${newSection.videoUrl.name}`
                      : "Click to select a video file"}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50"
              >
                {saving ? "Creating..." : "Create Section"}
              </button>
            </form>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/teacher/my-courses")}
            className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
          >
            Back to My Courses
          </button>
        </div>
      </div>
    </div>
  );
}
