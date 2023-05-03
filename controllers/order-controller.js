// import Model
const Order = require('../models/orders-model');
const User = require('../models/user-model');

//import .env variables
require('dotenv').config();
//import stripe payment 
const stripe = require('stripe')(process.env.stripeApiKey);

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

    //make a payment on stripe
    try{
        const session = await stripe.checkout.sessions.create({
            line_items: cart.items.map((item)=>{ //convert item cart into arrays with the format of stripe
                return  {
                    price_data: {
                        currency:'thb',
                        product_data:{
                            name:item.product.title,
                        },
                        unit_amount: parseFloat(item.product.price).toFixed(2)*100
                    },
                    quantity: item.quantity
                  }
            }),
            mode: 'payment',
            success_url: `http://localhost:3000/orders/success`,
            cancel_url: `http://localhost:3000/orders/failure`,
          });
          res.redirect(303, session.url);
          return;
    }catch(error){
        next(error);
        return;
    }
}

function getSuccessPage(req,res){
    res.render('customer/orders/success');
    req.session.cart = null; //clear items on the cart
}

function getFailurePage(req,res){
    res.render('customer/orders/failure');
}

module.exports = {
    addOrder:addOrder,
    getOrderPage:getOrderPage,
    getSuccessPage,
    getFailurePage
}