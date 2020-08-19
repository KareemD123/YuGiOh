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

const Cards = mongoose.model("Cards", cardSchema);
const collectionModel = mongoose.model("MyCollection", myCollection);
//Type vs Race

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
      if (err) {
        return err;
      }
      console.log("2: " + err);
      let req2 = JSON.parse(req.body);
      let req3 = req2.data;
      req3.forEach(function (name) {
        let imageurl = name.card_images;
        let textimageurl = imageurl[0].image_url;
        // let newCard = new cardModel();
        Cards.create(
          {
            name: name.name,
            id: name.id,
            atk: name.atk,
            def: name.def,
            Type: name.race,
            level: name.level,
            image: name.card_images[0].image_url,
          },
          function (err) {
            console.log("3: " + err);
            res.render("home.ejs");
          }
        );

        // students,
        // user: req.user,
        // name: req.query.name,
        // sortKey,
      });
    }
  );
}

function showAllCards(req, res) {
  console.log("hello2");
  Cards.find({}, function (err, cards) {
    if (err) {
      return err;
    } else {
      // console.log(cards);
      res.render("cards/index.ejs", { cards });
    }
  });
}

// module.exports = {
//   Cards,
// };
module.exports = {
  addSubSchema,
  showAllCards,
  requestApi,
};
// module.exports = mongoose.model("MyCollection", myCollection);
// module.exports = mongoose.model("UserLogin", userLogin);
