var express = require("express");
var router = express.Router();
var cardsCtrl = require("../controllers/cards");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// router.get('/', cardsCtrl.index);
// router.get('/new', cardsCtrl.new);
// router.get('/:id', cardsCtrl.show);
// router.post('/', cardsCtrl.create);

module.exports = router;
