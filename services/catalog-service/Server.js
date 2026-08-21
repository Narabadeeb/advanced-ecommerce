const express = require("express");
const sequelize = require("./config/database");
const app = express();
app.use(express.json());
sequelize.authenticate().then(() => {
console.log("MySQL connected successfully!");
}).catch((error) => {
console.log("Unable to connect to MySQL:", error);
});
app.listen(4002, () => {
console.log("Catalog service running on port 4002");
});