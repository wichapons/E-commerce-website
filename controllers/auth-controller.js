const User = require('../models/user-model')
const authUtility = require('../utility/authentication');
const inputValidation = require('../utility/input-validation') 

function UserSignup(req,res){  //for fetching data of sign up button
    res.render('customer/authentication/signup');
}

async function signup(req,res,next){ 
    const { email,confirmEmail, password, fullname, address, street, postal, city } = req.body;  //get email password and so on from req.body
    const user = new User(email,password,fullname,address,street,postal,city);

    if (!inputValidation.isInputValid(email, password, fullname, address, street, postal, city)){
        console.log('Input is invalid');
        res.redirect('/signup')
        return;
    }

    if(!inputValidation.isSameConfirmEmail(email,confirmEmail)){
        console.log('Email or confirm email does not match');
        res.redirect('/signup')
        return;
    }
    
    let getMatchedEmailDB = await user.getUserDataByEmail();
    let existEmail = getMatchedEmailDB.email
    try{

        if(existEmail=== email){
            console.log('This email already existed in our server');
            res.redirect('/signup')
            return;
        }
        await user.signup();
    } catch(err){
        console.log('cannot execute user.signup() Error:' +err);
        return;
    };
    res.redirect('/login');
}

function UserLogin(req,res){ 
    res.render('customer/authentication/login')
}

async function login(req,res){
    const {email,password} = req.body;
    const user = new User(email,password);
    let existingUser;
    try{
        existingUser = await user.getUserDataByEmail();
    }catch(err){
        console.log('cannot get the data of existingUser. Error:' + err);
    }

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