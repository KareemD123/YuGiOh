const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cards = new Schema({
  name: String,
  id: String,
  level: Number,
  atk: Number,
  def: Number,
  Type: String,
});

const myCollection = new Schema({
  cards: [cards],
});

//Type vs Race

module.exports = mongoose.model("Cards", cards);
module.exports = mongoose.model("MyCollection", myCollection);
