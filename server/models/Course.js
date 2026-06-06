import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        timing: {
            type: String,
            required: true,
            trim: true,
        },

        duration: {
            type: String,
            required: true,
            trim: true,
        },

        classes: {
            type: String,
            required: true,
            trim: true,
        },

        demoVideo: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        thumbnail: {
            type: String,
            default: "",
        },

        language: {
            type: String,
            required: true,
            trim: true,
        },

        section: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }],
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        enrolledStudents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        ratingAndReview: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }],
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;