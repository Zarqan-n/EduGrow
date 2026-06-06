import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Student", "Teacher", "Admin", "Institution"],
        required: true
    },
    book: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }],
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "role"
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    resetPasswordToken: {
        type: String,
    },
    tokenExpire: {
        type: Date,
    }
})

const User = mongoose.model("User", UserSchema)
export default User