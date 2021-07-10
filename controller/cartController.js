const cartController = {}
const Cart = require('../model/cartModel')
const Product = require('../model/productModel')

cartController.fetchAllToAdd = async (req, res) => {
    const products = await Product.findAll(
        { attributes: ['productId', 'productName', 'price', 'quantity', 'image', 'createdAt', 'updatedAt'] })
    res.render("listAll", {
        pageTitle: "Products",
        products: products,
        path: '/cart'
    });
}

cartController.addpath = async (req, res) => {
    const productId = parseInt(req.params.id);
    const product = await Product.findAll(
        { attributes: ['productId', 'productName', 'price', 'quantity', 'image', 'createdAt', 'updatedAt'] }, {
        where: {
            productId: productId
        }
    })
    res.render("addform", {
        pageTitle: "Add Product",
        product: product[0],
        path: "/cart/addpath"
    });
}
cartController.addToCart = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    await Cart.create({
        productId: product.productId,
        price: product.price,
        quantity: req.body.quantity
    })
    res.redirect('/cart')
}

cartController.viewInCart = async (req, res) => {

    const products = await Cart.findAll(
        { attributes: ['productId', 'cartId', 'price', 'quantity'] })
    res.render("viewInCart", {
        pageTitle: "Cart",
        products: products,
        path: '/cart/inCart'
    });
}

cartController.deleteById = async (req, res) => {
    await Cart.destroy({
        where: {
            cartId: req.params.id
        }
    })
    res.json({
        success: true,
    });
}

module.exports = cartController;