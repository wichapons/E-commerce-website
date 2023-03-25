const path = require('path')
const express = require('express');

const app = express();

//routes
const authRoutes = require('./routes/auth-route');
const productRoutes = require('./routes/product-route');
const homeRoutes = require('./routes/home-route');

//cookies and session
const expressSession = require('express-session');
const createSessionConfig = require('./config/session');

//csrf protection middleware
const csrf = require('csurf');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');

//error handle middleware
const errorHandleMiddleware = require('./middlewares/error-handle');

//checkIsAuth middleware
const checkIsAuth = require('./middlewares/checkIsAuth')

//db
const db = require('./database/database');

//view engine for public folder
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//apply express
app.use(express.static('public')); // makes its content available to the client side of the application through HTTP requests.
app.use(express.urlencoded({extended:false})); // sets up middleware in an Express application to handle URL-encoded form data.

//cookies and session
//const sessionConfig = createSessionConfig();
app.use(expressSession(createSessionConfig()));

//csrf protection
app.use(csrf()); // put CSRF protection middleware before any routes that handle user input or requests
app.use(addCsrfTokenMiddleware);

//route
app.use(authRoutes); // add middleware for incoming request
app.use(productRoutes);
app.use(homeRoutes);

//error handle
app.use(errorHandleMiddleware);
//check is authenticated
app.use(checkIsAuth);


db.connectDb().then(()=>{
    app.listen(3000);
    console.log('server is now running on http://localhost:3000/'); 
}).catch((err)=>{   //if error show log below
    console.log('cannot connect to the database');
    console.log(err);
})

