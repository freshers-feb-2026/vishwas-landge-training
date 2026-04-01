import express from "express"
import asyncHandler from "../utils/asyncHandler.js";
import { createUser, getAllUsers, loginUser } from "../controllers/users.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createUserSchema, userLoginSchema } from "../validations/user.validation.js";
const router = express.Router();

router.post("/login", validate(userLoginSchema), asyncHandler(loginUser))
router.post("/signup",validate(createUserSchema), asyncHandler(createUser))
router.get("/" , asyncHandler(getAllUsers))

export default router;