var express = require("express");
var router = express.Router();
var cardsCtrl = require("../controllers/cards");
const request = require("request");

router.get("/", cardsCtrl.goHome);
router.get("/cards", cardsCtrl.requestApi);
router.post("/cards/request", cardsCtrl.requestApi2);
router.post("/save", cardsCtrl.saveCards);
router.delete("/delete", cardsCtrl.deleteCard);
// router.delete("/delete/:_id", cardsCtrl.deleteTest);
router.get("/myCollection", cardsCtrl.showMyCollection);
router.get("/home", cardsCtrl.goHome);

module.exports = router;
