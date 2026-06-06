import axios from 'axios'
import { store } from '../store/index'
import { logout } from '../store/slices/authSlice'

const API_BASE_URL = "https://edugrowbackend.onrender.com/api"
// const API_BASE_URL = "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 (unauthorized), logout user and redirect
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      // Dispatch logout action to sync Redux state
      store.dispatch(logout())
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
