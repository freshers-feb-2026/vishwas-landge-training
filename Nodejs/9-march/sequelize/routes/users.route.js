import express from "express"
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/users.controller.js"
const router = express.Router();

router.post("/", addUser);
router.get("/",getAllUsers)
router.get("/:id", getUser)
router.put("/:id", updateUser);
router.delete("/:id" , deleteUser);

export default router;
