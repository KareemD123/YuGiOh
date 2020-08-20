const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const request = require("request");
const { json } = require("express");

const cardSchema = new Schema({
  name: String,
  id: String,
  level: Number,
  atk: Number,
  def: Number,
  Type: String,
  image: String,
});

const myCollection = new Schema({
  id: { type: Number, default: 0 },
  name: String,
  cards: [cardSchema],
});

const userLogin = new Schema({
  username: String,
  email: String,
  googleId: String,
  collectionId: { type: Schema.Types.ObjectId, ref: "myCollection" },
  cardcollection: [myCollection],
});

// const Cards = mongoose.model("Cards", cardSchema);
const Collection = mongoose.model("Collection", myCollection);

function addSubSchema(req, res, next) {
  const newCollectionModel = new collectionModel();
  const newCollectionEntry = newCollectionModel.cards.push({
    name: "Hello",
  });

  console.log(req.params);
  let req4 = JSON.stringify(req.body);
  let req5 = req4.data;
  console.log("this is the req4: " + req4);
  console.log("this is the reqbody: " + req5);
  console.log("this is new collectionmodel " + newCollectionModel);
  let newColModel = [newCollectionModel];
  console.log("this is newcol model 0: " + newColModel[0]);

  newCollectionModel.save((err, data) => {
    console.log("this is the data: " + data);
    console.log(err);
    res.render("cards/mycollection.ejs", { newColModel });
    if (err) return err;
  });
}

function requestApi(req, res, next) {
  request(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?type=spell%20card&race=equip",
    function (err, req, body) {
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
    }
  );
}

// function (err) {
//   console.log("3: " + err);
//   res.render("home.ejs");
// students,
// user: req.user,
// name: req.query.name,
// sortKey,

// function showAllCards(req, res) {
//   console.log("hello2");
//   Collection.find({}, function (err, cards) {
//     if (err) {
//       return req.next(err);
//     } else {
//       // console.log(cards);
//       res.render("cards/index.ejs", { cards });
//     }
//   });
// }

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
    // let card_obj = [];
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
    console.log("i ran");
    let save = await collection.save();
    cards = collection.cards;
  } catch (error) {
    console.log("error=" + error);
  }
  res.render("cards/mycollection.ejs", { cards });
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
    console.log("this is myArray2: " + myArray);
    // let result = await myArray.deleteById({ _id: req.body._id });
    // let result2 = JSON.stringify(result);
    // console.log("this is my result: " + result2);
  } catch (error) {
    console.log("error=" + error);
  }
  console.log("this is theeee mongoid: " + req.body._id);
  // console.log("this is theeee reqbodyname: " + req.body.name);
  //   console.log(collection.cards);
  // } catch (error) {
  //   console.log("error=" + error);
  // }
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
  let search = req.body.search;
  let requestUrl =
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=" + search;
  console.log("this is the request url: " + requestUrl);
  request(requestUrl, function (err, req, body) {
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

module.exports = {
  addSubSchema,
  // showAllCards,
  showMyCollection,
  requestApi,
  saveCards,
  Collection,
  deleteCard,
  goHome,
  requestApi2,
};
// module.exports = mongoose.model("MyCollection", myCollection);
// module.exports = mongoose.model("UserLogin", userLogin);
