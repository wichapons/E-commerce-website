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

//checkIsAuth middleware
const checkIsAuth = require('./middlewares/checkIsAuth');

//Cart items middleware
const cartMiddleware = require('./middlewares/cart');

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
//check is authenticated
app.use(checkIsAuth);

//route
app.use('cart',cartRoutes);
app.use(authRoutes); // add middleware for incoming request
app.use(productRoutes);
app.use(homeRoutes);
app.use(errorRoutes);
app.use(authorizedRoute); //add middleware for checking isAdmin before rendering admin page.
app.use('/admin',adminRoutes); // will only be executed for requests that start with the /admin path.


//error handle
app.use(errorHandleMiddleware);

db.connectDb().then(()=>{
    app.listen(3000);
    console.log('server is now running on http://localhost:3000/'); 
}).catch((err)=>{   //if error show log below
    console.log('cannot connect to the database');
    console.log(err);
})

