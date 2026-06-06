import mongoose from "mongoose"
import Book from "../models/Book.js"
import User from "../models/User.js"


export const createBook = async (req, res) => {
    try {

        const thumbnailUrl = req.file?.path
        const { title, description, condition, price } = req.body
        const id = req.user.id
        //validate
        if (!title || !description || !condition || !price || !id || !thumbnailUrl) {
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
            return res.status(404).json({
                success: false,
                message: "User details not found"
            })
        }


        const obj = { userId: id, title, description, price, condition, thumbnail: thumbnailUrl }

        const listBook = await Book.create(obj)

        const updateUser = await User.findByIdAndUpdate(id, { $push: { book: listBook._id } })

        return res.status(201).json({
            success: true,
            message: "Book listed successfully",
            updateUser
        })


    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while listing book",
            err: err.message
        })
    }
}

export const deleteBook = async (req, res) => {
    try {

        const { bookId } = req.body
        const { id } = req.user

        const bId = new mongoose.Types.ObjectId(bookId)


        const updateUser = await User.findByIdAndUpdate(id, { $pull: { book: bId } })

        const listBook = await Book.findByIdAndDelete(bookId)

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        })


    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error while deleting book",
            err: err.message
        })
    }
}