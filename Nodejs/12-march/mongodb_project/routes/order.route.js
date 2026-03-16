import express from "express"
import { createOrder, getAllOrders } from "../controllers/order.controller.js"
import isAdmin from "../middlewares/isAdmin.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const router = express.Router()

router.post("/" ,isAdmin ,asyncHandler(createOrder))
router.get("/" ,isAdmin, asyncHandler(getAllOrders))


export default router;