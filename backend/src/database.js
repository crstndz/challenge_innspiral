//const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://root:rootfree@cluster0.5ywt3.mongodb.net/tallerpp?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

/* mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB is connected");
});
 */