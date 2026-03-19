import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../configs/config.js";
import AppError from "../utils/AppError.js";

const isAuth = (req, res, next) => {

    const authHeader = req.get("Authorization");

    if (!authHeader) {
        return res.status(401).json({
            message: "User is not authenticated",
            success: false
        })
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Missing Token",
            success: false
        })
    }

    try {
        const decoded = jwt.verify(token , JWT_SECRET, {
            maxAge:1000*60*60*60
        });
        
        req.user = decoded;
        next()
        
    } catch (error) {
        throw new AppError("Token Expired or invalid" , 403)
    }

} 

export default isAuth;