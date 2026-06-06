import { resend } from "../config/Mail.js";

export const sendEmail = async (email, subject, template) => {
    try {
        const response = await resend.emails.send({
            from: "EduGrow <onboarding@resend.dev>",
            to: email,
            subject,
            html: template,
        });

        console.log("Email sent:", response);
    } catch (error) {
        console.error("Email error:", error);
    }
};