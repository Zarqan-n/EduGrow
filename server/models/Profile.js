import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    bio: {
        type: String
    }
})

export const Profile = mongoose.model("Profile", ProfileSchema)