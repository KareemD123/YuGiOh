const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  // id: String,
  // level: Number,
  // atk: Number,
  // def: Number,
  // Type: String,
  // image: String,
  cards: [cardSchema],
});

const userLogin = new Schema({
  username: String,
  email: String,
  googleId: String,
  collectionId: { type: Schema.Types.ObjectId, ref: "myCollection" },
  cardcollection: [myCollection],
});

const cardModel = mongoose.model("card", cardSchema);
const collectionModel = mongoose.model("MyCollection", myCollection);
//Type vs Race

function addSubSchema(req, res, next) {
  const newCollectionModel = new collectionModel();
  const newCollectionEntry = newCollectionModel.cards.push({
    name: "Hello",
  });
  newCollectionModel.save((err, data) => {
    console.log("this is the data: " + data);
    if (err) return err;
  });
  let req4 = JSON.stringify(req.body);
  let req5 = req4.data;
  console.log("this is the req4: " + req4);
  console.log("this is the reqbody: " + req5);
  console.log("this is new collectionmodel " + newCollectionModel);
  let newColModel = [newCollectionModel];
  console.log("this is newcol model 0: " + newColModel[0]);
  res.render("cards/mycollection.ejs", { newColModel });
}

module.exports = {
  cardModel,
  addSubSchema,
};

// module.exports = mongoose.model("MyCollection", myCollection);
// module.exports = mongoose.model("UserLogin", userLogin);
