import express from "express"
import { createOrder, getAllOrders } from "../controllers/order.controller.js"
import isAdmin from "../middlewares/isAdmin.js"

const router = express.Router()

router.post("/" ,isAdmin ,createOrder)
router.get("/" ,isAdmin, getAllOrders)


export default router;