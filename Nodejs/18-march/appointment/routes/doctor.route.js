import express from "express"
import asyncHandler from "../utils/asyncHandler.js";
import { createAvaibility, getAllAvaibility } from "../controllers/availability.controller.js";
import isAuth from "../middlewares/isAuth.js";
import RoleCheck from "../middlewares/RoleCheck.js";
import { ROLE } from "../constants/index.js";

const router = express.Router();

router.post("/avaibility" ,isAuth,RoleCheck(ROLE.DOCTOR), asyncHandler(createAvaibility))
router.get("/avaibility/:doctorId",asyncHandler(getAllAvaibility))

export default router;