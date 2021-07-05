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

productController.updatePath = (req, res) => {
    const productId = parseInt(req.params.id);
    //console.log(productId)
    Product.fetchById(productId, (product) => {
        res.status(200).render('updateSingle', {
            product: product
        });
        console.log(product)
    });
};

productController.update = (req, res) => {
    const product = new Product(req.body.productName, req.body.quantity, req.body.price, req.body.image);
    product.update(req.params.id);
    res.json(product)
}


module.exports = productController
