import mongoose from "mongoose"
import Course from "../models/Course.js"
import { RatingAndReview } from "../models/RatingAndReview.js"
import User from "../models/User.js"


export const createRatingAndReview = async (req, res) => {
    try {
        //fetch req.body
        const { courseId, rating, review } = req.body
        const id = req.user.id

        if (!courseId || !rating || !review || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields required",
            })
        }

        //check if course exist or not
        const checkCourse = await Course.findById(courseId)

        //check if user has bought that course or not
        const checkUserBought = await User.findById(id)

        if (!checkCourse || !checkUserBought) {
            return res.status(400).json({
                success: false,
                message: "Missing course or user"
            })
        }

        const purchaseCourse = await Course.findOne({ _id: courseId, enrolledStudents: id })
        console.log("User has purchase : ", purchaseCourse)

        if (!purchaseCourse) {
            return res.status(201).json({
                success: false,
                message: "Course not purchase"
            })
        }

        //check if user already rate it
        const checkRating = await RatingAndReview.findOne({ courseId: courseId, userId: id })
        if (checkRating) {
            return res.status(409).json({
                success: false,
                message: "Course rated already"
            })
        }


        //create rating review
        const createRating = await RatingAndReview.create({ courseId, profile: checkUserBought.profile, userId: id, rating, review })

        const rateCourse = await Course.findByIdAndUpdate(checkCourse._id, { $push: { ratingAndReview: createRating._id } })


        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            Rating: rateCourse
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            err: err.message
        })
    }

}

export const getRatingAndReviews = async (req, res) => {
    try {
        //fetch req.body
        const { courseId } = req.body

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "All fields required",
            })
        }

        const Cid = new mongoose.Types.ObjectId(courseId)

        const getReviews = await RatingAndReview.find({ courseId: Cid }).populate("profile").exec()

        let reviews = getReviews || []

        return res.status(201).json({
            success: true,
            message: "Review fetch successfully",
            reviews
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            err: err.message
        })
    }

}

