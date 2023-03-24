const User = require('../models/user-model')

function UserSignup(req,res){  //for fetching data of sign up button
    res.render('customer/authentication/signup');
}

async function signup(req,res){ 
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const address = req.body.address;
    const street = req.body.street;
    const postal = req.body.postal;
    const city = req.body.city;

    const user = new User(email,password,fullname,address,street,postal,city);
    await user.signup().catch((err)=>{
        console.log(err);
    });
    res.redirect('/login');
}


function UserLogin(req,res){ 
    res.render('customer/authentication/login')
}




module.exports= {
    UserSignup:UserSignup,
    UserLogin:UserLogin,
    signup:signup
};