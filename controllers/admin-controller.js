function getAllProducts(req,res){
    console.log('get all has been called');
    res.render('admin/products/all-products');
}

function getNewProduct(req,res){
    res.render('admin/products/new-product')
}

function createNewProduct(req,res){
    


    res.redirect('/admin/products')
}

module.exports= {
    getNewProduct:getNewProduct,
    getAllProducts:getAllProducts,
    createNewProduct:createNewProduct
}