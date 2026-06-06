import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("EMAIL:", process.env.EMAIL);
console.log("PASS EXISTS:", !!process.env.PASS);

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

transporter.verify((error, success) => {
    if (error) {
        console.error("VERIFY ERROR:", error);
    } else {
        console.log("SMTP Ready");
    }
});