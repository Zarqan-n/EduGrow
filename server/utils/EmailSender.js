import dotenv from 'dotenv'
import { transporter } from '../config/Mail.js'
import { otpTemplate } from '../templates/otpTemplate.js'
dotenv.config()

export const sendEmail = async (email, subject, template) => {
    try {
        console.log("sending email...",email,subject)
        const sendMail = await transporter.sendMail({
            from: "EduGrow",
            to: email,
            subject: subject,
            html: template
        })
        console.log("Sendmail res: ",sendMail)
    }
    catch (err) {
       console.log(err.message)
    }
}