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
        console.log('user not found in database');
        return res.redirect('/login');
    }
    const IsPasswordCorrect = await user.verifyPassword(existingUser.password);
    console.log('IsPasswordCorrect=='+IsPasswordCorrect);
    if (!IsPasswordCorrect){
        console.log('password is not correct, please try again');
        return res.redirect('/login');
    }
    console.log('Username and password is correct ');
    //after user is authorized create a session

    await authUtility.createUserSession(req,existingUser,()=>{
        console.log('session has been created');
        res.redirect('/');
    });
}

function logout(req,res){
    authUtility.deleteUserSession(req);
    res.redirect('/login')
}



module.exports= {
    UserSignup:UserSignup,
    UserLogin:UserLogin,
    signup:signup,
    login:login,
    logout:logout
};