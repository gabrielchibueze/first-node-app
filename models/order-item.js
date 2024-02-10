const Sequelize = require("sequelize");
const sequelize = require("../utils/database")

const OrderItem = sequelize.define("orderItem", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    quantity: Sequelize.INTEGER,
    totalPrice: Sequelize.DOUBLE
})

module.exports = OrderItem