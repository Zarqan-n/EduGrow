import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connection Successful")
    }
    catch (err) {
        console.log("Database Connection failed")
        console.error(err)
    }
}