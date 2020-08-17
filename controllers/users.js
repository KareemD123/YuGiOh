const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userLogin = new Schema({
  username: String,
  password: String,
  googleId: String,
});

module.exports = mongoose.model("UserLogin", userLogin);
