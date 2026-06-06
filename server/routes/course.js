import express from 'express'
import { AuthenticateUser } from '../middleware/Authentication.js'
import { isAdmin, isStudent, isTeacher } from '../middleware/Authorization.js'
import { createCourse, getAllCourses, getCourseDetail, searchCourse, updateCourse } from '../controllers/Course.js'
import { createRatingAndReview, getRatingAndReviews } from '../controllers/RatingAndReview.js'
import { purchaseCourse, verifyPayment } from '../controllers/Payment.js'
import { courseUpload } from '../middleware/ImageAndVideo.js'
import { createSection, deleteSection, updateSection } from '../controllers/Section.js'
import { uploadDemoVideo } from '../middleware/VideoUploader.js'


const router = express.Router()

router.post("/create", AuthenticateUser, isTeacher, courseUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "demoVideo", maxCount: 1 }
]), createCourse)
router.put("/update-details", AuthenticateUser, isTeacher, courseUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "demoVideo", maxCount: 1 }
]), updateCourse)
router.post("/ratingandreview", AuthenticateUser, isStudent, createRatingAndReview)
router.post("/getreview", getRatingAndReviews)

router.get("/search", searchCourse)
router.get("/courses", getAllCourses)
router.get("/:id", getCourseDetail)

router.post("/capture-payment", AuthenticateUser, isStudent, purchaseCourse)
router.post("/verify-payment", AuthenticateUser, isStudent, verifyPayment)

router.post("/section", AuthenticateUser, isTeacher, uploadDemoVideo.single("videoUrl"), createSection)
router.put("/section", AuthenticateUser, isTeacher, updateSection)
router.delete("/section", AuthenticateUser, isTeacher, deleteSection)



export const CourseRouter = router