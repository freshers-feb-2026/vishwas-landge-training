import { body } from "express-validator";
import Admin from "../models/admin.js";

export const createAdminValidator = [

    body("name").trim().notEmpty().isLength({ min: 2, max: 24 }).withMessage("Name lenght must between 3 to 24"),
    body("email").trim().isEmail().withMessage("Enter valid email").normalizeEmail().custom(async(email)=>{
        
        const exstingAdmin = await Admin.findOne({email})

        if (exstingAdmin) {
             throw new Error("Email already exists");
        }

        return true;


    }),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
]

export const adminLoginValidator = [
    body("email").trim().isEmail().withMessage("Enter valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
]



