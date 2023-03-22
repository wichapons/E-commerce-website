const path = require('path')
const express = require('express');
const authRoutes = require('./routes/auth-route')
const app = express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static('public')); // makes its content available to the client side of the application through HTTP requests.

app.use(authRoutes); // add middleware for incoming request

app.listen(3000);