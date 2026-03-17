import { body } from "express-validator";

export const addCourseValidator = [

    body("name").trim().isLength({ min: 2, max: 24 }).withMessage("length must be between 2 to 24").isAlpha().withMessage("should only conatin character")

]