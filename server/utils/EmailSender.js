import dotenv from 'dotenv'
import { transporter } from '../config/Mail.js'
import { otpTemplate } from '../templates/otpTemplate.js'
dotenv.config()

export const sendEmail = async (email, subject, template) => {
    try {
        console.log("Sending email...");
        console.log("To:", email);
        console.log("Subject:", subject);

        const info = await transporter.sendMail({
            from: `"EduGrow" <${process.env.EMAIL}>`,
            to: email,
            subject: subject,
            html: template,
        });

        console.log("Email sent successfully");
        console.log("Message ID:", info.messageId);

        return info;
    } catch (error) {
        console.error("MAIL ERROR:");
        console.error(error);

        throw error;
    }
};