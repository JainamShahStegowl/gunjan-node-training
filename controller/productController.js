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

productController.updOrDel = (req, res) => {
    Product.fetchAll((products) => {
        res.render("updateProducts", {
            pageTitle: "Products",
            products: products,
            path: '/products/list'
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
                res.json({
                    success: true,
                    products: product
                });
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

productController.updatePath = async (req, res, next) => {
    const productId = parseInt(req.params.id);
    Product.fetchById(productId, (product) => {
        res.render('updateSingle', {
            product: product[0],
            pageTitle: "Edit Product",
            path: '/products/updatePath'
        })
    });
};
productController.update = (req, res) => {
    console.log(parseInt(req.body.quantity))
    const product = new Product(req.body.productName, req.body.quantity, req.body.price, req.body.image);
    product.update(req.params.id);
    res.json({
        success: true,
        product: product
    });
}


module.exports = productController
