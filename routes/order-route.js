const express = require('express');  //make express available in this fil

const router = express.Router();

const orderController = require('../controllers/order-controller');

router.post('/',orderController.addOrder);

router.get('/',orderController.getOrderPage);

module.exports = router;