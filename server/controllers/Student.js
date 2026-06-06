import Course from "../models/Course.js"
import User from "../models/User.js"

// export const getStudent = async (req, res) => {

//     try {
//         const { id } = req.user
//         if (!id) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid id"
//             })
//         }
//         const data = await User.findById(id)

//         return res.status(200).json({
//             success: true,
//             message: "Data fetch successfully",
//             data
//         })
//     }
//     catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: "Server error while getting user",
//             error: err.message
//         })
//     }
// }

export const getMyStudentCourse = async (req, res) => {
    try {

        const { id } = req.user

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing detail"
            })
        }

        const data = await Course.find({ enrolledStudents: id }).populate("ratingAndReview").populate("teacherId").exec()

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

        // let data

        // data = await User.findById(id).populate({
        //     path: 'activity',
        //     populate: { 
        //         path: 'enrolledCourse',
        //     }
        // });

        // return res.status(200).json({
        //     success: true,
        //     message: "Course fetch successfully",
        //     data
        // })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal error while fetching course",
            err: err.message
        })
    }
}