const User = require('../models/user-model')
const authUtility = require('../utility/authentication')

function UserSignup(req,res){  //for fetching data of sign up button
    res.render('customer/authentication/signup');
}

async function signup(req,res){ 
    const { email, password, fullname, address, street, postal, city } = req.body;  //get email password and so on from req.body
    const user = new User(email,password,fullname,address,street,postal,city);
    await user.signup().catch((err)=>{
        console.log(err);
    });
    res.redirect('/login');
}

function UserLogin(req,res){ 
    res.render('customer/authentication/login')
}

async function login(req,res){
    const {email,password} = req.body;
    const user = new User(email,password);
    const existingUser = await user.getUserDataByEmail();
    if(!existingUser){
        alert('user not found')
        return res.redirect('/login')
    }
    const IsPasswordCorrect = user.verifyPassword(existingUser.password);
    if (!IsPasswordCorrect){
        alert('password is not correct, please try again')
        return res.redirect('/login')
    }
    //after user is authorized create a session
    authUtility.createUserSession(req,existingUser,()=>{
        res.redirect('/')
    });
}



module.exports= {
    UserSignup:UserSignup,
    UserLogin:UserLogin,
    signup:signup
};