const Product = require('../models/products-model')

async function getAllProducts(req,res,next){
    try{
        const allProducts = await Product.findAll()
        console.log('at getAllProducts');
        console.log(Object.values(allProducts));
        res.render('admin/products/all-products',{products:allProducts});
    } catch(err){
        console.log(`cannot get product data from the database. Error Msg: ${err}`);
        next(err); //send to error handler middleware
        return;
    }

}
function getNewProduct(req,res){
    res.render('admin/products/new-product')
}

async function createNewProduct(req,res){
    console.log(req.body);
    const product = new Product({
        ...req.body, //get only the text field in the form (file type is excluded)
        imageName: req.file.filename
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