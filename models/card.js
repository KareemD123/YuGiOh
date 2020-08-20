const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const request = require("request");
const { json } = require("express");

const cardSchema = new Schema({
  name: String,
  id: String,
  level: Number,
  atk: Number,
  def: Number,
  Type: String,
  image: String,
});

const myCollection = new Schema({
  id: { type: Number, default: 0 },
  name: String,
  cards: [cardSchema],
});

const userLogin = new Schema({
  username: String,
  email: String,
  googleId: String,
  collectionId: { type: Schema.Types.ObjectId, ref: "myCollection" },
  cardcollection: [myCollection],
});

module.exports = mongoose.model("Collection", myCollection);
