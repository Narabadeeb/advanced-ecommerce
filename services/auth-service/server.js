const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/authdb");
app.get("/", (req, res) => {res.send("Hello from Auth Service!");
    });
    app.listen(4001, () => {
        console.log("Auth service running on port 4001");
        });