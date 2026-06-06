import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["contact", "suggestion", "bug"],
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
        },

        subject: {
            type: String,
            trim: true,
        },

        title: {
            type: String,
            trim: true,
        },

        message: {
            type: String,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        bugTitle: {
            type: String,
            trim: true,
        },

        stepsToReproduce: {
            type: String,
            trim: true,
        },

    },
    {
        timestamps: true,
    }
);

export const Contact = mongoose.model("Contact", contactSchema);
