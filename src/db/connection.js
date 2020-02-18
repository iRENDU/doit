const MongoClient = require('mongodb').MongoClient;
const config = require('../config/config');
const url = `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}`

module.exports = {
    insertDocs: async function(dbName,collect,data) {
        const client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        const db = client.db(dbName);
        const collection = db.collection(collect);
        const result = await collection.insertMany(data);
        await client.close();
        return result;
    },
    getDocs: async function(dbName,collect) {
        const client = await MongoClient.connect(url,{ useUnifiedTopology: true })
        const db = client.db(dbName);
        const collection = db.collection(collect);
        const data = await collection.find({},{projection: {_id:0}}).toArray();
        await client.close();
        return data;
    }
}
