const express = require('express');
const router1 = express.Router();
const cartController = require('../controller/cartController');

router1.get('/', cartController.fetchAllToAdd)
router1.get('/addpath/:id', cartController.addpath)
router1.post('/:id', cartController.addToCart)
router1.get('/inCart', cartController.viewInCart)
router1.delete('/:id', cartController.deleteById)
module.exports = router1