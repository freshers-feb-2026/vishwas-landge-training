import AppError from "../utils/AppError.js"

const RoleCheck = (allowedRole) => {

    return (req, res, next) => {


        if (allowedRole != req.user.role) {

            // return res.status(403).json({
            //     message: "Access Denied. Allowed Only For " + allowedRole,
            //     success: false
            // })

            throw new AppError("Access Denied. Allowed Only For " + allowedRole , 403)

        }

        next()

    }

}

export default RoleCheck;