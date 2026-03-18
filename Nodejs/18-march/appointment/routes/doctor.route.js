import express from "express"
import asyncHandler from "../utils/asyncHandler.js";
import { createAvaibility } from "../controllers/availability.controller.js";

const router = express.Router();

router.post("/avaibility" , asyncHandler(createAvaibility))

export default router;