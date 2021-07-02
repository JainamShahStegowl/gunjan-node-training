const cartController = {}
const Cart = require('../model/cartModel')

cartController.fetchAllToAdd = (req, res) => {
    Cart.fetchAllToAdd((products) => {
        res.json(products)
    });
}

cartController.addToCart = (req, res) => {
    Cart.addToCart(req.params.id, req.params.quantity, (products) => {
        res.json(products)
    });
}

cartController.viewInCart = (req, res) => {
    Cart.viewInCart((products) => {
        res.json(products)
    });
}

cartController.deleteById = (req, res) => {
    Cart.deleteById(req.params.id, (product) => {
        res.json(product)
    })
}

module.exports = cartController;