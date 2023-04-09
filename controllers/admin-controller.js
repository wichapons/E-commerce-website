const Product = require('../models/products-model')

function getAllProducts(req,res){
    console.log('get all has been called');
    res.render('admin/products/all-products');
}

function getNewProduct(req,res){
    res.render('admin/products/new-product')
}

async function createNewProduct(req,res){
    console.log(req.body);

    const product = new Product({
        ...req.body, //get only the text field in the form (file type is excluded)
        productImageName: req.file.filename
    });
    
    try{
        await product.save();
    } catch(err){
        console.log(`cannot save the product data to the database err:${err}`);
        next(err);
        return;
    }
    res.redirect('/admin/products')
}

module.exports= {
    getNewProduct:getNewProduct,
    getAllProducts:getAllProducts,
    createNewProduct:createNewProduct
}