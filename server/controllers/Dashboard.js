import { Job } from "../models/Job.js"
import User from "../models/User.js"
import Book from '../models/Book.js'

export const getMyData = async (req, res) => {

    try {
        const { id } = req.user
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            })
        }
        const data = await User.findById(id).populate("activity").populate("profile").exec()

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error while getting user data",
            error: err.message
        })
    }
}

export const getMyProfileData = async (req, res) => {

    try {
        const { id } = req.user
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            })
        }
        const data = await User.findById(id).populate("profile").exec()

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error while getting profile data",
            error: err.message
        })
    }
}

export const getAlljob = async (req, res) => {

    try {
        const { timing, limit, skip } = req.query;
        
        const filter = {};
        if (timing && timing !== "All") {
            filter.timing = timing;
        }
        
        let offset = parseInt(skip) || 0;
        let max = parseInt(limit) || 12;
        
        let query = Job.find(filter).skip(offset).limit(max).populate({
            path: 'userId',
            select: "profile name",
            populate: {
                path: 'profile',
                select: "avatar name"
            }
        });

        const data = await query.exec();

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error while getting job data",
            error: err.message
        })
    }
}

export const getAllBook = async (req, res) => {

    try {
        const { condition, limit, skip, title } = req.query;
        
        const filter = {};
        if (condition && condition !== "All") {
            filter.condition = condition;
        }
        if (title) {
            filter.title = { $regex: title, $options: "i" };
        }
        
        let offset = parseInt(skip) || 0;
        let max = parseInt(limit) || 12;
        
        let query = Book.find(filter).skip(offset).limit(max).populate({
            path: 'userId',
            select: "profile name",
            populate: {
                path: 'profile',
                select: "avatar name"
            }
        });

        const data = await query.exec();

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error while getting job data",
            error: err.message
        })
    }
}