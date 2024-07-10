const { MongoClient } = require('mongodb');

const DATABASE_URL = "mongodb://127.0.0.1:27017";
const DATABASE_NAME = "node-lessons";
const COLLECTION_NAME = "products";

const connectToDatabase = async () => {
  try {
    const client = await MongoClient.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected to database");
    return client;
  } catch (error) {
    console.error("could not connect to database: " + error);
    throw error;
  }
};

const performDatabaseOperations = async () => {
  const client = await connectToDatabase();
  const db = client.db(DATABASE_NAME);
  
  try {
    const updateProduct = await db.collection(COLLECTION_NAME).updateMany({name : 'item'}, {
        $set:{
            name: 'item1'
        }
    })
    console.log(updateProduct);


  } catch (error) {
    console.error("error:" + error);
  } finally {
    await client.close();
    console.log("connection closed");
  }
};

performDatabaseOperations();
