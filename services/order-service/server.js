const express = require("express");
const mongoose = require("mongoose");
const Order = require("./models/Order");

const app = express();
app.use(express.json());

app.post("/orders",async(req,res) =>{
    try {
        const { items } = req.body;

        for (const item of items){
            const response = await fetch (`http://localhost:4002/products/${item.productId}/reserve`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: item.quantity })
        }); 
            if(!response.ok) {
                const data = await response.json();
                return res.status(400).json({ error: data.error});
            }
        }
                const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.get("/orders",async (req,res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

mongoose.connect("mongodb://localhost:27017/orderdb")
   .then(() => console.log("MongoDB connected successfully!"))
   .catch((error) => console.log("Unable to connect to MongoDB:",error));

app.listen(4003, () => {
   console.log("order service runing on port 4003");
});