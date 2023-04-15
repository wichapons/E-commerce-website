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

async function getUpdateProduct(req,res,next){
    try{
        productDetails = await Product.findUserID(req.params.id);
        res.render('admin/products/edit-product',{productDetails:productDetails});
    }catch(err){
        err.code = 404,
        console.log('cannot get the product detail. Error msg: '+err);
        next(err);
    }
}

async function updateProduct(req,res,next){
    const product = new Product({
        ...req.body,
        _id:req.params.id
    })
    //check if user upload a new image
    
    if(req.file){
        product.updateImage(req.file.filename);
    };
    console.log('user does not upload a new image');
    try{
        await product.save();
    }catch(err){
        next(err);
        return;
    };
    res.redirect('/admin/products')
}

async function deleteProduct(req,res,next){
    let product;
    try{
        product = await Product.findUserID(req.params.id);
        await product.removeProduct(); //call remove product method on product model
    }catch(err){
        return next(err); //pass the err to next middleware handlers
    }
    res.json({message:'Product is deleted successfully!'});
}

module.exports= {
    getNewProduct:getNewProduct,
    getAllProducts:getAllProducts,
    createNewProduct:createNewProduct,
    getUpdateProduct:getUpdateProduct,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct
}