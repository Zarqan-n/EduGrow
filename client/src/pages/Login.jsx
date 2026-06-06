import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/slices/authSlice'
import { authService } from '../services/authService'

// Decode JWT payload without a library
function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login(formData.email, formData.password)
      const { token } = response.data

      // Backend only returns token; decode it to get role and user info
      const decoded = decodeToken(token)
      const role = decoded?.role?.toLowerCase() || ''

      dispatch(
        loginSuccess({
          token,
          user: { email: decoded?.email, id: decoded?.id },
          role,
        })
      )

      // Redirect based on role
      const dashboardRoutes = {
        student: '/student/dashboard',
        teacher: '/teacher/dashboard',
        institution: '/institution/dashboard',
      }

      navigate(dashboardRoutes[role] || '/')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-black text-white mb-2">Welcome Back</h2>
          <p className="text-cyan-200 text-sm">Sign in to continue your learning journey</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-400/30 rounded-2xl p-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-cyan-300 text-sm font-semibold mb-2">Email</label>
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
            <label className="block text-cyan-300 text-sm font-semibold mb-2">Password</label>
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

          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-cyan-300 hover:text-cyan-200 transition font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-cyan-900 hover:bg-cyan-800 text-white rounded-2xl font-bold transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <a href="/signup" className="text-cyan-300 font-bold hover:text-cyan-200 transition">
              Sign up here
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
  )
}
