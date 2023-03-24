function addCsrfToken(req,res,next){
    res.locals.csrfToken = req.csrfToken(); //req.csrfToken() is a function provided by the csurf middleware that generates a random CSRF token on every request. The generated token is unique to the session and is used to protect against CSRF attacks.
    next();
}

module.exports = addCsrfToken;