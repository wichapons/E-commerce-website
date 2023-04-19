const express = require('express');  //make express available in this fil

const router = express.Router();

const cartController = require('../controllers/cart-controller')

router.get('/',cartController.renderCartPage);
router.post('/items',cartController.addCartItem);
router.patch('/items',cartController.updateCartItem) //update item data 

module.exports = router;