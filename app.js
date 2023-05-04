const path = require('path')
const express = require('express');

const app = express();

//routes
const authRoutes = require('./routes/auth-route');
const productRoutes = require('./routes/product-route');
const homeRoutes = require('./routes/home-route');
const adminRoutes = require('./routes/admin-routes');
const errorRoutes = require('./routes/error-route');
const cartRoutes = require('./routes/cart-routes');
const orderRoutes = require('./routes/order-route')

//cookies and session
const expressSession = require('express-session');
const createSessionConfig = require('./config/session');

//csrf protection middleware
const csrf = require('csurf');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');

//urlencoded middleware
app.use(express.urlencoded({extended:false})); // sets up middleware in an Express application to handle URL-encoded form data.

//json middleware: parses incoming request bodies with JSON payloads.
app.use(express.json());

//error handle middleware
const errorHandleMiddleware = require('./middlewares/error-handle');
const pageNotFound = require('./middlewares/page-not-found');

//checkIsAuth middleware
const checkIsAuth = require('./middlewares/checkIsAuth');

//Cart items middleware
const cartMiddleware = require('./middlewares/cart');

//Update Cart Prices Middleware
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');

//authorizedRoute for checking whether is admin or not
const authorizedRoute = require('./middlewares/authorized-route');

//db
const db = require('./database/database');

//view engine for public folder
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//static folder config
app.use(express.static('public')); // makes its content available to the client side of the application through HTTP requests.
app.use('/products',express.static('product-data')); //only request starting with /products will gain access to productdata but need to know the correct filename in order to view it


//cookies and session
app.use(expressSession(createSessionConfig()));

//csrf protection
app.use(csrf()); // put CSRF protection middleware before any routes that handle user input or requests
app.use(addCsrfTokenMiddleware);

// add item to cart functionality
app.use(cartMiddleware);
// update cart price
app.use(updateCartPricesMiddleware);
//check is authenticated
app.use(checkIsAuth);

//route
app.use('/cart',cartRoutes);
app.use( authRoutes); // add middleware for incoming request
app.use(productRoutes);
app.use(homeRoutes);
app.use(errorRoutes);
app.use('/admin',authorizedRoute,adminRoutes); //add middleware for checking authorization before rendering route below. // will only be executed for requests that start with the /admin path.
app.use('/orders',authorizedRoute,orderRoutes);

app.use(pageNotFound);


//error handle
app.use(errorHandleMiddleware);

require('dotenv').config();
let port;
if(process.env.SERVER_STATUS === 'prod'){
    if(process.env.PORT){
        port = process.env.PORT;
    }else{
        console.log('cannot find PORT in .env, please check the configuration.');
        port = 3000;
    }
}else{
    port = 3000;
}

db.connectDb().then(()=>{
    app.listen(port);
    console.log(`server is now running on PORT ${port}`); 
}).catch((err)=>{   //if error show log below
    console.log('cannot connect to the database');
    console.log(err);
})

