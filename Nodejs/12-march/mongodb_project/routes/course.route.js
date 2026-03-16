import express from "express"
import { addCourse, getAllCourse } from "../controllers/course.controller.js";
import { addCourseValidator } from "../validators/course.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/",addCourseValidator,validate, addCourse);
router.get("/",getAllCourse)

export default router;
