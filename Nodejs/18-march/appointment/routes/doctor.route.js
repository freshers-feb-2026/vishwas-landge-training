import express from "express"
import asyncHandler from "../utils/asyncHandler.js";
import { createAvaibility, getAllAvaibility, getDoctors } from "../controllers/doctor.controller.js";
import isAuth from "../middlewares/isAuth.js";
import RoleCheck from "../middlewares/RoleCheck.js";
import { ROLE } from "../constants/index.js";

const router = express.Router();

router.post("/avaibility" ,isAuth,RoleCheck(ROLE.DOCTOR), asyncHandler(createAvaibility))
router.get("/avaibility/:doctorId",asyncHandler(getAllAvaibility))
router.get("/",asyncHandler(getDoctors))

export default router;