const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const card = require("./card");

const mySeparateCollection = new Schema({
  name: String,
  id: String,
  level: Number,
  atk: Number,
  def: Number,
  Type: String,
  image: String,
});

module.exports = mongoose.model("mySeparateCollection", mySeparateCollection);
