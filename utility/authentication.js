function createUserSession(req,user,action){
    req.session.userID = user._id.toString();  //_id from modgodb 
    req.session.save(action);
}

module.exports={
    createUserSession:createUserSession
}