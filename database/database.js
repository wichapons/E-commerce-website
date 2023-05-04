require('dotenv').config();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;
let mongodbURL;

if(process.env.SERVER_STATUS === 'prod'){
    console.log('Detected Production Enviroment, using MONGODB_API_KEY');
    mongodbURL = process.env.MONGODB_API_KEY;
}else{
    console.log('Detected Dev Enviroment, using mongodb://127.0.0.1:27017');
    mongodbURL = 'mongodb://127.0.0.1:27017';
}

async function connectDb(){
    const client = await MongoClient.connect(mongodbURL);
    database = client.db('Topazio-Online-Shop');
}

function getDb(){
    if(!database){
        throw new Error('database not found');
    }
    return database;
};

module.exports = {
    connectDb:connectDb,
    getDb:getDb
}