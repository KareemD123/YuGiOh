const Cards = require("../models/card");
const request = require("request");
const Collection = require("../models/card");
const UserLogin = require("../models/card");

module.exports = {
  requestApi,
  showAllCards,
};

function requestApi(req, res, next) {
  request(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?level=4&attribute=water&sort=atk",
    function (err, req, body) {
      if (err) {
        return err;
      }
      let req2 = JSON.parse(req.body);
      let req3 = req2.data;
      // console.log(req3);
      // req3.forEach(function (name) {
      //   console.log(name.name);
      // });
      // Cards.find({}, function (err, cards) {
      //   console.log(req3);
      //   if (err) console.log(err);
      //   if (cards) {
      //     res.render("show", { cards });
      //   } else {
      req3.forEach(function (name) {
        // console.log(name.card_images);
        let imageurl = name.card_images;
        let textimageurl = imageurl[0].image_url;
        Cards.create({
          name: name.name,
          id: name.id,
          atk: name.atk,
          def: name.def,
          Type: name.race,
          level: name.level,
          image: name.card_images[0].image_url,
        });
        res.render("home.ejs", { title: "Hello!" });
      });
    }
  );
}

//         }
//       });
//     }
//   );
// }

// res.render("show", {cards});
// console.log(req2.data);
// console.log(name.name);

function showAllCards(req, res) {
  console.log("hello2");
  Cards.find({}, function (err, cards) {
    if (err) {
      return err;
    } else {
      res.render("cards/index.ejs", { cards });
    }
  });
}
