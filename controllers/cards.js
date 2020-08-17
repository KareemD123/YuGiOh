const Cards = require("../models/cards");
const request = require("request");

module.exports = {
  requestApi,
};

function requestApi(req, res, next) {
  request("https://db.ygoprodeck.com/api/v7/cardinfo.php", function (
    err,
    req,
    body
  ) {
    // console.log(req);
    // console.log(body);
    // console.log(res);
    // console.log(JSON.parse(req));
    let req2 = JSON.parse(req.body);
    let req3 = req2.data;
    // req3.forEach(function (name) {
    //   console.log(name.name);
    // });

    req3.forEach(function (name) {
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
    // console.log(req2.data);
    console.log("hello");
  });
}
