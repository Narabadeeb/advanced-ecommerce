const express = require("express");
const sequelize = require("./config/database");
const Product = require("./models/Product");
const redisClient = require("./config/redis");

const app = express();
app.use(express.json());
app.post("/products", async (req, res) => {
try {
const product = await Product.create(req.body);
await redisClient.del("products");
res.status(201).json(product);
} catch (error) {
res.status(400).json({ error: error.message });
}
});
app.get("/products", async (req, res) => {
try {
const cachedProducts = await redisClient.get("products");
if (cachedProducts) {
return res.status(200).json(JSON.parse(cachedProducts));
}
const products = await Product.findAll();
await redisClient.set("products", JSON.stringify(products));
res.status(200).json(products);
} catch (error) {
res.status(500).json({ error: error.message });
}
});
app.get("/products/:id", async (req, res) => {
try {
const product = await Product.findByPk(req.params.id);
if (!product) {
return res.status(404).json({ error: "Product not found" });
}
res.status(200).json(product);
} catch (error) {
res.status(500).json({ error: error.message });
}
});
app.put("/products/:id", async (req, res) => {
try {
const product = await Product.findByPk(req.params.id);
if (!product) {
return res.status(404).json({ error: "Product not found" });
}
await product.update(req.body);
await redisClient.del("products");
res.status(200).json(product);
} catch (error) {
res.status(400).json({ error: error.message });
}
});
app.delete("/products/:id", async (req, res) => {
try {
const product = await Product.findByPk(req.params.id);
if (!product){
return res.status(404).json({ error: "Product not found" });
}
await product.destroy();
await redisClient.del("products");
res.status(200).json({ message: "Product deleted successfully" });
} catch (error) {
res.status(500).json({ error: error.message });
}
});
app.post("/products/:id/reserve", async (req, res) => {
const t = await sequelize.transaction();
try {
const product = await Product.findByPk(req.params.id, { transaction: t, lock: t.LOCK.UPDATE });
if (!product) {
await t.rollback();
return res.status(404).json({ error: "Product not found" });
}
const quantity = req.body.quantity;
if (product.stock < quantity) {
await t.rollback();
return res.status(400).json({ error: "Insufficient stock" });
}
await product.update({ stock: product.stock - quantity },{ transaction: t });
await t.commit();
await redisClient.del("products");
res.status(200).json(product);
} catch (error) {
if (!t.finished) await t.rollback();
res.status(500).json({ error: error.message });
}
});
sequelize.authenticate().then(() => {
console.log("MySQL connected successfully!");
return sequelize.sync();
}).then(() => {
console.log("Database synced!");
}).catch((error) => {
console.log("Unable to connect to MySQL:", error);
});
app.listen(4002, () => {
console.log("Catalog service running on port 4002");
});