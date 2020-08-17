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
    // res3.forEach(function (name) {
    //   console.log(name.name);
    // });

    res3.forEach(function (name) {
      Cards.create({
        name: name.name,
        id: name.id,
        atk: name.atk,
        def: name.def,
        Type: name.race,
        level: name.level,
      });
      // console.log(name.name);
    });
    res3.render("index", Cards);
    // console.log(res2.data);
  });
}
