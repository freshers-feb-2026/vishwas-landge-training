import Order from "../models/orders.js";
import User from "../models/user.js";
import AppError from "../utils/AppError.js";
import { validateOrderData } from "../utils/index.js";

export const createOrder = async (req, res) => {

        const orderData = req.body;

        const error = validateOrderData(orderData)

        if (error) {
            throw AppError(error , 400)
        }

        const user = User.findById(orderData.id);

        if (!user) {

            throw AppError("User not found" , 404)

        }

        const order = await Order.insertOne(orderData);

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order: order
        })

}

export const getAllOrders = async (req, res) => {


       const orders = await Order.find().populate("userId");
       return res.status(200).json({
            success:true,
            message:"orders fetched successfully",
            orders
        })

}