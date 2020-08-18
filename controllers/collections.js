const Collection = require("../models/collection");
const request = require("request");
const Cards = require("../models/card");

module.exports = {
  // saveCards,
  showMyCollection,
};

function showMyCollection(req, res) {
  Collection.find({}, function (err, cards) {
    if (err) return err;
    // console.log(cards);
    res.render("cards/mycollection.ejs", { cards });
  });
}

// function showMyCollection(req, res) {
//   Collection.find({}, function (err, cards) {
//     res.render("cards/mycollection.ejs", { cards });
//   });
// }

// function saveCards(req, res) {
//   let collection = new MyCollection(req.body);
//   MyCollection.save();
// }
