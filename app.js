const path = require('path')
const express = require('express');
const authRoutes = require('./routes/auth-route')
const app = express();

//database
const db = require('./database/database')

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.static('public')); // makes its content available to the client side of the application through HTTP requests.

app.use(authRoutes); // add middleware for incoming request

db.connectDb().then(()=>{
    app.listen(3000);
    console.log('server is now running on http://localhost:3000/'); 
}).catch((err)=>{   //if error show log below
    console.log('cannot connect to the database');
    console.log(err);
})

