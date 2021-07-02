const productController = {}
const Product = require('../model/productModel');

productController.list = (req, res) => {
    Product.fetchAll((products) => {
        res.json(products)
        console.log('in contoller' + products)
    });
    //Product.fetchAll() 
}

productController.fetchById = (req, res) => {
    Product.fetchById(req.params.id, (product) => {
        res.json(product)
    })
}

productController.deleteById = (req, res) => {
    Product.deleteById(req.params.id, (product) => {
        res.json(product)
    })
}

productController.add=(req,res)=>{
    const product=new Product(req.body.productName,req.body.quantity,req.body.price,req.body.image);
    product.store();
    res.json(product)
}

productController.update=(req,res)=>{
    const product=new Product(req.body.productName,req.body.quantity,req.body.price,req.body.image);
    product.update(req.params.id);
    res.json(product)
}
//productController.list()
module.exports = productController
