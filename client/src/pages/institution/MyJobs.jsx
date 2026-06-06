import { useState, useEffect } from "react";
import JobCard from "../../components/cards/JobCard";
import { jobService } from "../../services/jobService";
import { userService } from "../../services/userService";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
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
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (jobId) => {
    try {
      await jobService.changeJobActive(jobId);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await jobService.deleteJob(jobId);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-bg-cream py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-end">
          <h1 className="text-4xl font-bold text-gray-100">My Job Postings</h1>
          <a
            href="/institution/create-job"
            className="px-6 py-3 text-nowrap bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Post New Job
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading jobs...</div>
        ) : jobs.length > 0 ? (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job._id} className=" bg-cyan-950 rounded-lg shadow p-4">
                <div className="flex flex-col justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {job.title}
                    </h3>
                    <p className="text-sm flex justify-between gap-4 text-gray-400">
                      ₹{job.salary}/month • {job.timing}
                    </p>
                  </div>
                  <p className="text-gray-500 text-sm">{job.description}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleActive(job._id)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                        job.isActive
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-bg-sage text-gray-800 hover:bg-bg-peach"
                      }`}
                    >
                      {job.isActive ? "Active" : "Inactive"}
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
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
  );
}
