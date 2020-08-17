const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userLogin = new Schema({
  username: String,
  password: String,
  googleId: String,
  collectionId: { type: Schema.Types.ObjectId, ref: "myCollection" },
});

module.exports = mongoose.model("UserLogin", userLogin);
