const fs = require('fs');
//const Pool = require('mysql2/typings/mysql/lib/Pool');
const path = require('path');
const pool = require('../config/database.js')
module.exports = class Cart {
    static fetchAllToAdd(callback) {
        pool.query("SELECT * FROM products", function (err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err) {
                console.log(err)
            }
            console.log(rows)
            callback(rows)
        })

    }
    static addToCart(id, quantity, callback) {
        pool.query("INSERT INTO cart(productId,price,quantity) values(?,(SELECT price FROM products WHERE productId=?),?)", [id, id, quantity], function (err, rows, fields) {
            // Connection is automatically released when query resolves
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

    static viewInCart
    (callback) {
        pool.query("SELECT * FROM products", function (err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err) {
                console.log(err)
            }
            console.log(rows)
            callback(rows)
        })

    }
}
