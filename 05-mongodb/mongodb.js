const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const databaseURL = "mongodb://127.0.0.1:27017";
const databaseName = "node-lessons";

const connectToMongoDB = async () => {
  console.log("attempting to connect to MongoDB...");

  try {
    const client = await MongoClient.connect(databaseURL);
    console.log("connected to db");
    const db = client.db(databaseName);

    console.log("attempting to insert data into the test collection...");

    //INSERT ONE
    // const insertResult = await db.collection("test").insertOne({
    //   name: "nunu",
    //   age: 27,
    // })

    // INSERT MANY

    const insertResult = await db.collection("test").insertMany([
      {
        name: "ummu",
        age: 50,
      },
      {
        name: "melo",
        age: 20,
      },
    ]);

    console.log("data added successfully: ", insertResult.insertedCount);

    console.log("attempting to query the test collection...");

    const queryResult = await db.collection("test").findOne({ name: "melo" });
    console.log("document found: ", queryResult);

    await client.close();
    console.log("connection closed");
  } catch (error) {
    console.error("could not connect to db: " + error);
  }
};

connectToMongoDB();
