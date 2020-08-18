const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cards = require("../models/card");

const myCollection = new Schema({
  name: String,
  id: String,
  level: Number,
  atk: Number,
  def: Number,
  Type: String,
  image: String,
});

//Type vs Race

module.exports = mongoose.model("MyCollection", myCollection);
