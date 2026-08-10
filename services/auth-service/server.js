const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const app = express();
mongoose.connect("mongodb://localhost:27017/authdb");
app.use(express.json());
app.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).send("User registered successfully!");
        } catch (error) {
            res.status(400).send(error.message);
            }
});
app.get("/", (req, res) => {res.send("Hello from Auth Service!");
    });
    app.listen(4001, () => {
        console.log("Auth service running on port 4001");
        });
