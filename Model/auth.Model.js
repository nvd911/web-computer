var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var authSchema = new Schema({
  userName: String,
  password: String,
});

module.exports = mongoose.model("auth", authSchema);
