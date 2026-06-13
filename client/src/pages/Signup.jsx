import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
    otp: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const otp = await authService.sendOTP(formData.email);
      setSuccess(
        `Due to lack of email service unable send otp to email verify directly: ${otp.data.otp}`,
      );
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await authService.signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        otp: formData.otp,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-black text-white mb-2">
            Create Account
          </h2>
          <p className="text-cyan-200 text-sm">
            Join our learning community today
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-400/30 rounded-2xl p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-500/10 border border-green-400/30 rounded-2xl p-4 text-green-300 text-sm">
            {success}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={sendOTP} className="space-y-5">
            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-2">
                Select Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300 cursor-pointer"
              >
                <option value="Student" className="bg-primary-900">
                  Student
                </option>
                <option value="Teacher" className="bg-primary-900">
                  Teacher
                </option>
                <option value="Institution" className="bg-primary-900">
                  Institution
                </option>
              </select>
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-cyan-900 hover:bg-cyan-800 text-white rounded-2xl font-bold transition duration-300 disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-cyan-300 text-sm font-semibold mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
                maxLength="6"
                className="w-full rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-3 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-cyan-300 transition duration-300 text-center text-2xl tracking-widest"
                placeholder="000000"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-cyan-900 hover:bg-cyan-800 text-white rounded-2xl font-bold transition duration-300 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full px-4 py-3 border border-white/20 text-cyan-300 rounded-2xl hover:bg-white/10 transition font-medium"
            >
              Back
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-cyan-300 font-bold hover:text-cyan-200 transition"
            >
              Sign in here
            </a>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-gray-400 text-xs text-center">
            Protected by SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}
