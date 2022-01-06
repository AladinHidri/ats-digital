const mongoose = require("mongoose");

const connection = mongoose
  .connect(
    "mongodb+srv://ala:12345@ats-digital.l2vlz.mongodb.net/ats-digital?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((connection) => {
    console.log("MongDB Connected");
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
    process.exit(1);
  });

module.exports = connection;
