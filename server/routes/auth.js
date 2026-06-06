import express from 'express'
import { HandleLogin, HandleLogout, HandleSignUp, SendOtp } from '../controllers/Auth.js'
import { AuthenticateUser } from '../middleware/Authentication.js'
import { changePassword, resetPassword, verifyPasswordUrl } from '../controllers/Password.js'


const router = express.Router()

router.post("/sendotp", SendOtp)
router.post("/signup", HandleSignUp)

router.post("/login", HandleLogin)
router.post("/logout", AuthenticateUser, HandleLogout)

router.put("/password", AuthenticateUser, changePassword)
router.post("/reset-password", resetPassword)
router.put("/reset-password/:token", verifyPasswordUrl)

export const AuthRouter = router