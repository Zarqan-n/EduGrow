import express from 'express'
import { AuthenticateUser } from '../middleware/Authentication.js'
import { createBook, deleteBook } from '../controllers/Book.js'
import upload from '../middleware/ImageUploader.js'
import { getAllBook } from '../controllers/Dashboard.js'

const router = express.Router()

router.post('/create', AuthenticateUser, upload.single("thumbnail"), createBook)
router.delete('/delete', AuthenticateUser, deleteBook)
router.get("/books", getAllBook)

export const BookRouter = router
