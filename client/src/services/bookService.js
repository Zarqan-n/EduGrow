import api from '../utils/axiosInstance'

export const bookService = {
  // GET /api/book/books - returns { data: [...] }
  getAllBooks: (params) => api.get('/book/books', { params }),
  
  // POST /api/book/create - multipart form data with thumbnail
  createBook: (data) => api.post('/book/create', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  
  // DELETE /api/book/delete - body: { bookId }
  deleteBook: (bookId) => api.delete('/book/delete', { data: { bookId } }),
}
