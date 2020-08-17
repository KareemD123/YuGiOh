const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cards = require("../models/card");

const myCollection = new Schema({
  cards: [Cards],
});

//Type vs Race

module.exports = mongoose.model("MyCollection", myCollection);
