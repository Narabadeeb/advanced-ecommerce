const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
app.use("/api/auth", createProxyMiddleware({ target: "http://localhost:4001", changeOrigin: true }));
app.listen(4000,() => {
    console.log("Gateway running on port 4000");
    });
