import express from "express"
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/users.controller.js"
import isAdmin from "../middlewares/isAdmin.js";
const router = express.Router();

router.post("/", isAdmin , addUser);
router.get("/",getAllUsers)
router.get("/:id", getUser)
router.put("/:id",isAdmin, updateUser);
router.delete("/:id" ,isAdmin, deleteUser);

export default router;
