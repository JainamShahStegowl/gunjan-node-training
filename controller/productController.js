const productController = {}
const Product = require('../model/productModel').Products;
const mongoose = require('mongoose')

//view all the products
productController.list = async (req, res) => {
    try {
        const products = await Product.find();
        res.render("listProducts", {
            pageTitle: "Products",
            products: products,
            path: '/products'
        });
    }
    catch (err) {
        res.send(err)
    }
}

//update or delete a product
productController.updOrDel = async (req, res) => {
    
        let UserId = mongoose.Types.ObjectId(req.user._id)
        const products = await Product.find({ "UserId": UserId });
        console.log(req.user)
        res.render("updateProducts", {
            pageTitle: "Products",
            products: products,
            path: '/products/list'
        });
    
    
}

//removing a product from the list of products
productController.deleteById = async (req, res) => {
    try {
        const product = await Product.find({ "_id": mongoose.Types.ObjectId(req.params.id) })
        product[0].delete()
        res.json({
            success: true,
        });
    }
    catch (err) {
        res.send(err)
    }
}

//controller for route of add form 
productController.addpath = (req, res) => {
    try {
        res.render("addProducts", {
            pageTitle: "Add Product",
            path: "/products/addpath"
        });
    }
    catch (err) {
        res.send(err)
    }
}

//add new product to the list
productController.add = async (req, res) => {
    try {
        product = await Product.create({
            productName: req.body.productName,
            quantity: req.body.quantity,
            price: req.body.price,
            image: req.body.image,
            UserId: req.user._id
        })
        //res.json(product)
        res.redirect('/products')
    }
    catch (err) {
        res.send(err)
    }
}

//controller for route of update form 
productController.updatePath = async (req, res, next) => {
    try {
        let id = mongoose.Types.ObjectId(req.params.id)
        const product = await Product.findById(id)
        res.render('updateSingle', {
            product: product,
            pageTitle: "Edit Product",
            path: '/products/updatePath'
        })
    }
    catch (err) {
        res.send(err)
    }
};

//controller for route of update form 
productController.update = async (req, res) => {
    try {
        const product = await Product.find({ "_id": mongoose.Types.ObjectId(req.params.id) })
        await product[0].set({
            productName: req.body.productName,
            quantity: req.body.quantity,
            price: req.body.price,
            image: req.body.image,
        })
        await product[0].save()
        res.json({
            success: true,
            product: product
        });
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = productController
