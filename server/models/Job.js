import mongoose from "mongoose";

export const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
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

    requirements: {
        type: String,
        required: true,
        trim: true,
    },

    salary: {
        type: Number,
        required: true,
        min: 0,
    },

    timing: {
        type: String,
        required: true,
        trim: true,
    },

    days: {
        type: String,
        required: true,
        trim: true,
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps:true })

export const Job = mongoose.model("Job", jobSchema)