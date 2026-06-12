import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { userService } from "../services/userService";
import { authService } from "../services/authService";
import FileUpload from "../components/common/FileUpload";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Profile state
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    mobile: "",
    gender: "",
    location: "",
    avatar: "",
  });
  const [avatar, setAvatar] = useState(null);

  // Password state
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // UI state
  const [activeTab, setActiveTab] = useState("personal");
  const [loading, setLoading] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await userService.getProfile();
      const userData = response.data.data;
      const profileData = userData?.profile || {};
      setFormData({
        name: userData?.name || "",
        bio: profileData.bio || "",
        mobile: profileData.mobile || "",
        gender: profileData.gender || "",
        location: profileData.location || "",
        avatar: profileData.avatar || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        form.append(key, formData[key]);
      });
      if (avatar) form.append("avatar", avatar);

      await userService.updateProfile(form);
      setSuccess("Profile updated successfully");
      setAvatar(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      await authService.changePassword(
        passwordData.oldPassword,
        passwordData.newPassword,
        passwordData.confirmPassword,
      );
      setSuccess("Password changed successfully");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-300"></div>
          <p className="mt-4 text-cyan-200">Loading profile...</p>
        </div>
      </div>
    );

  const handleResetPassword = async () => {
    try {
      setLoadingPass(true);
      const url = await authService.forgotPassword(user?.email);
      setLink(url.data.createUrl);
      setSuccess("Password reset link sent to your email");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoadingPass(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-t-3xl border border-white/10 shadow-2xl p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="uppercase tracking-[4px] text-cyan-400 text-xs font-bold mb-3">
                Account Management
              </p>
              <h1 className="text-4xl font-black text-white mb-2">
                My Profile
              </h1>
              <p className="text-cyan-200">
                Manage and update your account settings
              </p>
            </div>
            <div className="border-2 border-cyan-300 rounded-full h-28 w-28 overflow-hidden flex items-center justify-center bg-white/10 flex-shrink-0">
              {formData.avatar ? (
                <img
                  className="h-full w-full object-cover"
                  src={formData.avatar}
                  alt="Profile Avatar"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-cyan-900 text-cyan-300 text-5xl font-bold">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl">
          <div className="flex border-b border-white/10 overflow-x-auto px-8">
            <button
              onClick={() => {
                setActiveTab("personal");
                setError("");
                setSuccess("");
              }}
              className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition duration-300 ${
                activeTab === "personal"
                  ? "border-b-2 border-cyan-300 text-cyan-300"
                  : "text-cyan-200 hover:text-cyan-100"
              }`}
            >
              Personal Information
            </button>
            <button
              onClick={() => {
                setActiveTab("password");
                setError("");
                setSuccess("");
              }}
              className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition duration-300 ${
                activeTab === "password"
                  ? "border-b-2 border-cyan-300 text-cyan-300"
                  : "text-cyan-200 hover:text-cyan-100"
              }`}
            >
              Change Password
            </button>
            <button
              onClick={() => {
                setActiveTab("account");
                setError("");
                setSuccess("");
              }}
              className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition duration-300 ${
                activeTab === "account"
                  ? "border-b-2 border-cyan-300 text-cyan-300"
                  : "text-cyan-200 hover:text-cyan-100"
              }`}
            >
              Account
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-b-3xl border border-white/10 shadow-2xl p-8">
          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-400/30 rounded-2xl p-4 text-red-300 text-sm flex items-start">
              <svg
                className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-500/10 border border-green-400/30 rounded-2xl p-4 text-green-300 text-sm flex items-start">
              <svg
                className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{success}</span>
            </div>
          )}

          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-cyan-300 text-sm font-semibold mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleProfileChange}
                    required
                    className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                  />
                </div>
                <div>
                  <label className="block text-cyan-300 text-sm font-semibold mb-3">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleProfileChange}
                    className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-semibold mb-3">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleProfileChange}
                  rows="4"
                  className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300 resize-none"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-cyan-300 text-sm font-semibold mb-3">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleProfileChange}
                    className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300 cursor-pointer"
                  >
                    <option value="" className="bg-primary-900">
                      Select Gender
                    </option>
                    <option value="male" className="bg-primary-900">
                      Male
                    </option>
                    <option value="female" className="bg-primary-900">
                      Female
                    </option>
                    <option value="other" className="bg-primary-900">
                      Other
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-cyan-300 text-sm font-semibold mb-3">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleProfileChange}
                    className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-semibold mb-3">
                  Profile Avatar
                </label>
                <FileUpload
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
                {avatar && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ New image selected
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-cyan-900 hover:bg-cyan-800 text-white rounded-2xl transition font-bold transform hover:scale-105 duration-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* Change Password Tab */}
          {activeTab === "password" && (
            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-6 max-w-md"
            >
              <p className="text-cyan-200 text-sm">
                Update your password to keep your account secure
              </p>

              <div>
                <label className="block text-cyan-300 text-sm font-semibold mb-3">
                  Current Password *
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                />
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-semibold mb-3">
                  New Password *
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                />
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-semibold mb-3">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-cyan-900 hover:bg-cyan-800 text-white rounded-2xl transition font-bold transform hover:scale-105 duration-300"
              >
                Update Password
              </button>
            </form>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <div className="p-6 bg-blue-400/10 border border-blue-400/30 rounded-2xl">
                <h3 className="font-bold text-cyan-300 mb-4">
                  Account Information
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-cyan-200">Email:</span>{" "}
                    <span className="font-medium text-white ml-2">
                      {user?.email}
                    </span>
                  </div>
                  <div>
                    <span className="text-cyan-200">Account Role:</span>{" "}
                    <span className="font-medium text-white ml-2 capitalize">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
              {link && (
                <a className="text-blue-900" href={link}>
                  Click here to reset password
                </a>
              )}
              <div className="space-y-3">
                <h3 className="font-bold text-white">Account Actions</h3>
                <button
                  onClick={handleResetPassword}
                  disabled={loadingPass}
                  className="block w-full px-6 py-3 border border-cyan-300 rounded-2xl text-cyan-300 hover:bg-cyan-300/10 transition text-center font-bold transform hover:scale-105 duration-300"
                >
                  {loadingPass ? "Sending..." : "Reset Password via Email"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Logout Section */}
        <div className="mt-8 p-8 bg-red-500/10 border border-red-400/30 rounded-2xl">
          <h3 className="text-xl font-black text-red-300 mb-3">Logout</h3>
          <p className="text-red-200 text-sm mb-6">
            Click below to logout from your account on this device
          </p>
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl transition font-bold transform hover:scale-105 duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
