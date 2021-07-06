const fs = require('fs');
const path = require('path');
const pool = require('../config/database.js')
module.exports = class Product {
    constructor(productName, quantity, price, image) {
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.image = image;
    }
    static fetchAll(callback) {
        pool.query("SELECT * FROM products", function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            callback(rows)
        })

    }

    static fetchById(id, callback) {
        pool.query("SELECT * FROM `products` WHERE `productId`=?", [id], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            callback(rows)
        })
    }

    static deleteById(id, callback) {

        pool.query("SELECT * FROM `products` WHERE `productId`=?", [id], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            else {
                callback({
                    success: true
                })
            }
        })
        pool.query("DELETE from products where productId =?", [id], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
        })
    }

    store() {
        pool.query("INSERT INTO products(productName,quantity,price,image) VALUES(?,?,?,?)", [this.productName, this.quantity, this.price, this.image], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
        })
    }

    update(id) {
        pool.query("UPDATE products SET productName=?, quantity=?, price=?, image=? WHERE productId=?;", [this.productName, this.quantity, this.price, this.image, parseInt(id)], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
        })
    }

    static deleteFromCart(id, callback) {

        pool.query("SELECT * FROM `cart` WHERE `productId`=?", [id], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            else {
                callback({
                    success: true
                })
            }
        })
        pool.query("DELETE from cart where productId =?", [id], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
        })
    }
}
