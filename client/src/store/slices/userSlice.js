import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userProfile: null,
  purchasedCourses: [],
  enrolledCourses: [],
  myBooks: [],
  appliedJobs: [],
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false
      state.userProfile = action.payload
    },
    fetchUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    setPurchasedCourses: (state, action) => {
      state.purchasedCourses = action.payload
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload
    },
    setMyBooks: (state, action) => {
      state.myBooks = action.payload
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload
    },
    updateUserProfile: (state, action) => {
      state.userProfile = { ...state.userProfile, ...action.payload }
    },
  },
})

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  setPurchasedCourses,
  setEnrolledCourses,
  setMyBooks,
  setAppliedJobs,
  updateUserProfile,
} = userSlice.actions
export default userSlice.reducer
