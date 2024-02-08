const Sequelize = require("sequelize")
const sequelize = require("../utils/database")

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:  true,
        allowNull: false,
    },
    name: Sequelize.STRING,

    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Product