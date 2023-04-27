const e = require('express');
const Order = require('../models/orders-model');
const User = require('../models/user-model');

async function getOrderPage(req,res,next){
    try {
        const orders = await Order.findAllOrderForUser(res.locals.userID);
        console.log('order details: ');
        Object.entries(orders);
        res.render('customer/orders/all-orders', {orders: orders});
      } catch (error) {
        next(error);
      }
}

async function addOrder(req,res,next){
    const cart = res.locals.cart; 
    let userDetails;
    try{
        userDetails = await User.findUserById(res.locals.userID); // get cart item data from res.locals
        console.log('userDetails = '+Object.entries(userDetails));
    }catch(error){
        console.log(error);
        next(error);
        return;
    }
    const order = new Order(cart,userDetails); // create new order 
    try{
        await order.save(); //save to DB
    }catch(error){
        console.log(error);
        next(error);
        return;
    }

    req.session.cart = null; //clear items on the cart

    res.redirect('/orders'); //after save completed redirect to /orders
    
}

module.exports = {
    addOrder:addOrder,
    getOrderPage:getOrderPage
}