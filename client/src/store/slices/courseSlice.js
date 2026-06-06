import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courses: [],
  featuredCourses: [],
  selectedCourse: null,
  loading: false,
  error: null,
  totalCount: 0,
  filters: {
    search: '',
    category: '',
    priceRange: [0, 100000],
  },
}

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    fetchCoursesStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchCoursesSuccess: (state, action) => {
      state.loading = false
      state.courses = action.payload.courses
      state.totalCount = action.payload.totalCount
    },
    fetchCoursesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    fetchFeaturedCoursesSuccess: (state, action) => {
      state.featuredCourses = action.payload
    },
    selectCourse: (state, action) => {
      state.selectedCourse = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
        priceRange: [0, 100000],
      }
    },
  },
})

export const {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchFeaturedCoursesSuccess,
  selectCourse,
  setFilters,
  clearFilters,
} = courseSlice.actions
export default courseSlice.reducer
