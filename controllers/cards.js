const Cards = require("../models/card");
const request = require("request");
// const Collection = require("../models/card");
// const UserLogin = require("../models/card");

module.exports = {
  requestApi,
  showAllCards,
};

function requestApi(req, res, next) {
  request(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&race=equip",
    function (err, req, body) {
      if (err) {
        return err;
      }
      let req2 = JSON.parse(req.body);
      let req3 = req2.data;
      req3.forEach(function (name) {
        let imageurl = name.card_images;
        let textimageurl = imageurl[0].image_url;
        // let newCard = new cardModel();
        Cards.create(
          {
            name: name.name,
            id: name.id,
            atk: name.atk,
            def: name.def,
            Type: name.race,
            level: name.level,
            image: name.card_images[0].image_url,
          },
          function (err) {
            res.render("home");
          }
        );

        // students,
        // user: req.user,
        // name: req.query.name,
        // sortKey,
      });
    }
  );
}

function showAllCards(req, res) {
  console.log("hello2");
  Cards.find({}, function (err, cards) {
    if (err) {
      return err;
    } else {
      // console.log(cards);
      res.render("cards/index.ejs", { cards });
    }
  });
}
