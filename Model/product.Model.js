var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  title: String,
  productCode: String,
  image: String,
  nameProduct: String,
  priceVitua: String,
  price: String,
});

module.exports = mongoose.model("header", productSchema);
