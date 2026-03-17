
import express from 'express';
import {createAdmin, loginAdmin, logoutAdmin} from "../controllers/admin.controller.js";
import { adminLoginValidator, createAdminValidator } from '../validators/admin.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import multer from "multer"
const router = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, 'images')

    },

    filename: (req, file, cb) => {

        cb(null, Date.now()+ "-" + file.originalname)

    }


})


const fileFilter = (req, file, cb) => {

    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only images allowed"), false);
    }

}

router.post("/",multer({storage:fileStorage , fileFilter:fileFilter}).single("image") , createAdminValidator, asyncHandler(createAdmin));
router.post("/login",adminLoginValidator,validate, asyncHandler(loginAdmin));
router.post("/logout", asyncHandler(logoutAdmin));

export default router;


// multer({dest:"images"}).single("image")