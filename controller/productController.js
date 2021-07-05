const productController = {}
const Product = require('../model/productModel');

productController.list = (req, res) => {
    Product.fetchAll((products) => {
        res.render("listProducts", {
            pageTitle: "Products",
            products: products,
            path: '/products'
        });
    });
}

productController.fetchById = (req, res) => {
    Product.fetchById(req.params.id, (product) => {
        res.json(product)
    })
}

productController.deleteById = (req, res) => {
    Product.deleteFromCart(req.params.id, (product) => {
        if (product.success == true) {
            Product.deleteById(req.params.id, (product) => {
                res.json(product)
            })
        }
    })
}

productController.addpath = (req, res) => {
    res.render("addProducts", {
        pageTitle: "Add Product",
        path: "/products/addpath"
    });
}

productController.add = (req, res) => {
    const product = new Product(req.body.productName, req.body.quantity, req.body.price, req.body.image);
    product.store();
    //res.json(product)
    res.redirect('/products')
}

productController.update = (req, res) => {
    const product = new Product(req.body.productName, req.body.quantity, req.body.price, req.body.image);
    product.update(req.params.id);
    res.json(product)
}

module.exports = productController
