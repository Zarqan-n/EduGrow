import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { sendEmail } from "../utils/EmailSender.js"
import { Otp } from '../models/Otp.js'
import { generate } from "otp-generator";
import { otpTemplate } from "../templates/otpTemplate.js";
import { Profile } from "../models/Profile.js";
import { Institution } from "../models/Institution.js";
import { Teacher } from "../models/Teacher.js";
import { Student } from "../models/Student.js";
dotenv.config()

// Send otp to user
export const SendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "All field requied"
            })
        }

        const checkUserExist = await User.findOne({ email })
        if (checkUserExist) {
            return res.status(409).json({
                success: false,
                message: "User already exist"
            })
        }

        let otp
        let checkOtp
        otp = generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
        checkOtp = await Otp.findOne({ otp })
        while (checkOtp) {
            otp = generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
            checkOtp = await Otp.findOne({ otp })
        }

        console.log("Otp: ", otp)

        await Otp.create({ email, otp })
        const sendEmailtoUser = sendEmail(email, "Email verification", otpTemplate(otp))

        return res.status(201).json({
            success: true,
            message: "Otp sent successfully",
            otp
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

//Sign up handler
export const HandleSignUp = async (req, res) => {
    try {
        const { name, email, password, role, otp } = req.body;

        console.log(req.body)

        if (!name || !email || !password || !role || !otp) {
            return res.status(400).json({
                success: false,
                message: "All field requied"
            })
        }

        const checkUserExist = await User.findOne({ email })
        if (checkUserExist) {
            return res.status(409).json({
                success: false,
                message: "User already exist"
            })
        }

        //verify otp
        const recentOtp = await Otp.findOne({ email }).sort({ expireAt: -1 })
        if (!recentOtp) {
            return res.status(409).json({
                success: false,
                message: "Otp expired resend"
            })
        }
        if (otp !== recentOtp.otp) {
            return res.status(400).json({
                success: false,
                message: "Incorrect otp entered"
            })
        }

        const hashpassword = await bcrypt.hash(password, 10)

        //create profile

        //fetch avater link
        const link = await fetch(`https://ui-avatars.com/api/?name=${name}`)


        const createProfile = await Profile.create({ mobile: null, gender: null, location: null, bio: null, avatar: link.url })



        const newUser = new User({
            email, password: hashpassword, role, name, profile: createProfile._id
        })

        const saveUser = await newUser.save()

        let createActivity

        if (role === "Institution") {
            createActivity = await Institution.create({ userId: saveUser._id })
        }
        else if (role === "Teacher") {
            createActivity = await Teacher.create({ userId: saveUser._id })
        }
        else if (role === "Student") {
            createActivity = await Student.create({ userId: saveUser._id })
        }

        const updateActivity = await User.findByIdAndUpdate(saveUser._id, { activity: createActivity._id }, { new: true })

        console.log("User saved", saveUser)

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            updateActivity
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

//login handler
export const HandleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All field requied"
            })
        }

        const userData = await User.findOne({ email })
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        }

        const checkPassword = await bcrypt.compare(password, userData.password)
        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            })
        }

        //create token
        const payload = {
            email: userData.email,
            role: userData.role,
            id: userData._id
        }
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" })
        console.log(token)
        res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
        });

        console.log("user login token: ", token)

        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token: token
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

export const HandleLogout = async (req, res) => {
    try {
        res.cookie("token", "")

        return res.status(200).json({
            success: true,
            message: "Logout successfully"
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