const Cards = require("../models/cards");

module.exports = {
  fetchApi,
};

function fetchApi() {
  fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark Magician")
    .then((response) => response.json())
    .then((cards) => console.log(cards));
  res.render("index");
}
