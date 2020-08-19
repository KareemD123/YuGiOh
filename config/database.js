var mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://KareemD123:<12345>@sei.km1rt.azure.mongodb.net/Kareem?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

// mongoose.connect("mongodb://localhost/YuGiOh", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

var db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});
