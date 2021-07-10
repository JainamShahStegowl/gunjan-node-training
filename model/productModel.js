const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    productName: {
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
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})
module.exports = Product;
