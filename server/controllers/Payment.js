import crypto from "crypto"
import mongoose from "mongoose"
import Course from "../models/Course.js"
import User from "../models/User.js"
import { sendEmail } from "../utils/EmailSender.js"
import { coursePurchaseTemplate } from "../templates/BuyCourse.js"
import { razorpayInstance } from "../config/Razorpay.js"
import { Student } from '../models/Student.js'


export const purchaseCourse = async (req, res) => {

    try {
        //fetch req.body
        const { courseId } = req.body
        const id = req.user.id

        if (!courseId || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }

        //check if course exist or not
        const checkCourse = await Course.findById(courseId)
        if (!checkCourse) {
            return res.status(404).json({
                success: false,
                message: "Course missing"
            })
        }
        const checkUser = await User.findById(id)
        if (!checkCourse) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }


        const Uid = new mongoose.Types.ObjectId(id)

        const checkUserPurchase = checkCourse.enrolledStudents.includes(Uid)

        if (checkUserPurchase) {
            return res.status(409).json({
                success: false,
                message: "Course already purchase"
            })
        }

        const options = {
            amount: checkCourse.price * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }

        const paymentResponse = await razorpayInstance.orders.create(options)



        return res.status(200).json({
            success: true,
            order: paymentResponse,
            checkCourse,
            user: { name: checkUser.name, email: checkUser.email }
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while purchasing",
            err: err.message
        })
    }

}


export const verifyPayment = async (req, res) => {
    try {


        const { id } = req.user

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            courseId
        } = req.body


        // create expected signature
        const body = razorpay_order_id + "|" + razorpay_payment_id

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex")

        // verify signature
        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            })
        }

        // enroll student in course
        const findUser = await User.findById(id)

        const courseData = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    enrolledStudents: findUser._id
                }
            },
            { new: true }
        )

        // add course to user
        const updateActivity = await Student.findByIdAndUpdate(findUser.activity, { $push: { enrolledCourse: courseData._id } }, { new: true })
        console.log(updateActivity)



        sendEmail(findUser.email, "Course purchase successful", coursePurchaseTemplate(findUser.name, courseData.title, courseData.teacherId, courseData.price))

        return res.status(200).json({
            success: true,
            message: "Payment verified and enrollment successful"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}