function getSessionData(req){
    const sessionData = req.session.flashedData;
    console.log('session deleted');
    req.session.flashedData=null;
    return sessionData;
}

async function flashDataToSession(req,data,action){
    req.session.flashedData = data;
    req.session.save(action);
}

module.exports = {
    getSessionData:getSessionData,
    flashDataToSession:flashDataToSession
}