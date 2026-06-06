import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  jobs: [],
  selectedJob: null,
  myJobs: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    timing: '',
    salaryRange: [0, 1000000],
  },
}

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchJobsSuccess: (state, action) => {
      state.loading = false
      state.jobs = action.payload
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    selectJob: (state, action) => {
      state.selectedJob = action.payload
    },
    setMyJobs: (state, action) => {
      state.myJobs = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  selectJob,
  setMyJobs,
  setFilters,
} = jobSlice.actions
export default jobSlice.reducer
