import mongoose from "mongoose"
import { Institution } from "../models/Institution.js"
import { Job } from "../models/Job.js"
import User from "../models/User.js"


export const createJob = async (req, res) => {
    try {
        const { id } = req.user

        const { title, description, requirements, salary, timing, days } = req.body

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id missing"
            })
        }
        if (!title || !description || !requirements || !salary || !timing || !days) {
            return res.status(400).json({
                success: false,
                message: "All fields require"
            })
        }

        const listJob = await Job.create({ userId: id, title, description, requirements, salary, timing, days })

        const checkUser = await User.findById(id)

        const updateActivity = await Institution.findByIdAndUpdate(checkUser.activity, { $push: { job: listJob._id } }, { new: true })


        return res.status(201).json({
            success: true,
            message: "Job listed successfully",
            listJob
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error while listing job",
            error: err.message
        })
    }
}

export const changeActive = async (req, res) => {
    try {
        const { id } = req.user

        const { jobId } = req.body

        if (!id || !jobId) {
            return res.status(400).json({
                success: false,
                message: "Id missing"
            })
        }

        const checkJob = await Job.findById(jobId)
        if (!checkJob) {
            return res.status(404).json({
                success: false,
                message: "Job missing"
            })
        }

        const unlistJob = await Job.findByIdAndUpdate(jobId, { isActive: !checkJob.isActive })


        return res.status(201).json({
            success: true,
            message: "Job listed successfully",
            unlistJob
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error while listing job",
            error: err.message
        })
    }
}

export const deleteJob = async (req, res) => {
    try {
        const { id } = req.user

        const { jobId } = req.body

        if (!id || !jobId) {
            return res.status(400).json({
                success: false,
                message: "Id missing"
            })
        }

        const checkJob = await Job.findById(jobId)

        if (!checkJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }

        const checkUserActivity = await User.findById(id)
        if (!checkUserActivity.activity) {
            return res.status(404).json({
                success: false,
                message: "Something not found 'activity'"
            })
        }

        const updateUserActivity = await Institution.findByIdAndUpdate(checkUserActivity.activity, { $pull: { job: checkJob._id } })
        const delJob = await Job.findByIdAndDelete(jobId)



        return res.status(201).json({
            success: true,
            message: "Job deleted successfully"
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error while listing job",
            error: err.message
        })
    }
}