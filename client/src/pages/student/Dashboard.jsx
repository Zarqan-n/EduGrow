import { useState, useEffect } from "react";
import CourseCard from "../../components/cards/CourseCard";
import { userService } from "../../services/userService";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Backend: GET /api/user/getMyStudentCourse
      // Returns user with populated activity.enrolledcourses
      const coursesRes = await userService.getMyStudentCourses();
      const userData = coursesRes.data.modifiedData;
      const enrolledCourses = coursesRes.data.modifiedData || [];
      setCourses(enrolledCourses);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">My Learning</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-bg-pale rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Courses</p>
            <p className="text-3xl font-bold text-primary-600">
              {courses.length}
            </p>
          </div>
          <div className="bg-bg-pale rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Enrolled</p>
            <p className="text-3xl font-bold text-secondary-600">
              {courses.length}
            </p>
          </div>
          <div className="bg-bg-pale rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Status</p>
            <p className="text-3xl font-bold text-green-600">Active</p>
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
                <CourseCard
                  key={course._id}
                  course={course}
                  ctaPath={`/paidcourse/${course._id}`}
                  ctaLabel="Start Learning"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-bg-pale rounded-lg">
              <p className="text-gray-600 mb-4">
                You haven't enrolled in any courses yet
              </p>
              <a
                href="/courses"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                Explore Courses
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
