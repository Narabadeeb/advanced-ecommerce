
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
          productId:{ type: Number,required:true},
          quantity: { type: Number,required:true }
        }
    ],
    status: { type: String, default: "pending"}
}, {timestamps: true });

module.exports = mongoose.model("Order",orderSchema);

