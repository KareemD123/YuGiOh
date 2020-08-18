var express = require("express");
var router = express.Router();
var cardsCtrl = require("../controllers/cards");
var collectionsCtrl = require("../controllers/collections");
const passport = require("passport");

const request = require("request");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.get("/", cardsCtrl.requestApi);
router.get("/cards", cardsCtrl.showAllCards);
router.get("/save/:id", collectionsCtrl.saveCards);
router.get("/myCollection", collectionsCtrl.showMyCollection);

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
