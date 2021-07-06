const cartController = {}
const Cart = require('../model/cartModel')

cartController.fetchAllToAdd = (req, res) => {
    Cart.fetchAllToAdd((products) => {
        res.render("listAll", {
            pageTitle: "Products",
            products: products,
            path: '/cart'
        });
    });
}

cartController.addpath = (req, res) => {
    const productId = parseInt(req.params.id);
    Cart.fetchById(productId, (product) => {
        res.render("addform", {
            pageTitle: "Add Product",
            product: product[0],
            path: "/cart/addpath"
        });
    })

}

cartController.addToCart = (req, res) => {
    Cart.addToCart(req.params.id, req.body.quantity, (products) => {
        res.redirect('/cart')
    });
}

cartController.viewInCart = (req, res) => {
    Cart.viewInCart((products) => {
        res.render("viewInCart", {
            pageTitle: "Cart",
            products: products,
            path: '/cart/inCart'
        });
    });
}

cartController.deleteById = (req, res) => {
    Cart.deleteById(req.params.id, (product) => {
        res.json({
            success: true,
            products: product
        });
    })
}

module.exports = cartController;