// const mySeparateCollection = require("../models/collection");
const request = require("request");
const Collection = require("../models/card");

module.exports = {
  // saveCards,
  showMyCollection,
};

function showMyCollection(req, res) {
  Collection.find({}, function (err, myCards) {
    if (err) return err;
    // console.log(cards);
    res.render("cards/mycollection.ejs", { myCards });
  });
}

// function saveCards(req, res) {
//   console.log(req.params.id);
//   // mySeparateCollection.create({ _id: req.params.id }, function (err) {
//   //   if (err) {
//   //     console.log("im the error");
//   //     return err;
//   //   }
//   // });
//   // Cards.findById({ _id: req.params.id }, function (err, myCards) {
//   //   console.log("i am rendering...");
//   //   console.log(myCards);
//   //   res.render("cards/mycollection.ejs", { myCards });
//   });
// }
