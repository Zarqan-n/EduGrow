import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/userService'
import { logout, setUser } from '../store/slices/authSlice'

export const useAuthVerification = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, token } = useSelector((state) => state.auth)

  useEffect(() => {
    const verifyAuth = async () => {
      // Only verify if there's a token
      if (!token) {
        // No token, ensure logged out state
        if (isAuthenticated) {
          dispatch(logout())
        }
        return
      }

      try {
        // Verify token is still valid by fetching profile
        const response = await userService.getProfile()
        if (response.data.data) {
          dispatch(setUser(response.data.data))
        }
      } catch (error) {
        // Token is invalid or expired
        console.log('Token verification failed, logging out')
        dispatch(logout())
      }
    }

    verifyAuth()
  }, []) // Run only once on mount
}
