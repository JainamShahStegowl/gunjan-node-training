const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.get('/', productController.list)
router.get('/addpath', productController.addpath)
router.get('/:id', productController.fetchById)
router.delete('/:id', productController.deleteById)
router.post('/', productController.add)
router.put('/:id', productController.update)
module.exports = router
