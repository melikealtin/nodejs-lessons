// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectId

const { MongoClient ,ObjectId } = require('mongodb')

const databaseURL = "mongodb://127.0.0.1:27017";
const databaseName = "node-lessons";

const connectToMongoDB = async () => {
  console.log("attempting to connect to MongoDB...");

  try {
    const client = await MongoClient.connect(databaseURL , { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("connected to db");
    const db = client.db(databaseName);

    const myID = new ObjectId()
    console.log(myID);
    console.log(myID.getTimestamp());

      const insertResult = await db.collection("products").insertOne(
      {
        _id: myID,
        name: "item3",
        color: "blue",
      }
    );


    console.log("attempting to insert data into the test collection...");

    // const insertResult = await db.collection("products").insertMany([
    //   {
    //     name: "item",
    //     color: "red",
    //   },
    //   {
    //     name: "item2",
    //     color: "yellow",
    //   },
    // ]);

    console.log("data added successfully: ", insertResult.insertedCount);

    console.log("attempting to query the test collection...");

    const queryResult = await db.collection("products").findOne({ name: "item3" });
    console.log("document found: ", queryResult);

    await client.close();
    console.log("connection closed");
  } catch (error) {
    console.error("could not connect to db: " + error);
  }
};

connectToMongoDB();
