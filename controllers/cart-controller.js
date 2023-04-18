const Product = require('../models/products-model')

async function addCartItem(req,res){
    let product;
    try{
    product = await Product.findUserID(req.body.productId)
    }catch(err){
        next(err);
        return;
    }
    
    const cart = res.locals.cart;
    cart.addItem(product);
    req.session.cart = cart;

    res.status = 201;
    res.json({
        message:'Cart updated!',
        totalItem: cart.totalQuantity
    })
}

module.exports={
    addCartItem:addCartItem
}