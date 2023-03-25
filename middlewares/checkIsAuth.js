function checkIsAuthenticated(req,res,next){
    const uid = req.session.uid //get uid in the cookie 
    if(!uid){
        return next();
    }
    res.locals.uid = uid;
    res.locals.isAuth = true;
    next();
}

module.exports = checkIsAuthenticated;