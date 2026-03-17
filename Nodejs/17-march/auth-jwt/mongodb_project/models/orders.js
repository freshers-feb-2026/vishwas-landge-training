import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  
    product:{
        type: String,
        required: true,
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

})

const Order = mongoose.model("Order", orderSchema);


export default Order;