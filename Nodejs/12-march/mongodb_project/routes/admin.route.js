
import express from 'express';
import {createAdmin, loginAdmin, logoutAdmin} from "../controllers/admin.controller.js";
import { adminLoginValidator, createAdminValidator } from '../validators/admin.validator.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = express.Router();

router.post("/",createAdminValidator, validate ,createAdmin);
router.post("/login",adminLoginValidator,validate, loginAdmin);
router.post("/logout", logoutAdmin);

export default router;