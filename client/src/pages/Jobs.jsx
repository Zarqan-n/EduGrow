import { useState, useEffect } from "react";
import JobCard from "../components/cards/JobCard";
import { jobService } from "../services/jobService";
import { useSelector } from "react-redux";
import { ChevronDown } from "lucide-react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { role } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({
    search: "",
    timing: "",
  });
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    setPage(1);
    setJobs([]);
    fetchJobs(1);
  }, [filters]);

  const fetchJobs = async (pageNum) => {
    try {
      pageNum === 1 ? setLoading(true) : setLoadingMore(true);
      const skip = (pageNum - 1) * ITEMS_PER_PAGE;
      const response = await jobService.getAllJobs({ 
        ...filters, 
        skip,
        limit: ITEMS_PER_PAGE 
      });
      const newJobs = response.data.data || [];
      
      if (pageNum === 1) {
        setJobs(newJobs);
      } else {
        setJobs(prev => [...prev, ...newJobs]);
      }
      
      setHasMore(newJobs.length === ITEMS_PER_PAGE);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      pageNum === 1 ? setLoading(false) : setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    fetchJobs(page + 1);
  };

  const handleSearch = (query) => {
    setFilters({ ...filters, search: query });
  };

  const handleApplyJob = async (jobId) => {
    try {
      await jobService.applyJob(jobId);
      alert("Applied successfully!");
    } catch (error) {
      alert("Failed to apply for job");
    }
  };

  return (
    <div className="app-page py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex flex-col  justify-between items-start gap-4 lg:flex-row lg:items-end">
          <div className="mb-12">
            <p className="uppercase tracking-[4px] text-cyan-300 text-xs font-bold mb-3">
              Career Growth
            </p>
            <h1 className="text-4xl font-black text-white mb-4">
              Job Opportunities
            </h1>
            <p className="text-cyan-100 mb-8">
              Find your next teaching opportunity
            </p>

            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search jobs..."
              className="glass-input max-w-md"
            />
          </div>

          {/* Filters */}
          <div className="mb-8 p-6 w-full lg:max-w-[50%] glass-panel rounded-3xl">
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-2">
                Timing
              </label>
              <select
                value={filters.timing}
                onChange={(e) =>
                  setFilters({ ...filters, timing: e.target.value })
                }
                className="glass-input"
              >
                <option value="" className="bg-primary-900">All Timings</option>
                <option value="full-time" className="bg-primary-900">Full Time</option>
                <option value="part-time" className="bg-primary-900">Part Time</option>
                <option value="contract" className="bg-primary-900">Contract</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {!loading && jobs.length > 0 && (
          <p className="text-sm text-cyan-300 font-semibold mb-4">
            {jobs.length} job{jobs.length !== 1 ? 's' : ''} loaded
          </p>
        )}

        {/* Jobs List */}
        {loading ? (
          <div className="text-center py-12 text-cyan-100">Loading jobs...</div>
        ) : jobs.length > 0 ? (
          <>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onApply={role === "teacher" ? handleApplyJob : undefined}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-cyan-900 hover:bg-cyan-800 disabled:bg-cyan-900/50 text-white rounded-2xl font-bold transition flex items-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Loading more...
                    </>
                  ) : (
                    <>
                      Load More Jobs
                      <ChevronDown size={18} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-cyan-100">No jobs available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
}
