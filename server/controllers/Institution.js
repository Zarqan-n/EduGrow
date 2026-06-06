import User from "../models/User.js";


export const getInstitution = async (req, res) => {
    try {
        const { id } = req.user
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid id"
            })
        }
        const data = await User.findById(id).populate({
            path: 'activity',
            select: "openForAdmission job",
            populate: {
                path: 'job',
            }
        }).populate("profile");

        return res.status(200).json({
            success: true,
            message: "Data fetch successfully",
            data
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error while getting user",
            error: err.message
        })
    }
}

