const fs = require('fs');
const path = require('path');
const pool = require('../config/database.js')
module.exports = class Cart {
    static fetchAllToAdd(callback) {
        pool.query("SELECT * FROM products", function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            console.log(rows)
            callback(rows)
        })
    }
    static addToCart(id, quantity, callback) {
        pool.query("INSERT INTO cart(productId,price,quantity) values(?,(SELECT price FROM products WHERE productId=?),?)", [id, id, quantity], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            else {
                callback({
                    success: true
                })
            }
        })
    }

    static viewInCart(callback) {
        pool.query("SELECT C.productId,P.productName,C.quantity,C.price,C.quantity*C.price as total_price FROM cart AS C,products AS P where C.productId=P.productId", function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            callback(rows)
        })

    }
    static deleteById(id, callback) {

        pool.query("SELECT * FROM `cart` WHERE `cartId`=?", [id], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            callback(rows)
        })
        pool.query("DELETE from cart where `cartId` =?", [id], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
        })
    }
}

