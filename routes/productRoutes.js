const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

//view all the products
router.get('/', productController.list)
//add product form
router.get('/addpath', productController.addpath)
//list for updateing products
router.get('/list', productController.updOrDel)
//update product form
router.get('/updatePath/:id', productController.updatePath)
//fetch one product
router.get('/:id', productController.fetchById)
//delete a product
router.delete('/:id', productController.deleteById)
//add a product
router.post('/', productController.add)
//update product
router.put('/:id', productController.update)

module.exports = router
