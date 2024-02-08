const { Sequelize } = require("sequelize")


const sequelize = new Sequelize("node-complete", "root", "Gabbyraw21#", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;