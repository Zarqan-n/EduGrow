import { Profile } from "../models/Profile.js"
import User from "../models/User.js"


export const updateProfile = async (req, res) => {

    try {

        const avatarUrl = req.file?.path
        //fetch req.body
        const { mobile, location, gender, bio, name } = req.body
        const id = req.user.id
        console.log(avatarUrl)
        //validate
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "All fields required"
            })
        }

        const checkUser = await User.findById(id)
        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "User details not found"
            })
        }

        const dynamicProfile = {}
        if (mobile) dynamicProfile.mobile = mobile
        if (name) dynamicProfile.name = name
        if (bio) dynamicProfile.bio = bio
        if (location) dynamicProfile.location = location
        if (gender) dynamicProfile.gender = gender
        if (avatarUrl) dynamicProfile.avatar = avatarUrl

        const updateUserProfile = await Profile.findByIdAndUpdate(checkUser.profile, dynamicProfile, { new: true })

        return res.status(201).json({
            success: true,
            message: "Profile update successfully",
            updateUserProfile
        })


    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            err: err.message
        })
    }

}
