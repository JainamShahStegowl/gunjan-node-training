const productController = {}
const Product = require('../model/productModel');
const Cart = require('../model/cartModel');

//view all the products
productController.list = async (req, res) => {
    const products = await req.user.getProducts();
    res.render("listProducts", {
        pageTitle: "Products",
        products: products,
        path: '/products'
    });
}

//update or delete a product
productController.updOrDel = async (req, res) => {
    const products = await req.user.getProducts();
    res.render("updateProducts", {
        pageTitle: "Products",
        products: products,
        path: '/products/list'
    });
}

//fetch single product
productController.fetchById = async (req, res) => {
    await Product.findByPk(req.params.id, (product) => {
        res.json(product)
    })
}

//removing a product from the list of products
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

//controller for route of add form 
productController.addpath = (req, res) => {
    res.render("addProducts", {
        pageTitle: "Add Product",
        path: "/products/addpath"
    });
}

//add new product to the list
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

//controller for route of update form 
productController.updatePath = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const product = await Product.findByPk(id)
    res.render('updateSingle', {
        product: product,
        pageTitle: "Edit Product",
        path: '/products/updatePath'
    })

};

//controller for route of update form 
productController.update = async (req, res) => {
    const product = await Product.update({
        productName: req.body.productName,
        quantity: req.body.quantity,
        price: req.body.price,
        image: req.body.image
    },
        { where: { id: req.params.id } }
    )
    console.log(Product)
    res.json({
        success: true,
        product: product
    });
}


module.exports = productController
