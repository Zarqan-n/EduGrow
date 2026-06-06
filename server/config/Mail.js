import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log("EMAIL:", process.env.EMAIL);
console.log("PASS EXISTS:", !!process.env.PASS);

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4, // force IPv4
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("VERIFY ERROR:", error);
    } else {
        console.log("SMTP Ready");
    }
});