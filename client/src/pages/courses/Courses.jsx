import { useState, useEffect } from "react";
import CourseCard from "../../components/cards/CourseCard";
import SearchBar from "../../components/common/SearchBar";
import { courseService } from "../../services/courseService";
import { ChevronDown } from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    language: "",
    maxPrice: 100000,
  });
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    setPage(1);
    setCourses([]);
    fetchCourses(1);
  }, [filters]);

  const fetchCourses = async (pageNum) => {
    try {
      pageNum === 1 ? setLoading(true) : setLoadingMore(true);
      const params = {};
      if (filters.search) params.title = filters.search;
      if (filters.maxPrice && filters.maxPrice < 100000)
        params.maxPrice = filters.maxPrice;
      if (filters.language) params.language = filters.language;
      params.skip = (pageNum - 1) * ITEMS_PER_PAGE;
      params.limit = ITEMS_PER_PAGE;
      
      const response = await courseService.searchCourses(params);
      const newCourses = response.data.modifiedData || [];
      
      if (pageNum === 1) {
        setCourses(newCourses);
      } else {
        setCourses(prev => [...prev, ...newCourses]);
      }
      
      setHasMore(newCourses.length === ITEMS_PER_PAGE);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      pageNum === 1 ? setLoading(false) : setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    fetchCourses(page + 1);
  };

  const handleReset = () => {
    setFilters({
      search: "",
      language: "",
      maxPrice: 100000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="uppercase tracking-[4px] text-cyan-400 text-xs font-bold mb-3">
            Learning Platform
          </p>
          <h1 className="text-5xl font-black text-white mb-3">
            Explore Courses
          </h1>
          <p className="text-cyan-200">
            Discover and enroll in courses tailored to your interests
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-white">Filters</h2>
            <button
              onClick={handleReset}
              className="text-sm text-cyan-300 hover:text-cyan-100 font-bold transition"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-3">
                Search
              </label>
              <input
                type="text"
                placeholder="Search courses..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300"
              />
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-3">
                Language
              </label>
              <select
                value={filters.language}
                onChange={(e) =>
                  setFilters({ ...filters, language: e.target.value })
                }
                className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-300 cursor-pointer"
              >
                <option value="" className="bg-primary-900">
                  All Languages
                </option>
                <option value="English" className="bg-primary-900">
                  English
                </option>
                <option value="Hindi" className="bg-primary-900">
                  Hindi
                </option>
                <option value="Urdu" className="bg-primary-900">
                  Urdu
                </option>
                <option value="Tamil" className="bg-primary-900">
                  Tamil
                </option>
                <option value="Bengali" className="bg-primary-900">
                  Bengali
                </option>
                <option value="Marathi" className="bg-primary-900">
                  Marathi
                </option>
              </select>
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-3">
                Max Price (₹)
              </label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    maxPrice: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300"
                placeholder="Maximum price"
              />
            </div>
          </div>
        </div>

        {/* Results count */}
        {!loading && courses.length > 0 && (
          <p className="text-sm text-white font-semibold mb-4">
            {courses.length} course{courses.length !== 1 ? "s" : ""} loaded
          </p>
        )}

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-12 text-cyan-200">
            Loading courses...
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="mb-4 text-cyan-200">
              No courses found matching your filters
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-cyan-900 hover:bg-cyan-800 text-white rounded-2xl transition font-bold transform hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
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
                      Load More Courses
                      <ChevronDown size={18} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
