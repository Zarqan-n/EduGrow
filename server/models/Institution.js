import mongoose from "mongoose";

export const institutionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    openForAdmission: {
        type: Boolean,
        default: false
    },
    job: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }],
    

})

export const Institution = mongoose.model("Institution", institutionSchema)