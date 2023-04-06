const express = require('express');  //make express available in this fil
const adminController = require('../controllers/admin-controller');
const router = express.Router();

router.get('/products',adminController.getAllProducts);
router.get('/products/add',adminController.createNewProduct);

module.exports = router;