const express = require('express');  //make express available in this file
const productController = require('../controllers/products-controller');

const router = express.Router();

router.get('/products',productController.getAllProducts);
module.exports = router;