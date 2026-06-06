import mongoose, { Types } from "mongoose";

const RatingAndReviewSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    review: {
        type: String,
    }
}, { timestamps: true })

export const RatingAndReview = mongoose.model("RatingAndReview", RatingAndReviewSchema) 