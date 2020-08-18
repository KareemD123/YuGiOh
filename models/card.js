const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cards = new Schema({
  name: String,
  id: String,
  level: Number,
  atk: Number,
  def: Number,
  Type: String,
  image: String,
});

const myCollection = new Schema({
  name: String,
  // id: String,
  // level: Number,
  // atk: Number,
  // def: Number,
  // Type: String,
  // image: String,
  cards: [cards],
});

const userLogin = new Schema({
  username: String,
  email: String,
  googleId: String,
  collectionId: { type: Schema.Types.ObjectId, ref: "myCollection" },
  cardcollection: [myCollection],
});

//Type vs Race

module.exports = mongoose.model("card", cards);

module.exports = mongoose.model("MyCollection", myCollection);
module.exports = mongoose.model("UserLogin", userLogin);
