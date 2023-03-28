async function createUserSession(req,user,action){
    req.session.userID = user._id.toString();  //_id from modgodb 
    req.session.isAdmin = user.isAdmin;
    console.log('userID = '+req.session.userID);
    await req.session.save();
    action();
};

function deleteUserSession(req){
    req.session.userID = null;
}

module.exports={
    createUserSession:createUserSession,
    deleteUserSession:deleteUserSession
};



