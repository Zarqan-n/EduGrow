import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, token } = useSelector((state) => state.auth)

  // If no token, redirect to login
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />
  }

  return children
}
