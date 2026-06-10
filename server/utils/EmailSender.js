import dotenv from 'dotenv'
import { transporter } from '../config/Mail.js'
import { otpTemplate } from '../templates/otpTemplate.js'
dotenv.config()

export const sendEmail = async (email, subject, template) => {
    try {
        console.log("Sending mail to:", email)
        const sendMail = await transporter.sendMail({
            from: "EduGrow",
            to: email,
            subject: subject,
            html: template
        })
        console.log("MAIL SENT");
        console.log(sendMail);
    }
    catch (err) {
        console.log(err)
    }
}