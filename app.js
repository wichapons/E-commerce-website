const path = require('path')
const express = require('express');
const authRoutes = require('./routes/auth-route')
const app = express();
const errorHandleMiddleware = require('./middlewares/error-handle')
const csrf = require('csurf');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token')
const db = require('./database/database')


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static('public')); // makes its content available to the client side of the application through HTTP requests.
app.use(express.urlencoded({extended:false})); // sets up middleware in an Express application to handle URL-encoded form data.

app.use(csrf()); // put CSRF protection middleware before any routes that handle user input or requests
app.use(addCsrfTokenMiddleware);


app.use(authRoutes); // add middleware for incoming request
app.use(errorHandleMiddleware);

db.connectDb().then(()=>{
    app.listen(3000);
    console.log('server is now running on http://localhost:3000/'); 
}).catch((err)=>{   //if error show log below
    console.log('cannot connect to the database');
    console.log(err);
})

