async function createUserSession(req,user,action){
    req.session.userID = user._id.toString();  //_id from modgodb 
    console.log('userID = '+req.session.userID);
    await req.session.save();
    action();
};

function deleteUserSession(){
    req.session.uid = null;
}

module.exports={
    createUserSession:createUserSession,
    deleteUserSession:deleteUserSession
};



