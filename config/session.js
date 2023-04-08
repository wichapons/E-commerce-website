const expressSession = require('express-session');
const mongoDbSessionStore = require('connect-mongodb-session');

function createSessionOnMongoDb(){
    const  MongoDbSessionStore = mongoDbSessionStore(expressSession);
    //save session in Topazio-Online-Shop database
    const storeSession = new MongoDbSessionStore({
        uri:'mongodb://127.0.0.1:27017',
        databaseName: 'Topazio-Online-Shop',
        collection:'sessions2'
    });

    return storeSession;
}

function createSessionConfig(){
    return{
        secret: 'A+65HBH',  //secret key used for signing and verifying session cookies.
        resave:false, //This is a boolean value that indicates whether the session data should be saved to the session store even if the session was not modified during the request. If resave is set to false, the session data will only be saved to the session store if it was modified during the request. This can help to reduce the load on the session store.
        saveUninitialized:false, //indicates whether a session should be created even if it is not modified during the request.
        store: createSessionOnMongoDb(),
        cookie:{
            maxAge: 60*100*1000// cookie expires in 100mins 
        }
    };
}

module.exports = createSessionConfig;