const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose.connect(
  "mongodb://veda002:veda1234@ac-ihrnmyj-shard-00-00.zafkxhw.mongodb.net:27017,ac-ihrnmyj-shard-00-01.zafkxhw.mongodb.net:27017,ac-ihrnmyj-shard-00-02.zafkxhw.mongodb.net:27017/flipkart?ssl=true&replicaSet=atlas-rxvcym-shard-0&authSource=admin&retryWrites=true&w=majority",
  (err) => {
    if (!err) {
      console.log("Connection to database success");
    } else {
      console.log("Error in connecting database");
    }
  }
);
