import {Contact} from "../models/Contact.js";

export const submitContact = async (req, res) => {
    try {
        const data = req.body;

        const response = await Contact.create(data);

        return res.status(201).json({
            success: true,
            message: "Submitted successfully",
            data: response,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};