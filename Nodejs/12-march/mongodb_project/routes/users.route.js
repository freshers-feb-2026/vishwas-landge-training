import express from "express"
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/users.controller.js"
import isAdmin from "../middlewares/isAdmin.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const router = express.Router();

router.post("/", isAdmin , asyncHandler(addUser));
router.get("/",asyncHandler(getAllUsers))
router.get("/:id", asyncHandler(getUser))
router.put("/:id",isAdmin, asyncHandler(updateUser));
router.delete("/:id" ,isAdmin, asyncHandler(deleteUser));

export default router;
