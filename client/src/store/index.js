import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import courseReducer from './slices/courseSlice'
import userReducer from './slices/userSlice'
import bookReducer from './slices/bookSlice'
import jobReducer from './slices/jobSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    user: userReducer,
    books: bookReducer,
    jobs: jobReducer,
  },
})

export default store
