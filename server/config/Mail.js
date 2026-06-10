import dotenv from 'dotenv'
import nodemailer from "nodemailer";

dotenv.config()

export const transporter = nodemailer.createTransport({
  service: "gmail",
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