import mongoose, { get } from "mongoose"
import Course from "../models/Course.js"
import { RatingAndReview } from "../models/RatingAndReview.js"
import User from "../models/User.js"
import { Teacher } from "../models/Teacher.js"


// create course
export const createCourse = async (req, res) => {
    try {

        const thumbnailUrl = req.files?.['thumbnail'] ? req.files['thumbnail'][0].path : null;
        const demoVideoUrl = req.files?.['demoVideo'] ? req.files['demoVideo'][0].path : null;
        const { description, title, timing, duration, classes, price, language } = req.body
        const { id } = req.user

        //validate
        if (!title || !description || !timing || !duration || !price || !classes || !language || !id) {
            return res.status(400).json({
                success: false,
                message: "All field requied"
            })
        }

        if (price < 0 || price > 20000) {
            return res.status(400).json({
                success: false,
                message: "Invalid course price"
            })
        }


        const checkUser = await User.findById(id)
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        const obj = { teacherId: id, title, description, price, language, timing, duration, classes }
        if (thumbnailUrl) obj.thumbnail = thumbnailUrl
        if (demoVideoUrl) obj.demoVideo = demoVideoUrl
        const courseCreated = await Course.create(obj)

        //push course id to teacher 
        const pushCourseId = await Teacher.findByIdAndUpdate(checkUser.activity, { $push: { courses: courseCreated._id } }, { new: true })
        console.log(pushCourseId)

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            courseCreated
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

//update course details
export const updateCourse = async (req, res) => {
    try {

        const thumbnailUrl = req.files?.['thumbnail'] ? req.files['thumbnail'][0].path : null;
        const demoVideoUrl = req.files?.['demoVideo'] ? req.files['demoVideo'][0].path : null;

        // const thumbnailUrl = req.file?.path
        // const demoVideoUrl = req.file?.path
        const { description, title, timing, duration, classes, price, language, courseId } = req.body
        const teacherId = req.user.id

        //validate
        if (!teacherId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Id missing"
            })
        }
        const updateObject = {}

        if (price && (price < 0 || price > 20000)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course price"
            })
        }

        if (title) updateObject.title = title
        if (description) updateObject.description = description
        if (price) updateObject.price = price
        if (timing) updateObject.timing = timing
        if (duration) updateObject.duration = duration
        if (classes) updateObject.classes = classes
        if (language) updateObject.language = language
        if (thumbnailUrl) updateObject.thumbnail = thumbnailUrl
        if (demoVideoUrl) updateObject.demoVideo = demoVideoUrl

        console.log(Object.keys(updateObject))
        if (Object.keys(updateObject).length < 1) {
            return res.status(400).json({
                success: false,
                message: "Empty updating detail"
            })
        }

        const updateCourseDetails = await Course.findByIdAndUpdate(courseId, updateObject, { new: true })

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            updateCourseDetails
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal error while updating course detail",
            error: err.message
        })
    }
}

export const getAllCourses = async (req, res) => {
    try {

        const { language, maxPrice, title } = req.params
        console.log(filter)

        const getCourses = await Course.find(filter)
            .populate("ratingAndReview")
            .exec()

        return res.status(200).json({
            success: true,
            message: "Course fetch successfully",
            getCourses
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal error while fetching courses",
            err: err.message
        })
    }
}

export const getCourseDetail = async (req, res) => {
    try {

        const { id } = req.params

        const getCourse = await Course.findById(id)
            .populate("ratingAndReview")
            .populate("teacherId")
            .populate("section")
            .exec()

        if (!getCourse) {
            return res.status(404).json({
                success: false,
                message: "Coures not found"
            })
        }

        const data = getCourse

        if (getCourse.ratingAndReview.length > 0) {
            let sumRating = 0
            getCourse.ratingAndReview.map((e) => { sumRating += e.rating })
            data.averageRating = sumRating / getCourse.ratingAndReview.length
        }

        data.studentCount = getCourse.enrolledStudents.length


        return res.status(200).json({
            success: true,
            message: "Course fetch successfully",
            data
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal error while fetching course",
            err: err.message
        })
    }
}

export const searchCourse = async (req, res) => {
    try {

        const { language, maxPrice, title, limit, skip } = req.query


        let max = parseInt(limit) || 10
        let offset = parseInt(skip) || 0


        const filter = {}

        if (maxPrice) filter.price = { $lte: maxPrice }
        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }
        if (language && language !== "All") {
            filter.language = language;
        }

        const data = await Course.find(filter).skip(offset).limit(max).populate("ratingAndReview").populate("teacherId").exec()

        const modifiedData = data.map((course) => {

            let avgRating = 0;

            if (course.ratingAndReview.length > 0) {

                const totalRating =
                    course.ratingAndReview.reduce(
                        (acc, curr) => acc + curr.rating,
                        0
                    );

                avgRating =
                    totalRating / course.ratingAndReview.length;
            }

            return {
                teacherName: course.teacherId.name,
                _id: course._id,
                title: course.title,
                description: course.description,
                price: course.price,
                thumbnail: course.thumbnail,
                language: course.language,
                avgRating,
                totalReviews: course.ratingAndReview.length,
                enrolledStudentsCount:
                    course.enrolledStudents.length,
            };
        });


        return res.status(200).json({
            success: true,
            message: "Course fetch successfully",
            count: modifiedData.length, modifiedData
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal error while fetching course",
            err: err.message
        })
    }
}