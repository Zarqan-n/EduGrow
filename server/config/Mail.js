import dotenv from 'dotenv'
import nodemailer from "nodemailer";

dotenv.config()


export const transporter = nodemailer.createTransport({
    service: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});
