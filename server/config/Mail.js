import dotenv from 'dotenv'
import nodemailer from "nodemailer";
import dns from "dns";

dotenv.config()
dns.lookup("smtp.gmail.com", { all: true }, (err, addresses) => {
    console.log("SMTP addresses:", addresses);
});

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    logger: true,
    debug: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

console.log("EMAIL:", process.env.EMAIL);
console.log("PASS LENGTH:", process.env.PASS?.length);

transporter.verify((err, success) => {
    if (err) {
        console.error("VERIFY ERROR:", err);
    } else {
        console.log("SMTP READY");
    }
});