const productController = {}
const Product = require('../model/productModel');
const Cart = require('../model/cartModel');

productController.list = async (req, res) => {
    const products = await req.user.getProducts();
    res.render("listProducts", {
        pageTitle: "Products",
        products: products,
        path: '/products'
    });
}



productController.updOrDel = async (req, res) => {
    const products = await req.user.getProducts();
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
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
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
    product = await req.user.createProduct({
        productName: req.body.productName,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image
    })
    //res.json(product)
    res.redirect('/products')
}

productController.updatePath = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const product = await Product.findByPk(id)
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
            id: req.params.id,
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
