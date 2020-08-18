const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cards = require("../models/card");

const myCollection = new Schema({
  cards: String,
});

//Type vs Race

module.exports = mongoose.model("MyCollection", myCollection);
