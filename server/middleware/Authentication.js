import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const AuthenticateUser = (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            req.body?.token ||
            req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token missing please login"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode
        next()
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error while Authenticating",
            error: err.message
        })
    }
}