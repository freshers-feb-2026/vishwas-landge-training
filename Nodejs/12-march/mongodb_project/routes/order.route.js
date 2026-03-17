import express from "express"
import { createOrder, getAllOrders , getInvoice } from "../controllers/order.controller.js"
import isAdmin from "../middlewares/isAdmin.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const router = express.Router()

router.post("/" ,isAdmin ,asyncHandler(createOrder))
router.get("/" ,isAdmin, asyncHandler(getAllOrders))
router.get("/:id/invoice" , asyncHandler(getInvoice))

export default router;