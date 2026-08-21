const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("catalogdb","root","password123",{
host:"localhost",
port: 3307,
dialect: "mysql",
});
module.exports = sequelize;