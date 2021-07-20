const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const auth=require('../auth')

//view all the products
router.get('/', auth.authorization, productController.list)
//add product form
router.get('/addpath', productController.addpath)
//list for updateing products
router.get('/list', productController.updOrDel)
//update product form
router.get('/updatePath/:id', productController.updatePath)
//delete a product
router.delete('/:id', productController.deleteById)
//add a product
router.post('/', productController.add)
//update product
router.put('/:id', productController.update)

module.exports = router
