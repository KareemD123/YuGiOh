const Collection = require("../models/card");
const request = require("request");

module.exports = {
  showMyCollection,
  requestApi,
  saveCards,
  deleteCard,
  goHome,
  requestApi2,
  deleteTest,
};

function requestApi(req, res, next) {
  request("https://db.ygoprodeck.com/api/v7/cardinfo.php?level=12", function (
    err,
    req,
    body
  ) {
    let req2 = JSON.parse(req.body);
    let req3 = req2.data;
    let displayCards = [];
    req3.forEach(function (name) {
      let imageurl = name.card_images;
      let textimageurl = imageurl[0].image_url;
      incomingCard = {
        name: name.name,
        id: name.id,
        atk: name.atk,
        def: name.def,
        Type: name.race,
        level: name.level,
        image: name.card_images[0].image_url,
      };
      displayCards.push(incomingCard);
    });
    res.render("cards/index.ejs", { displayCards });
  });
}

async function saveCards(req, res) {
  console.log("this is the reqid: " + req.body.name);
  let cards;
  try {
    let collection = await Collection.findOne({ id: 0 });
    console.log("this is my collection: " + collection);
    if (!collection) {
      let result = await Collection.create({ id: 0 });
      collection = await Collection.findOne({ id: 0 });
    }
    card_obj = {
      name: req.body.name,
      id: req.body.id,
      atk: req.body.atk,
      def: req.body.def,
      Type: req.body.race,
      level: req.body.level,
      image: req.body.image,
    };
    collection.cards.push(card_obj);
    let save = await collection.save();
    cards = collection.cards;
  } catch (error) {
    console.log("error=" + error);
  }
  res.render("cards/mycollection.ejs", { cards });
}

async function deleteTest(req, res, next) {
  try {
    console.log(req.params._id);
    await Collection.remove({ _id: req.params._id });
    res.redirect("/home");
  } catch (err) {
    console.log(err);
    return res.render("error");
  }
}

async function deleteCard(req, res, next) {
  try {
    let collection = await Collection.findOne({ id: 0 });
    let myArray = collection.cards;
    console.log("this is myArray: " + myArray);
    myArray.forEach(function (m, idx) {
      if (m._id == req.body._id) {
        myArray.splice(idx, 1);
        collection.cards.splice(idx, 1);
      }
    });
    await collection.save();
  } catch (error) {
    console.log("error=" + error);
  }
  res.redirect("../home");
}

function goHome(req, res) {
  res.render("home");
}

async function showMyCollection(req, res) {
  let collection = await Collection.findOne({ id: 0 });
  console.log(collection.cards);
  var cards = collection.cards;
  res.render("cards/mycollection.ejs", { cards });
}

function requestApi2(req, res, next) {
  console.log("this is the reqbodysearch: " + req.body.search);
  let search = `${req.body.search}`;
  let finalsearch = [...search];
  function filterArr(arr) {
    newArr = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] !== ",") {
        newArr.push(arr[i]);
      }
    }
    finalArr = newArr.join("");
    console.log(finalArr);
    return finalArr;
  }
  let finalsearchquery = filterArr(finalsearch);
  console.log("this is finalsearch: " + finalsearchquery);
  let requestUrl =
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=" + finalsearchquery;
  console.log("this is the request url: " + requestUrl);
  request(requestUrl, function (err, req, body) {
    let req2 = JSON.parse(req.body);
    let req3 = req2.data;
    let displayCards = [];
    if (req3 == undefined) {
      res.render("error");
    } else {
      req3.forEach(function (name) {
        let imageurl = name.card_images;
        let textimageurl = imageurl[0].image_url;
        incomingCard = {
          name: name.name,
          id: name.id,
          atk: name.atk,
          def: name.def,
          Type: name.race,
          level: name.level,
          image: name.card_images[0].image_url,
        };
        displayCards.push(incomingCard);
      });
      res.render("cards/index.ejs", { displayCards });
    }
  });
}
