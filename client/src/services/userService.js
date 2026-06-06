import api from '../utils/axiosInstance'

export const userService = {
  // GET /api/user/profile - returns populated user with profile
  getProfile: () => api.get('/user/profile'),
  
  getMyInstituion: () => api.get('/user/myinstitutiondata'),

  submitContactData: (data) => api.post('/user/submit', data),
  // PUT /api/user/profile - multipart form data with avatar
  updateProfile: (data) => api.put('/user/profile', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  // GET /api/user/mydata - returns user with populated activity and profile
  getMyData: () => api.get('/user/mydata'),

  // GET /api/user/getMyStudentCourse - auth required, student role
  getMyStudentCourses: () => api.get('/user/getMyStudentCourse'),

  // GET /api/user/getMyTeacherCourse - auth required, teacher role
  getMyTeacherCourses: () => api.get('/user/getMyTeacherCourse'),
}
