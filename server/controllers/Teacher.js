import { Teacher } from "../models/Teacher.js"
import User from "../models/User.js"
import { Job } from "../models/Job.js"
import Course from "../models/Course.js"

export const getMyTeacherCourse = async (req, res) => {
    try {

        const { id } = req.user

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing detail"
            })
        }


        const data = await Course.find({ teacherId: id }).populate("ratingAndReview").populate("teacherId").populate("section").exec()

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
                sections: course.section,
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

export const applyJob = async (req, res) => {
    try {

        const { id } = req.user
        const { jobId } = req.body

        if (!id || !jobId) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing detail"
            })
        }

        const checkJob = await Job.findById(jobId)
        if (!checkJob) {
            return res.status(400).json({
                success: false,
                message: "No job found"
            })
        }
        if (!checkJob.isActive) {
            return res.status(400).json({
                success: false,
                message: "Job is unlisted"
            })
        }

        const checkUser = await User.findById(id)
        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "User missing detail"
            })
        }

        const updateActivity = await Teacher.findByIdAndUpdate(checkUser.activity, { $push: { jobApplied: checkJob._id } })


        return res.status(200).json({
            success: true,
            message: "Job applied successfully",
            checkJob
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