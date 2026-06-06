import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    condition: '',
    priceRange: [0, 50000],
  },
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    fetchBooksStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false
      state.books = action.payload
    },
    fetchBooksFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    selectBook: (state, action) => {
      state.selectedBook = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
  selectBook,
  setFilters,
} = bookSlice.actions
export default bookSlice.reducer
