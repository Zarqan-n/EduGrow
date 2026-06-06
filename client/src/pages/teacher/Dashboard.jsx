import { useState, useEffect } from "react";
import CourseCard from "../../components/cards/CourseCard";
import { courseService } from "../../services/courseService";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Backend: GET /api/user/getMyTeacherCourse
      // Returns user with populated activity.courses
      const response = await courseService.getMyTeacherCourses();
      const userData = response.data.modifiedData;
      const teacherCourses = userData || [];
      setCourses(teacherCourses);

      const totalEnrolled = teacherCourses.reduce(
        (sum, c) => sum + (c.enrolledStudentsCount || 0),
        0,
      );
      setStats({
        totalCourses: teacherCourses.length,
        totalEnrolled,
      });
    } catch (error) {
      console.error("Error fetching teacher dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col lg:flex-row gap-6 justify-between items-center">
          <h1 className="text-4xl font-bold text-white">
            Teaching Dashboard
          </h1>
          <div className="flex gap-3">
            <a
            href="/teacher/create-course"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Create New Course
          </a>
          <a
            href="/teacher/my-courses"
            className="px-6 py-3 bg-gray-200 text-cyan-900 font-semibold rounded-lg hover:bg-primary-700 hover:text-white transition"
          >
            My Courses
          </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-bg-pale rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Courses</p>
            <p className="text-3xl font-bold text-primary-600">
              {stats.totalCourses}
            </p>
          </div>
          <div className="bg-bg-pale rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Students Enrolled</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.totalEnrolled}
            </p>
          </div>
        </div>

        {/* My Courses */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">My Courses</h2>

          {loading ? (
            <div className="text-center py-12">Loading courses...</div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="relative">
                  <CourseCard course={course} />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <a
                      href={`/teacher/edit-course/${course._id}`}
                      className="p-2 bg-bg-pale rounded-lg shadow hover:shadow-lg transition"
                    >
                      <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </a>
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
                Create Your First Course
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
