const Cards = require("../models/cards");
const request = require("request");

module.exports = {
  requestApi,
};

function requestApi() {
  request("https://db.ygoprodeck.com/api/v7/cardinfo.php", function (
    err,
    res,
    body
  ) {
    // console.log(JSON.parse(res));
    let res2 = JSON.parse(res.body);
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
    res.render("index", Cards);
    // console.log(res2.data);
  });
}
