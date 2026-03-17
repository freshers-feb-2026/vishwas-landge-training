import express from "express"
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/users.controller.js"
import isAdmin from "../middlewares/isAdmin.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();

router.post("/", isAuth, isAdmin , asyncHandler(addUser));
router.get("/",asyncHandler(getAllUsers))
router.get("/:id", asyncHandler(getUser))
router.put("/:id",isAuth, isAdmin, asyncHandler(updateUser));
router.delete("/:id" ,isAuth, isAdmin, asyncHandler(deleteUser));

export default router;
