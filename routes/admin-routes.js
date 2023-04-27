const express = require('express');  //make express available in this file
const adminController = require('../controllers/admin-controller');
const imageUploadMiddleware = require('../middlewares/file-upload')

const router = express.Router();
// products
router.get('/products',adminController.getAllProducts); //show product on admin page
router.get('/products/add',adminController.getNewProduct); // show add product page
router.post('/addproducts',imageUploadMiddleware,adminController.createNewProduct); //add new product
router.get('/products/:id',adminController.getUpdateProduct); // show product details
router.post('/products/:id',imageUploadMiddleware,adminController.updateProduct); // update product details
router.delete('/products/:id',adminController.deleteProduct) //delete product
// orders
router.get('/orders', adminController.getOrders);
router.patch('/orders/:id', adminController.updateOrder);

module.exports = router;