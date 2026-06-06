import { useState, useEffect } from "react";
import CourseCard from "../../components/cards/CourseCard";
import { courseService } from "../../services/courseService";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getMyTeacherCourses();
      const userData = response.data.modifiedData;
      setCourses(userData || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 items-start md:flex-row ">
          <h1 className="text-4xl font-bold text-gray-100">My Courses</h1>
          <a
            href="/teacher/create-course"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Create Course
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading courses...</div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="relative group">
                <CourseCard course={course} />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition rounded-lg flex items-end justify-center gap-2 p-4 opacity-0 group-hover:opacity-100">
                  <a
                    href={`/teacher/edit-course/${course._id}`}
                    className="flex-1 px-4 py-2 bg-bg-pale text-gray-900 rounded hover:bg-bg-sage transition text-center font-semibold"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => alert("Delete functionality coming soon")}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-bg-pale rounded-lg">
            <p className="text-gray-600 mb-4">
              You haven't created any courses yet
            </p>
            <a
              href="/teacher/create-course"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Create Course
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
