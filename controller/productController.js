const productController = {}
const Product = require('../model/productModel');
const Cart = require('../model/cartModel');

productController.list = async (req, res) => {
    const products = await Product.findAll();
    res.render("listProducts", {
        pageTitle: "Products",
        products: products,
        path: '/products'
    });
}



productController.updOrDel = async (req, res) => {
    const products = await Product.findAll()
    res.render("updateProducts", {
        pageTitle: "Products",
        products: products,
        path: '/products/list'
    });
}

productController.fetchById = async (req, res) => {
    await Product.findByPk(req.params.id, (product) => {
        res.json(product)
    })
}

productController.deleteById = async (req, res) => {
    const success = await Cart.destroy({
        where: {
            productId: req.params.id
        }
    }, Product.destroy({
        where: {
            productId: req.params.id
        }
    }))


    res.json({
        success: true,
    });

}



productController.addpath = (req, res) => {
    res.render("addProducts", {
        pageTitle: "Add Product",
        path: "/products/addpath"
    });
}

productController.add = async (req, res) => {
    product = await Product.create({
        productName: req.body.productName,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image
    })
    //res.json(product)
    res.redirect('/products')
}

productController.updatePath = async (req, res, next) => {
    const productId = parseInt(req.params.id);
    const product = await Product.findByPk(productId, (product) => {
        res.json(product)
    })
    console.log(product)
    res.render('updateSingle', {
        product: product,
        pageTitle: "Edit Product",
        path: '/products/updatePath'
    })

};
productController.update = async (req, res) => {
    const product = await Product.update({
        productName: req.body.productName,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image
    }, {
        where: {
            productId: req.params.id,
        }
    }
    )
    console.log(Product)
    res.json({
        success: true,
        product: product
    });
}


module.exports = productController
