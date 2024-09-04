const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(`database connection error ${err}`));
