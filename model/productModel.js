const fs = require('fs');
//const Pool = require('mysql2/typings/mysql/lib/Pool');
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
            // Connection is automatically released when query resolves
            if (err) {
                console.log(err)
            }
            console.log(rows)
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
            else{
            callback({
                success:true
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

        // console.log(products)
        //console.log(this.productId)
        //console.log(this)
        pool.query("INSERT INTO products(productName,quantity,price,image) VALUES(?,?,?,?)", [this.productName, this.quantity, this.price, this.image], function (err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err) {
                console.log(err)
            }
            //return rows
        })
    }

    update(id){
        pool.query("UPDATE products SET productName=?, quantity=?, price=?, image=? WHERE productId=?;", [this.productName, this.quantity, this.price, this.image,id], function (err, rows, fields) {
            // Connection is automatically released when query resolves
            if (err) {
                console.log(err)
            }
            //return rows
        }) 
    }

    static deleteFromCart(id, callback) {

        pool.query("SELECT * FROM `cart` WHERE `productId`=?", [id], function (err, rows, fields) {
            if (err) {
                console.log(err)
            }
            else{
            callback({
                success:true
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
