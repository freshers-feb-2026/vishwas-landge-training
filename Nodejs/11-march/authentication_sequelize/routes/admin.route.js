
import express from 'express';
import {createAdmin, loginAdmin, logoutAdmin, resetPassword, SendResetPasswordMail} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/", createAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/forgot-password", SendResetPasswordMail);
router.post("/reset-password/:token", resetPassword);

export default router;