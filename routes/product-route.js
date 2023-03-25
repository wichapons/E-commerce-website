const express = require('express');  //make express available in this fil

const router = express.Router();


router.get('/products',(req,res)=>{
    res.render('customer/products/all-products');
});

module.exports = router;