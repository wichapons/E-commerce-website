async function createUserSession(req,user,action){
    req.session.userID = user._id.toString();  //_id from modgodb 
    console.log('userID = '+req.session.userID);
    await req.session.save();
    action();
};

module.exports={
    createUserSession:createUserSession
};



