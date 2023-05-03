const Product = require('../models/products-model');

async function getAllProducts(req,res){
    try{
        const products = await Product.findAll();
        res.render('customer/products/all-products',{products:products});
    }catch(err){
        next(err)
    }
}

async function getProductDetails(req,res,next){
    try{
        const product = await Product.findUserID(req.params.id);
        res.render('customer/products/product-detail',{product:product});
    }catch(err){
        next(err);
    }
    
}

module.exports = {
    getAllProducts:getAllProducts,
    getProductDetails:getProductDetails
}