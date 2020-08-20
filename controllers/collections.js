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
