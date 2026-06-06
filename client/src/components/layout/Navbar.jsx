import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { userService } from "../../services/userService";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only fetch profile if authenticated
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    try {
      const response = await userService.getProfile();
      if (response.data.data.profile?.avatar) {
        setProfile(response.data.data.profile.avatar);
      }
    } catch (error) {
      console.error("Error fetching Profile:", error);
      // Don't throw error, let user stay on page
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary-700 via-primary-800 to-primary-900 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center text-primary-900 font-black">
              E
            </div>
            <span className="font-bold text-lg text-white">EduGrow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/courses"
              className="text-cyan-200 hover:text-cyan-100 transition font-medium"
            >
              Courses
            </Link>
            <Link
              to="/books"
              className="text-cyan-200 hover:text-cyan-100 transition font-medium"
            >
              Books
            </Link>
            <Link
              to="/jobs"
              className="text-cyan-200 hover:text-cyan-100 transition font-medium"
            >
              Jobs
            </Link>
            <Link
              to="/contact"
              className="text-cyan-200 hover:text-cyan-100 transition font-medium"
            >
              Contact
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {role === "teacher" && (
                  <Link
                    to="/teacher/dashboard"
                    className="text-cyan-200 hover:text-cyan-100 transition font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                {role === "student" && (
                  <Link
                    to="/student/dashboard"
                    className="text-cyan-200 hover:text-cyan-100 transition font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                {role === "institution" && (
                  <Link
                    to="/institution/dashboard"
                    className="text-cyan-200 hover:text-cyan-100 transition font-medium"
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="text-cyan-200 hover:text-cyan-100 transition"
                  title="Go to profile"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-cyan-300 shadow-sm shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      src={profile}
                      alt="profile"
                    />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-cyan-300 border-2 border-cyan-300 rounded-2xl hover:bg-cyan-300 hover:text-primary-900 transition font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-cyan-900 text-white rounded-2xl hover:bg-cyan-800 transition font-bold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/courses"
              className="block py-2 text-cyan-200 hover:text-cyan-100 font-medium"
            >
              Courses
            </Link>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/books"
              className="block py-2 text-cyan-200 hover:text-cyan-100 font-medium"
            >
              Books
            </Link>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/jobs"
              className="block py-2 text-cyan-200 hover:text-cyan-100 font-medium"
            >
              Jobs
            </Link>
            <Link
              onClick={() => setIsOpen(!isOpen)}
              to="/contact"
              className="block py-2 text-cyan-200 hover:text-cyan-100 font-medium"
            >
              Contact
            </Link>
            {isAuthenticated && (
              <>
                {role === "teacher" && (
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    to="/teacher/dashboard"
                    className="block py-2 text-cyan-200 hover:text-cyan-100 font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                {role === "student" && (
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    to="/student/dashboard"
                    className="block py-2 text-cyan-200 hover:text-cyan-100 font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                {role === "institution" && (
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    to="/institution/dashboard"
                    className="block py-2 text-cyan-200 hover:text-cyan-100 font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  onClick={() => setIsOpen(!isOpen)}
                  to="/profile"
                  className="block py-2 text-cyan-200 hover:text-cyan-100 font-medium"
                >
                  Profile
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link
                  onClick={() => setIsOpen(!isOpen)}
                  to="/login"
                  className="block py-2 text-cyan-300 hover:text-cyan-100 font-medium"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setIsOpen(!isOpen)}
                  to="/signup"
                  className="block py-2 text-cyan-300 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
