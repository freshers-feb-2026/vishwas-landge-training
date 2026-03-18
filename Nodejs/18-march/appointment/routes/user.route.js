import express from "express"
import asyncHandler from "../utils/asyncHandler.js";
import { createUser, loginUser } from "../controllers/users.controller.js";
const router = express.Router();

router.post("/login" ,asyncHandler(loginUser))
router.post("/signup" , asyncHandler(createUser))


export default router;