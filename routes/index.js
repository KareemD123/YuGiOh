var express = require("express");
var router = express.Router();
var cardsCtrl = require("../controllers/cards");
var collectionsCtrl = require("../controllers/collections");
const passport = require("passport");
var cardModel = require("../models/card");

const request = require("request");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });
// router.get("/save/:id", cardModel.addSubSchema);
router.get("/", cardModel.requestApi);
router.get("/cards", cardModel.requestApi);
router.post("/save", cardModel.saveCards);
router.delete("/delete", cardModel.deleteCard);
router.get("/myCollection", cardModel.showMyCollection);
router.get("/home", cardModel.goHome);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/home",
  })
);

router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/students");
});

module.exports = router;
