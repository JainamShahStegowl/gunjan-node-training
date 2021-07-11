const cartController = {}
const CartItem = require('../model/cartItem')
const Cart = require('../model/cartModel')
const Product = require('../model/productModel')

// Fetch data to add
cartController.fetchAllToAdd = async (req, res) => {
    const products = await req.user.getProducts()
    res.render("listAll", {
        pageTitle: "Products",
        products: products,
        path: '/cart'
    });
}

//controller for route of add form 
cartController.addpath = async (req, res) => {
    const productId = parseInt(req.params.id);
    //console.log(req.params.id)
    const product = await Product.findByPk(productId)
    res.render("addform", {
        pageTitle: "Add Product",
        product: product,
        path: "/cart/addpath"
    });
}

//add product to cart
cartController.addToCart = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    userId = req.user.id
    let cart = await Cart.create({
        ProductId: product.id
    })
    await CartItem.create({
        ProductId: product.id,
        cartId: cart.id,
        quantity: req.body.quantity
    })
    res.redirect('/cart')
}

//view products added in the cart
cartController.viewInCart = async (req, res) => {
    const cartItem = await CartItem.findAll({ raw: true })
    const inCart = await Promise.all(cartItem.map(async (item) => {
        const product = await Product.findByPk(item.ProductId, { raw: true })
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

//remove product from cart
cartController.deleteById = async (req, res) => {
    await CartItem.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({
        success: true,
    });
}

module.exports = cartController;
