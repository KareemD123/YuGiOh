const Collection = require("../models/collection");
const request = require("request");
const Cards = require("../models/card");

module.exports = {
  saveCards,
  showMyCollection,
};

function showMyCollection(req, res) {
  Collection.find({}, function (err, cards) {
    if (err) return err;
    // console.log(cards);
    res.render("cards/mycollection.ejs", { cards });
  });
}

function saveCards(req, res) {
  console.log(req.params.id);
  // console.log(req.params.name);
  // console.log(req.params.atk);
  // console.log(req.params.def);
  // console.log(req.params.type);
  console.log(req.params);

  // let collection = new MyCollection(req.body);
  // MyCollection.save();
  // Collection.find({}, function (err, cards) {
  //   if (err) {
  //     return err;
  //   } else {
  //     console.log("im the error");
  //     console.log(cards);
  //     res.render("cards/mycollection", { cards });
  //   }
  // });
  res.render("cards/mycollection", { cards });
}
