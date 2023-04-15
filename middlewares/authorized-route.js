function authorizedRoute(req,res,next){
    if(!res.locals.isAuth){
        res.redirect('/401')
        return;
    }
    if(req.path.startsWith('/admin') && !res.locals.isAdmin ){
        return res.redirect('/403');
    }
    
    next();
}
module.exports = authorizedRoute;