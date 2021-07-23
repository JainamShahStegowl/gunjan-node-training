const express = require('express');
const router1 = express.Router();
const cartController = require('../controller/cartController');

//fetch all the products
router1.get('/',auth.authorization, cartController.fetchAllToAdd)
//Add product form 
router1.get('/addpath/:id',auth.authorization, cartController.addpath)
//add to cart
router1.post('/:id', cartController.addToCart)
//view cart
router1.get('/inCart', cartController.viewInCart)
//delete from cart
router1.delete('/:id', cartController.deleteById)

module.exports = router1