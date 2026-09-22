const { createClient } = require("redis");
const client = createClient({
url: "redis://localhost:6380"
});
client.on("error", (error) => console.log("Redis Client Error", error));
client.connect();
module.exports = client;