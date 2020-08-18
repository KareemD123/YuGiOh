const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cards = require("../models/card");

const myCollection = new Schema({
  mycollection: String,
});

//Type vs Race

module.exports = mongoose.model("MyCollection", myCollection);
