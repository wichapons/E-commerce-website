const Product = require('../models/products-model')

async function renderCartPage(req,res){
    res.render('customer/cart/cart');
}


async function addCartItem(req,res,next){
    let product;
    try{
    product = await Product.findUserID(req.body.productID) //get product data from database
    }catch(err){
        next(err);
        return;
    }
    
    const cart = res.locals.cart; //save the local scope from the cart middleware to cart variable 
    cart.addItem(product); // cart is already get called by cart = new Cart so this will call a method addItem in cart model
    req.session.cart = cart; // save cart item to session
    
    res.status = 201; //return sucess
    res.json({
        message:'Cart updated!',
        totalItem: cart.totalQuantity
    })
}

async function updateCartItem(req,res,next){
    const cart = res.locals.cart;
    try{
        const updatedItemData = await cart.updateItem(req.body.productID,parseInt(req.body.quantity)); //return of this funciton will get updatedItemPrice from cart model
        req.session.cart = cart;
        res.json({
            message:'Item updated',
            updateCartData:{
                newTotalQuantity:cart.totalQuantity,
                newtotalPrice:cart.totalPrice,
                updatedItemPrice:updatedItemData.updatedItemPrice
        }
    })
    }catch(err){
        console.log(err);
        next(err);
        return;
    }
}

    


module.exports={
    addCartItem:addCartItem,
    renderCartPage:renderCartPage,
    updateCartItem:updateCartItem
}