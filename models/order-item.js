const Sequelize = require("sequelize");
const sequelize = require("../utils/database")

const OrderItem = sequelize.define("orderItem", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    }
})

module.exports = OrderItem