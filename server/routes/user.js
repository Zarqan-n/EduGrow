import express from 'express'
import { updateProfile } from '../controllers/Profile.js'
import upload from '../middleware/ImageUploader.js'
import { AuthenticateUser } from '../middleware/Authentication.js'
import { isStudent, isTeacher, isAdmin } from '../middleware/Authorization.js'
import { getMyTeacherCourse } from '../controllers/Teacher.js'
import { getMyStudentCourse } from '../controllers/Student.js'
import { getMyData, getMyProfileData } from '../controllers/Dashboard.js'
import { submitContact } from '../controllers/Contact.js'
import { getInstitution } from '../controllers/Institution.js'

const router = express.Router()

router.put("/profile", AuthenticateUser, upload.single("avatar"), updateProfile)
router.get("/profile", AuthenticateUser, getMyProfileData)
router.get("/mydata", AuthenticateUser, getMyData)
router.get("/myinstitutiondata", AuthenticateUser, getInstitution)
router.get("/getMyTeacherCourse", AuthenticateUser, isTeacher, getMyTeacherCourse)
router.get("/getMyStudentCourse", AuthenticateUser, isStudent, getMyStudentCourse)
router.post("/submit", submitContact);



export const UserRouter = router 