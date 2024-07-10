const { MongoClient, ObjectId } = require('mongodb');

const DATABASE_URL = "mongodb://127.0.0.1:27017";
const DATABASE_NAME = "node-lessons";
const COLLECTION_NAME = "test";

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
    const sampleData = [
      { name: "item", color: "red" },
      { name: "item2", color: "yellow" }
    ];
    const insertResult = await db.collection(COLLECTION_NAME).insertMany(sampleData);
    console.log(insertResult.insertedCount);

    const limitedResults = await db.collection(COLLECTION_NAME).find({ name: 'melo' }, { limit: 4 }).toArray();
    console.log(limitedResults);

    const allResults = await db.collection(COLLECTION_NAME).find({ name: 'melo' }).toArray();
    console.log(allResults.length);

    const resultsCount = await db.collection(COLLECTION_NAME).countDocuments({ name: 'melo' });
    console.log(resultsCount);

    const userResult = await db.collection(COLLECTION_NAME).findOne({ name: 'melike' });
    console.log(userResult);

    const idResult = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId('668bed6ecc5ea7e02c19ebeb') });
    console.log(idResult);

  } catch (error) {
    console.error("error:" + error);
  } finally {
    await client.close();
    console.log("connection closed");
  }
};

performDatabaseOperations();
