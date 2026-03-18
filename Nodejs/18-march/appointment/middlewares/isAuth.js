import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../configs/config";

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


    const decoded = jwt.verify(token , JWT_SECRET);
    req.user = decoded;

} 

export default isAuth;