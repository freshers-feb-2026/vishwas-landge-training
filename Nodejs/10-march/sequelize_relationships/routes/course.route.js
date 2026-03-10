import express from "express"
import { addCourse, getAllCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.post("/", addCourse);
router.get("/",getAllCourse)

export default router;
