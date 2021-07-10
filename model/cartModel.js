const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./productModel');
const Cart = sequelize.define('Cart', {
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
