const Product = require('../models/products-model');
const { get } = require('../routes/error-route');

async function getAllProducts(req,res){
    try{
        const products = await Product.findAll();
        res.render('customer/products/all-products',{products:products});
    }catch(err){
        next(err)
    }

}

module.exports = {
    getAllProducts:getAllProducts
}