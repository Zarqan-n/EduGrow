import mongoose from "mongoose";

export const teacherSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    jobApplied: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }],
    document: {
        type: String,
        default: ""
    },


})

export const Teacher = mongoose.model("Teacher", teacherSchema)
