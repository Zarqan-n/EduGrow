import api from '../utils/axiosInstance'

export const authService = {
  sendOTP: (email) => api.post('/auth/sendotp', { email }),
  
  signup: (data) => api.post('/auth/signup', data),
  
  login: (email, password) => api.post('/auth/login', { email, password }),
  
  // Backend route is POST /auth/reset-password (sends email with reset link)
  forgotPassword: (email) => api.post('/auth/reset-password', { email }),
  
  // Backend route is PUT /auth/reset-password/:token with { newPassword, newConfirmPassword }
  resetPassword: (token, newPassword, newConfirmPassword) =>
    api.put(`/auth/reset-password/${token}`, { newPassword, newConfirmPassword }),
  
  // Backend expects { password, newPassword, newConfirmPassword }
  changePassword: (password, newPassword, newConfirmPassword) =>
    api.put('/auth/password', { password, newPassword, newConfirmPassword }),
  
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  },
}
