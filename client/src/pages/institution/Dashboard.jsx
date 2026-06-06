import { useState, useEffect } from "react";
import JobCard from "../../components/cards/JobCard";
import { userService } from "../../services/userService";

export default function InstitutionDashboard() {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await userService.getMyInstituion();
      const userData = response.data.data;
      const institutionJobs = userData?.activity?.job || [];
      // console.log(userData.profile);
      // console.log(institutionJobs);
      setJobs(
        institutionJobs.map((j) => ({
          ...j,
          userId: { profile: userData.profile },
        })),
      );

      setStats({
        totalJobs: institutionJobs.length,
        activeJobs: institutionJobs.filter((j) => j.isActive).length,
        totalApplications: institutionJobs.reduce(
          (sum, j) => sum + (j.applicants?.length || 0),
          0,
        ),
      });
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 justify-between items-start md:flex-row">
          <h1 className="text-4xl font-bold text-gray-100">
            Institution Dashboard
          </h1>
          <div className="flex gap-3">
            <a
              href="/institution/create-job"
              className="px-10 text-nowrap py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Post Job
            </a>
            <a
              href="/institution/my-jobs"
              className="px-10 text-nowrap py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              My Job
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-bg-pale rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Jobs</p>
            <p className="text-3xl font-bold text-primary-600">
              {stats.totalJobs}
            </p>
          </div>
          <div className="bg-bg-pale rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Active Jobs</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.activeJobs}
            </p>
          </div>
          <div className="bg-bg-pale rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Applications</p>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalApplications}
            </p>
          </div>
        </div>

        {/* My Jobs */}
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-6">
            My Job Postings
          </h2>

          {loading ? (
            <div className="text-center py-12">Loading jobs...</div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-transparent rounded-lg shadow overflow-hidden"
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-bg-pale rounded-lg">
              <p className="text-gray-600 mb-4">
                You haven't posted any jobs yet
              </p>
              <a
                href="/institution/create-job"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                Post Your First Job
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
