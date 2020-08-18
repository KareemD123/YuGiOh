const Cards = require("../models/card");
const request = require("request");

module.exports = {
  requestApi,
  showCards,
  saveCards,
};

function requestApi(req, res) {
  request(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?level=4&attribute=water&sort=atk",
    function (err, req, body) {
      if (err) return console.log(err);
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
      });
      res.render("index");
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

function showCards(req, res) {
  console.log("hello2");
  Cards.find({}, function (err, cards) {
    if (err) return err;
    // console.log(cards);
    res.render("show.ejs", { cards });
  });
}

function saveCards(req, res) {}
