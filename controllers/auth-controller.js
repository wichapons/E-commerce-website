//for fetching data of sign up button
function UserSignup(req,res){ 
    res.render('customer/authentication/signup');
}

function UserLogin(req,res){ 

}




module.exports= {
    UserSignup:UserSignup,
    UserLogin:UserLogin
};