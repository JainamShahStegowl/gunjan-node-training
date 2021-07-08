const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Cart = sequelize.define('Cart', {
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(30, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.DECIMAL(30, 2),
        allowNull: false,
    },
})
module.exports = Cart;
