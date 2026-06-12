import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 300
    }
})

export const Otp = mongoose.model("Otp", OtpSchema)