import express from "express"
import asyncHandler from "../utils/asyncHandler.js";
import { createAppointment } from "../controllers/appointmet.controller.js";

const router = express.Router();

router.get("/:doctorId",asyncHandler(createAppointment))

export default router;