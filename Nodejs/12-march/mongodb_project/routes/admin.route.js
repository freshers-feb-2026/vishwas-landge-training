
import express from 'express';
import {createAdmin, loginAdmin, logoutAdmin} from "../controllers/admin.controller.js";
import { adminLoginValidator, createAdminValidator } from '../validators/admin.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.post("/",createAdminValidator, validate ,asyncHandler(createAdmin));
router.post("/login",adminLoginValidator,validate, asyncHandler(loginAdmin));
router.post("/logout", asyncHandler(logoutAdmin));

export default router;