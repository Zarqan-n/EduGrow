
export const isTeacher = (req, res, next) => {
    const role = req.user.role
    if (role !== "Teacher") {
        return res.status(401).json({
            success: false,
            message: "Restricted page for Teacher"
        })
    }
    next()
}
export const isStudent = (req, res, next) => {
    const role = req.user.role
    if (role !== "Student") {
        return res.status(401).json({
            success: false,
            message: "Restricted page for Student"
        })
    }
    next()
}
export const isInstitution = (req, res, next) => {
    const role = req.user.role
    if (role !== "Institution") {
        return res.status(401).json({
            success: false,
            message: "Restricted page for Institution"
        })
    }
    next()
}
export const isAdmin = (req, res, next) => {
    const role = req.user.role
    console.log(role)
    if (role !== "Admin") {
        return res.status(401).json({
            success: false,
            message: "Restricted page for Admin"
        })
    }
    next()
}