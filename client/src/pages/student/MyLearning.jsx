import { useState, useEffect } from "react";
import CourseCard from "../../components/cards/CourseCard";
import { userService } from "../../services/userService";

export default function MyLearning() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await userService.getMyStudentCourses();
      setCourses(response.data.modifiedData || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-white mb-8">
          My Learning Path
        </h1>

        {/* Filter Tabs */}
        <div className="mb-8 flex gap-4">
          {["all", "in-progress", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filter === f
                  ? "bg-primary-600 text-white"
                  : "bg-white/10 text-cyan-100 border border-white/10 hover:border-cyan-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-12 text-cyan-100">Loading courses...</div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                ctaPath={`/paidcourse/${course._id}`}
                ctaLabel="Start Learning"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-panel rounded-3xl">
            <p className="text-cyan-100">No courses found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
