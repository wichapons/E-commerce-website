function checkIsAuthenticated(req,res,next){
    const userID = req.session.userID //get uid in the cookie 
    if(!userID){
        console.log('user id not found! Cannot login');
        return next();
    }
    console.log('user authenticated!');
    res.locals.userID = userID;
    res.locals.isAuth = true;
    res.locals.isAdmin = req.session.isAdmin;
    next();
}

module.exports = checkIsAuthenticated;