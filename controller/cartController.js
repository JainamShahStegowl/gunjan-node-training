const cartController = {}
const Cart = require('../model/cartModel')
const Product = require('../model/productModel')

cartController.fetchAllToAdd = async (req, res) => {
    const products = await Product.findAll()
    res.render("listAll", {
        pageTitle: "Products",
        products: products,
        path: '/cart'
    });
}

cartController.addpath = async (req, res) => {
    const productId = parseInt(req.params.id);
    const product = await Product.findAll({
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
    const price = await Product.findByPk(req.params.id, {
        attributes: ['price'],
    });
    console.log(price)
    await Cart.create({
        productId: req.params.id,
        price: parseInt(price),
        quantity: req.body.quantity
    })
    res.redirect('/cart')
}

cartController.viewInCart = async (req, res) => {

    const products = await Cart.findAll({
        include: {
            model: Product,
            where: { productId: Cart.productId }
        },
        attributes: ['cartId', 'productId', 'productName', 'price', 'quantity', 'price' * 'quantity'],
    })
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