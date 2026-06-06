import mongoose from "mongoose";

export const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    enrolledCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
})

export const Student = mongoose.model("Student", studentSchema)
