const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myCollection = new Schema({
  cards: [card],
});

//Type vs Race

module.exports = mongoose.model("MyCollection", myCollection);
