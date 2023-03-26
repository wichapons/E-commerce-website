const User = require('../models/user-model');
const authUtility = require('../utility/authentication');
const inputValidation = require('../utility/input-validation');
const sessionFlash = require('../utility/session-flash')

async function UserSignup(req,res){  //for fetching data of sign up button

    let sessionData = await sessionFlash.getSessionData(req);
    if(!sessionData){
        sessionData = { email:'', confirmEmail:'', password:'', fullname:'', address:'', street:'', postal:'', city:'' };
    };
    console.log(sessionData);
    res.render('customer/authentication/signup',{inputData: sessionData});
}


async function signup(req,res,next){ 
    const {email,confirmEmail, password, fullname, address, street, postal, city } = req.body;  //get email password and so on from req.body
    const inputData = {email:email,confirmEmail:confirmEmail, password:password, fullname:fullname, address:address, street:street, postal:postal, city:city}
    
    const user = new User(email,password,fullname,address,street,postal,city);
        //create flash session for alert message
    if (!inputValidation.isInputValid(email,password, fullname, address, street, postal, city)){
        sessionFlash.flashDataToSession(req,{
        errorMsg: 'Input is invalid',
        ...inputData
        },()=>{
            console.log('session saved');
            res.redirect('/signup')
        });
        return;
    }

    if(!inputValidation.isSameConfirmEmail(email,confirmEmail)){
        sessionFlash.flashDataToSession(req,{
        errorMsg: 'Email or confirm email does not match',
        ...inputData
        },()=>{
            console.log('session saved');
            res.redirect('/signup')
        });
        return;
    }
    
    let getMatchedEmailDB = await user.getUserDataByEmail();
    let existEmail = getMatchedEmailDB.email
    try{
        if(existEmail=== email){
            sessionFlash.flashDataToSession(req,{
            errorMsg: 'This email already existed in our server',
            ...inputData
            },()=>{
            console.log('session saved');
            res.redirect('/signup')
            });
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
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData){
        let { email, password } = '';
        sessionData = {email, password };
    }

    res.render('customer/authentication/login',{inputData:sessionData});
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
        //create flash session for alert message
        sessionFlash.flashDataToSession(req,{
        errorMsg: 'Password or username is invalid',
        email:email, 
        password:password 
    },()=>{
        console.log('Password or username is invalid');
        return res.redirect('/login');
    });
        
    }
    const IsPasswordCorrect = await user.verifyPassword(existingUser.password);
    console.log('IsPasswordCorrect=='+IsPasswordCorrect);
    if (!IsPasswordCorrect){
        //create flash session for alert message
        sessionFlash.flashDataToSession(req,{
            errorMsg: 'Password or username is invalid',
            email:email, 
            password:password 
        },()=>{
            console.log('Password or username is invalid');
            return res.redirect('/login');
        });
    }
    
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