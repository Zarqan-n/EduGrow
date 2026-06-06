import { transporter } from "../config/Mail.js";

export const sendEmail = async (email, subject, template) => {
    try {
        console.log("Sending email to:", email);

        const info = await transporter.sendMail({
            from: `"EduGrow" <${process.env.BREVO_EMAIL}>`,
            to: email,
            subject,
            html: template,
        });

        console.log("Email sent:", info.messageId);

        return info;
    } catch (error) {
        console.error("MAIL ERROR:", error);
        throw error;
    }
};