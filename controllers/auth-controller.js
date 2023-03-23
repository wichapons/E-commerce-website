
function UserSignup(req,res){  //for fetching data of sign up button
    res.render('customer/authentication/signup');
}

function signup(req,res){
}

function UserLogin(req,res){ 

}




module.exports= {
    UserSignup:UserSignup,
    UserLogin:UserLogin,
    signup:signup
};