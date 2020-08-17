const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myCollection = new Schema({
  cards: [cards],
});

//Type vs Race

module.exports = mongoose.model("MyCollection", myCollection);
