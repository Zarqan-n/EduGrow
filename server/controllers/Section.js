import mongoose from "mongoose"
import Course from "../models/Course.js"
import Section from "../models/Section.js"
import User from "../models/User.js"

// Create Section
export const createSection = async (req, res) => {
    try {
        const videoUrl = req.file?.path || null;
        console.log(videoUrl)
        const { id } = req.user
        const { topic, duration, courseId } = req.body
        console.log(topic, duration, courseId, videoUrl)

        //validate
        if (!topic || !duration || !courseId || !id || !videoUrl) {
            return res.status(400).json({
                success: false,
                message: "All field requied"
            })
        }


        //check course exist or not
        const checkCourse = await Course.findById(courseId)
        if (!checkCourse) {
            return res.status(400).json({
                success: false,
                message: "Course does not exist"
            })
        }

        //check whether teacher has that course
        console.log(id, "here", checkCourse.teacherId)
        if (id !== checkCourse.teacherId.toString()) {
            return res.status(400).json({
                success: false,
                message: "This course does not belong to you"
            })
        }

        //create section and save in db
        const newSection = await Section.create({ topic, duration, courseId, videoUrl})
        console.log("Section created: ", newSection)


        const sectionCreated = await Course.findByIdAndUpdate(courseId, { $push: { section: newSection._id } }, { new: true }).populate("section")


        console.log("Course: ",sectionCreated)

        return res.status(201).json({
            success: true,
            message: "Section created successfully",
            section: newSection,
            courseId: courseId
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

// update Section
export const updateSection = async (req, res) => {
    try {

        const id = req.user.id
        const { topic, duration, courseId, sectionId } = req.body

        //validate
        if (!courseId || !sectionId || !id) {
            return res.status(400).json({
                success: false,
                message: "All field requied"
            })
        }


        //check course exist or not
        const checkCourse = await Course.findById(courseId)
        if (!checkCourse) {
            return res.status(400).json({
                success: false,
                message: "Course does not exist"
            })
        }

        //check whether teacher has that course
        if (id !== checkCourse.teacherId.toString()) {
            return res.status(400).json({
                success: false,
                message: "This course does not belong to you"
            })
        }

        const checksection = await Section.findById(sectionId)
        if (!checksection) {
            return res.status(400).json({
                success: false,
                message: "Section does not exist"
            })
        }

        const obj = {}
        if (topic) obj.topic = topic
        if (duration) obj.duration = duration


        const updatedSection = await Section.findByIdAndUpdate(sectionId, obj, { new: true })

        return res.status(200).json({
            success: true,
            message: "Section updated successfully"
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

// Delete Section
export const deleteSection = async (req, res) => {
    try {
        const id = req.user.id
        const { sectionId, courseId } = req.body

        //validate
        if (!sectionId || !courseId || !id) {
            return res.status(404).json({
                success: false,
                message: "Id is missing"
            })
        }

        //find 3 of them and validate
        const checkCourse = await Course.findById(courseId)
        const checkSection = await Section.findById(sectionId)
        const checkUser = await User.findById(id)

        if (!checkCourse) {
            return res.status(404).json({
                success: false,
                message: "Course is missing"
            })
        }
        if (!checkSection) {
            return res.status(404).json({
                success: false,
                message: "Section is missing"
            })
        }
        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "Invalid User id"
            })
        }

        //check teacher has course
        console.log(id, "here", checkCourse.teacherId)
        if (id !== checkCourse.teacherId.toString()) {
            return res.status(404).json({
                success: false,
                message: "This course does not belong to you"
            })
        }

        //check course has that section
        if (courseId !== checkSection.courseId.toString()) {
            return res.status(404).json({
                success: false,
                message: "Section and Course mismatch"
            })
        }

        const deleteSectionfromCourse = await Course.findByIdAndUpdate(courseId, { $pull: { section: sectionId } })
        const deleteSection = await Section.findByIdAndDelete(sectionId)



        return res.status(204).json({
            success: true,
            message: "Section deleted successfully"
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