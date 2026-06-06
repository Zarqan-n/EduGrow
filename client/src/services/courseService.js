import api from '../utils/axiosInstance'

export const courseService = {
  // GET /api/course/courses - returns { getCourses: [...] }
  getAllCourses: (params) => api.get('/course/courses', { params }),

  // GET /api/course/search?category=&maxPrice=&title= - returns { data: [...], count }
  searchCourses: (params) => api.get('/course/search', { params }),

  // GET /api/course/:id - returns { data: courseObj }
  getCourseById: (id) => api.get(`/course/${id}`),

  getReviews: (data) => api.post('/course/getreview', data),
  // POST /api/course/create - multipart form data
  createCourse: (data) => api.post('/course/create', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  // PUT /api/course/update-details - courseId goes in body, NOT in URL
  updateCourse: (data) => api.put('/course/update-details', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  // POST /api/course/ratingandreview - body: { courseId, rating, review }
  addReview: (data) => api.post('/course/ratingandreview', data),

  // GET /api/user/getMyTeacherCourse - teacher's own courses
  getMyTeacherCourses: () => api.get('/user/getMyTeacherCourse'),

  // POST /api/course/capture-payment - body: { courseId }
  capturePayment: (data) => api.post('/course/capture-payment', data),

  // POST /api/course/verify-payment - body: { courseId, ... }
  verifyPayment: (data) => api.post('/course/verify-payment', data),

  // Section Management APIs
  // POST /api/course/section - create new section
  createSection: (data) => api.post('/course/section', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  // PUT /api/course/section - update section (topic, duration only)
  updateSection: (data) => api.put('/course/section', data),

  // DELETE /api/course/section - delete section
  deleteSection: (data) => api.delete('/course/section', { data }),
}
