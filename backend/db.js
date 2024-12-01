const { MongoClient, Collection } = require('mongodb');
const dbName = 'my-data';
let db_1;
const connectDB = async () => {
    try {
        const client=new MongoClient('mongodb://localhost:27017')

        await client.connect();
        console.log('Connected !!! 🌍🌎🌏');
        db_1 = client.db(dbName);

    } catch (error) {
        console.log(error);
    }
};
const getDb = (collectionName) => {
    if (!db_1) {
        console.error("Database not connected !!! Call the connectDB first !!!");
        return;
    }
    console.log(db_1);
    return db_1.collection(collectionName);
};

module.exports = { connectDB, getDb };