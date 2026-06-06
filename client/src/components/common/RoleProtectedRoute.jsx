import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role, token } = useSelector((state) => state.auth)

  // Check if authenticated and has valid token
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />
  }

  // Check if user has required role
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return children
}
