const express = require('express');  //make express available in this fil

const router = express.Router();

const cartController = require('../controllers/cart-controller')

router.get('/',cartController.renderCartPage);
router.post('/items',cartController.addCartItem);

module.exports = router;