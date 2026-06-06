import express from 'express'
import { AuthenticateUser } from '../middleware/Authentication.js'
import { createJob, changeActive, deleteJob } from '../controllers/Job.js'
import { isInstitution, isTeacher } from '../middleware/Authorization.js'
import { applyJob } from '../controllers/Teacher.js'
import { getAlljob } from '../controllers/Dashboard.js'

const router = express.Router()

router.post('/create', AuthenticateUser, isInstitution, createJob)
router.put('/change-active', AuthenticateUser, isInstitution, changeActive)
router.delete('/delete', AuthenticateUser, isInstitution, deleteJob)
router.post("/apply", AuthenticateUser, isTeacher, applyJob)
router.get("/jobs", getAlljob)

export const JobRouter = router
