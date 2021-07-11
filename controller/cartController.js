const cartController = {}
const CartItem = require('../model/cartItem')
const Cart = require('../model/cartModel')
const Product = require('../model/productModel')
const User = require('../model/userModel')


cartController.fetchAllToAdd = async (req, res) => {
    const products = await req.user.getProducts()
    res.render("listAll", {
        pageTitle: "Products",
        products: products,
        path: '/cart'
    });
}

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

cartController.addToCart = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    userId=req.user.id
    let cart= await Cart.create({
        ProductId: product.id
    })
    console.log(userId)
    console.log(product.id)
    await CartItem.create({
        ProductId: product.id,
        cartId: cart.id,
        quantity: req.body.quantity
    })
    res.redirect('/cart')
}

cartController.viewInCart = async (req, res) => {

    const cartItem = await CartItem.findAll({raw:true})
    const fromCartItem=cartItem.map(async (item)=>{
        const product = await Product.findByPk(item.ProductId,{raw:true})
        //console.log(product)
        item.productName=product.productName
        item.price=product.price
        return item
    })
    fromCartItem.then
        console.log("asdjfhfklfnasdn"+fromCartItem)
    // res.render("viewInCart", {
    //     pageTitle: "Cart",
    //     products: product,
    //     path: '/cart/inCart'
    // });
    // res.send(product)
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