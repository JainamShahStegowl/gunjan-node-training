const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
router.get('/', productController.list)
router.get('/:id', productController.fetchById)
router.delete('/:id', productController.deleteById)
router.post('/add',productController.add)
router.put('/:id',productController.update)
module.exports = router
