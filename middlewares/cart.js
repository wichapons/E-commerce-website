const Cart = require('../models/cart-model')

//initialized the cart and save in session
function initializeCart(req,res,next){
    let cart;
    if(!req.session.cart){
        cart = new Cart();
    }else{
        //get the session data in cartSession
        const cartSession = req.session.cart;
        cart = new Cart(cartSession.items,
            cartSession.totalQuantity,
            cartSession.totalPrice)
    }
    //save to locals scope will only available for the duration of the current request, and is deleted once the response has been sent.
    res.locals.cart = cart;
    next();
}

module.exports =initializeCart;