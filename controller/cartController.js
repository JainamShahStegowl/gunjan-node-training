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
    const product = await Product.findByPk(productId,
        { attributes: ['productId', 'productName', 'price', 'quantity', 'image', 'createdAt', 'updatedAt'] })
    res.render("addform", {
        pageTitle: "Add Product",
        product: product,
        path: "/cart/addpath"
    });
}

cartController.addToCart = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    await Cart.create({
        ProductProductId: product.dataValues.productId || req.params.id,
        price: product.price,
        quantity: req.body.quantity
    })
    
    res.redirect('/cart')
}

cartController.viewInCart = async (req, res) => {

    const products = await Cart.findAll(
        {include: Product},
       )
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