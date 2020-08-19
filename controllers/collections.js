const Collection = require("../models/collection");
const request = require("request");
const Cards = require("../models/card");

module.exports = {
  saveCards,
  showMyCollection,
};

function showMyCollection(req, res) {
  Cards.find({}, function (err, cards) {
    if (err) return err;
    // console.log(cards);
    res.render("cards/mycollection.ejs", { cards });
  });
}

function saveCards(req, res) {
  console.log(req.params.id);
  console.log(req.params);
  let findId = req.params.id;
  Cards.findById({ id: req.params.id }, function (err, cardId) {
    if (err) {
      console.log(cardId);
      return err;
    } else {
      console.log("im the error");
      res.render("cards/mycollection", { cardId });
    }
  });
}
