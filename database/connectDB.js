const mongoose = require("mongoose");
require("dotenv").config();
mongo_url = process.env.MONGO_URL;
database_name = process.env.DATABASE;

mongoose
  .connect(mongo_url, {
    dbName: database_name,
  })
  .then(() => {
    console.log("databse connected");
  })
  .catch((err) => {
    console.log("erro in connecting to databse");
  });
