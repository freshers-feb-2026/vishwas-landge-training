import express from "express"
import asyncHandler from "../utils/asyncHandler.js";
import { cancelAppointment, createAppointment, getAllAppointments, getSlots } from "../controllers/appointmet.controller.js";
import { ROLE } from "../constants/index.js";
import RoleCheck from "../middlewares/RoleCheck.js";
import isAuth from "../middlewares/isAuth.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createAppointmentSchema } from "../validations/appointment.validation.js";

const router = express.Router();

router.get("/:doctorId/slots/:date" , asyncHandler(getSlots))
router.get("/" ,isAuth, asyncHandler(getAllAppointments))
router.post("/:doctorId", validate(createAppointmentSchema), isAuth ,RoleCheck(ROLE.PATIENT) , asyncHandler(createAppointment))
router.post("/:appointmentId/cancel", isAuth ,RoleCheck(ROLE.PATIENT) , asyncHandler(cancelAppointment))
export default router;