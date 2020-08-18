var express = require("express");
var router = express.Router();
var cardsCtrl = require("../controllers/cards");
var collectionsCtrl = require("../controllers/collections");

const request = require("request");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.get("/", cardsCtrl.requestApi);
router.get("/show", cardsCtrl.showCards);
router.get("/save", collectionsCtrl.saveCards);
router.get("/myCollection", collectionsCtrl.showMyCollection);

module.exports = router;
