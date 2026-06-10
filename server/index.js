import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/ConnectDB.js'
import cookieParser from 'cookie-parser'
import { AuthRouter } from './routes/auth.js'
import { UserRouter } from './routes/user.js'
import { CourseRouter } from './routes/course.js'
import { BookRouter } from './routes/book.js'
import { JobRouter } from './routes/job.js'
import cors from 'cors'
import dns from 'dns'

dotenv.config()
dns.setDefaultResultOrder('ipv4first')

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["https://edugrowzarqan.netlify.app", "http://localhost:5173"]
}));
app.use(cookieParser())
app.use("/api/auth", AuthRouter)
app.use("/api/user", UserRouter)
app.use("/api/course", CourseRouter)
app.use("/api/book", BookRouter)
app.use("/api/job", JobRouter)
app.use("/", (req, res) => {
    res.json({ message: "Wrong route Entered" })
})


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    connectDB()
    console.log(`Server running at port: ${PORT}`)

    import("net").then(({ default: net }) => {
        const socket = net.connect(587, "smtp.gmail.com");

        socket.on("connect", () => {
            console.log("CONNECTED TO GMAIL SMTP");
            socket.destroy();
        });

        socket.on("error", (err) => {
            console.log("TCP ERROR:", err);
        });

        socket.setTimeout(10000, () => {
            console.log("TCP TIMEOUT");
            socket.destroy();
        });
    });
});