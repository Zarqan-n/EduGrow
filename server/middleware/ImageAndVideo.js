import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../config/Cloudinary.js"

export const courseUpload = multer({
    storage: new CloudinaryStorage({
        cloudinary,
        params: async (req, file) => {
            if (file.fieldname === "demoVideo" || file.fieldname === "videoUrl") {
                return {
                    folder: "EduGrow/SectionVideos",
                    resource_type: "video",
                };
            }
            return {
                folder: "EduGrow",
                resource_type: "image",
                allowed_formats: ["jpg", "png", "jpeg", "webp"],
            };
        },
    }),
    limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for videos
});