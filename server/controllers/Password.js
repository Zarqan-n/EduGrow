import bcrypt from 'bcrypt'
import User from '../models/User.js'
import { sendEmail } from '../utils/EmailSender.js'
import { resetPasswordTemplate } from '../templates/ResetPassword.js'
import crypto from 'crypto'

export const changePassword = async (req, res) => {
    try {
        const { password, newConfirmPassword, newPassword } = req.body
        const { id } = req.user

        if (newPassword !== newConfirmPassword) {
            return res.status(401).json({
                success: false,
                message: "New password does not match"
            })
        }


        const userPassword = await User.findById(id).select('password -_id');
        console.log(userPassword)

        //verify password
        const verifyPassword = await bcrypt.compare(password, userPassword.password)
        console.log("Verify: ", verifyPassword)
        if (!verifyPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password entered"
            })
        }

        //hash new password
        const newHashPassword = await bcrypt.hash(newPassword, 10)

        const updatePassword = await User.findByIdAndUpdate(id, { password: newHashPassword }, { new: true })
        return res.status(201).json({
            success: true,
            message: "Password updated successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

export const resetPassword = async (req, res) => {
    try {

        //fetch email and validate
        const { email } = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Missing email"
            })
        }

        const checkUserExist = await User.findOne({ email })
        if (!checkUserExist) {
            return res.status(404).json({
                success: false,
                message: "User does not exist with this email"
            })
        }

        const genRandomString = crypto.randomUUID()
        console.log("Reset Url: ", genRandomString)

        const setToken = await User.findByIdAndUpdate(checkUserExist._id, { resetPasswordToken: genRandomString, tokenExpire: Date.now() + 5*60*1000 })

        const createUrl = `https://edugrowzarqan.netlify.app//reset-password/${genRandomString}`
        const sendPasswordUrl = await sendEmail(email, "Reset password link", resetPasswordTemplate(createUrl))

        return res.status(200).json({
            success: true,
            message: "Password reset link sent successfully",
            createUrl
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
}

export const verifyPasswordUrl = async (req, res) => {
    try {
        const { token } = req.params
        const { newPassword, newConfirmPassword } = req.body

        if (!newPassword || !newConfirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Missing input"
            })
        }

        if (newPassword !== newConfirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password does not match"
            })
        }

        const CheckUserUrl = await User.findOne({ resetPasswordToken: token })
        if (!CheckUserUrl) {
            {
                return res.status(400).json({
                    success: false,
                    message: "Invalid url"
                })
            }
        }

        //check token expires or not
        if (CheckUserUrl.tokenExpire < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Reset link timeout try again"
            })
        }

        const newHashPassword = await bcrypt.hash(newPassword, 10)
        const updateUserPassword = await User.findByIdAndUpdate(CheckUserUrl._id, { password: newHashPassword, resetPasswordToken: null, tokenExpire: null })

        return res.status(200).json({
            success: true,
            message: "Password set successfully"
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal error while verify url",
            error: err.message
        })
    }
}