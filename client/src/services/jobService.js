import api from '../utils/axiosInstance'

export const jobService = {
  // GET /api/job/jobs - returns { data: [...] }
  getAllJobs: (params) => api.get('/job/jobs', { params }),
  
  // POST /api/job/create - body: { title, description, requirements, salary, timing, days }
  createJob: (data) => api.post('/job/create', data),
  
  // PUT /api/job/change-active - body: { jobId }
  changeJobActive: (jobId) => api.put('/job/change-active', { jobId }),
  
  // DELETE /api/job/delete - body: { jobId }
  deleteJob: (jobId) => api.delete('/job/delete', { data: { jobId } }),
  
  // POST /api/job/apply - body: { jobId }
  applyJob: (jobId) => api.post('/job/apply', { jobId }),
}
