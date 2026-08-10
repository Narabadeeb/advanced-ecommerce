const express = require("express");
const app = express();
app.get("/", (req, res) => {res.send("Hello from Auth Service!");
    });
    app.listen(4001, () => {
        console.log("Auth service running on port 4001");
        });