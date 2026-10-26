const express = require("express");
const mongoose = require("mongoose");
const Order = require("./models/Order");

const app = express();
app.use(express.json());

app.post("/orders",async(req,res) =>{
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({error: error.message });
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