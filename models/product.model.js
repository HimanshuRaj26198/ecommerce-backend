const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  sku: Number,
  name: String,
  type: String,
  price: Number,
  upc: String,
  category: Array,
  shipping: Number,
  description: String,
  manufacturer: String,
  model: String,
  url: String,
  image: String,
});

module.exports = mongoose.model("products", productSchema);
