const mongoose = require("mongoose");
require("dotenv").config();

module.exports = mongoose.connect(process.env.DBURL, (err) => {
  if (!err) {
    console.log("Connection to database success");
  } else {
    console.log("Error in connecting database");
  }
});
