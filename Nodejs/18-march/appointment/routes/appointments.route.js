import express from "express"
import asyncHandler from "../utils/asyncHandler.js";
import { createAppointment, getSlots } from "../controllers/appointmet.controller.js";
import { getAllAvaibility } from "../controllers/availability.controller.js";
import { ROLE } from "../constants/index.js";
import RoleCheck from "../middlewares/RoleCheck.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/:doctorId/slots/:date" , asyncHandler(getSlots))
router.post("/:doctorId", isAuth ,RoleCheck(ROLE.PATIENT) , asyncHandler(createAppointment))

export default router;