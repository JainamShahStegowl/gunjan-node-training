const cartController = {}
const mongoose = require('mongoose')
const Cart = require('../model/cartModel').Carts
const CartItem = require('../model/cartItem').CartItems
const Product = require('../model/productModel').Products

// Fetch data to add
cartController.fetchAllToAdd = async (req, res) => {
    try {
        const products = await Product.find();
        res.render("listAll", {
            pageTitle: "Products",
            products: products,
            path: '/cart'
        });
    }
    catch (err) {
        res.send(err)
    }
}

//controller for route of add form 
cartController.addpath = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId)
        res.render("addform", {
            pageTitle: "Add Product",
            product: product,
            path: "/cart/addpath"
        });
    }
    catch (err) {
        res.send(err)
    }
}

//add product to cart
cartController.addToCart = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        userId = req.user._id
        let cart = await Cart.create({
            ProductId: product._id
        })
        await CartItem.create({
            ProductId: product._id,
            cartId: cart._id,
            quantity: req.body.quantity
        })
        res.redirect('/cart')
    }
    catch (err) {
        res.send(err)
    }
}

//view products added in the cart
cartController.viewInCart = async (req, res) => {
    try {
        const cartItem = await CartItem.find()
        const inCart = await Promise.all(cartItem.map(async (item) => {
            const product = await Product.findById(item.ProductId)
            item.productName = product.productName
            item.price = product.price
            return item
        }))
        res.render("viewInCart", {
            pageTitle: "Cart",
            products: inCart,
            path: '/cart/inCart'
        });
    }
    catch (err) {
        res.send(err)
    }
}

//remove product from cart
cartController.deleteById = async (req, res) => {
    try {
        let product = await CartItem.findById(req.params.id)
        product.delete()
        res.json({
            success: true,
        });
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = cartController;
