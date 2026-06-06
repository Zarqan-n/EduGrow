import mongoose, { Mongoose } from "mongoose";

const SectionSchema = new mongoose.Schema({
    topic: {
        type: String,
        trim: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    videoUrl: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        trim: true
    }
})

const Section = mongoose.model("Section", SectionSchema)

export default Section