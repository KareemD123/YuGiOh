const Cards = require("../models/cards");
const request = require("request");

module.exports = {
  requestApi,
};

function requestApi() {
  request("https://db.ygoprodeck.com/api/v7/cardinfo.php", function (
    err,
    response,
    body
  ) {
    // console.log(JSON.parse(response));
    let res2 = JSON.parse(response.body);
    let res3 = res2.data;
    res3.forEach(function (name) {
      console.log(name.name);
    });
    // console.log(res2.data);
  });
}
