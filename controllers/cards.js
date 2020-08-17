const Cards = require("../models/cards");

module.exports = {
  fetchApi,
};

function requestApi() {
  request(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?name=Dark Magician",
    function (err, response, body) {
      console.log(response.json);
      res.render("index", {});
    }
  );
}
