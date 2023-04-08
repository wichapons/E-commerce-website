const express = require('express');  //make express available in this file
const adminController = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/file-upload')

const router = express.Router();

router.get('/products',adminController.getAllProducts);
router.get('/products/add',adminController.getNewProduct);
router.post('/addproducts',imageUploadMiddleware,adminController.createNewProduct);

module.exports = router;