const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const request = require("request");

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

// module.exports = mongoose.model("mySeparateCollection", mySeparateCollection);

// const Cards = mongoose.model("Cards", cardSchema);
const Collection = mongoose.model("MyCollection", myCollection);
//Type vs Race
// let mySepCol = mongoose.model("mySepCol", mySeparateCollection);
// let mySepCol2 = new mySepCol();

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
      console.log("1: " + err);
      // if (err) {
      //   return req.next(err);
      // }
      console.log("2: " + err);
      let req2 = JSON.parse(req.body);
      let req3 = req2.data;
      let displayCards = [];
      req3.forEach(function (name) {
        let imageurl = name.card_images;
        let textimageurl = imageurl[0].image_url;
        // let newCard = new cardModel();
        // console.log("this is the name: " + name.name);

        incomingCard = {
          name: name.name,
          id: name.id,
          atk: name.atk,
          def: name.def,
          Type: name.race,
          level: name.level,
          image: name.card_images[0].image_url,
        };
        // console.log(displayCards);
        displayCards.push(incomingCard);
        // let arrayDisplayCards = [displayCards];
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
    Collection.create({ id: 0 });
    let collection = await Collection.findOne({ id: 0 });
    // if (Collection.empty) {
    //   console.log("collection is empty");
    // }
    console.log(collection);
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

function deleteCard(req, res) {
  Collection.deleteOne(req.params.id);
  console.log("this is theeee reqbody: " + req.params);
  res.redirect("../home");
}

// collection.find({}, function (err, collection) {
//   console.log("this is my collection: " + collection);
// });

// module.exports = {
//   Cards,
// };
function goHome(req, res) {
  res.render("home");
}

function showMyCollection(req, res) {
  let cards;
  cards = collection.cards;
  // Collection.find({}, function (err, myCards) {
  //   if (err) return err;
  //   // console.log(cards);
  res.render("cards/mycollection.ejs", { cards });
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
};
// module.exports = mongoose.model("MyCollection", myCollection);
// module.exports = mongoose.model("UserLogin", userLogin);
