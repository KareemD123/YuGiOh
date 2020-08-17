const Cards = require("../models/cards");

module.exports = {};

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((users) => console.log(users));
