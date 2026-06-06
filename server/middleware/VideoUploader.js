import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../config/Cloudinary.js"

const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "EduGrow/DemoVideos",
        resource_type: "video",
        allowed_formats: ["mp4", "mov", "mkv", "avi"],
    },
});

export const uploadDemoVideo = multer({
    storage: videoStorage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB
    },
});