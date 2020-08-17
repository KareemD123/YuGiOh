var express = require("express");
var router = express.Router();
var cardsCtrl = require("../controllers/cards");
const request = require("request");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.get("/", cardsCtrl.requestApi);
router.get("/show", cardsCtrl.showCards);
router.get("/save/:cardName", cardsCtrl.saveCards);

module.exports = router;
