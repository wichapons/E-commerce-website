const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

async function connectDb(){
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017');
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