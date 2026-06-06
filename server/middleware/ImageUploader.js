import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../config/Cloudinary.js"

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "EduGrow",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
})

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
})

export default upload