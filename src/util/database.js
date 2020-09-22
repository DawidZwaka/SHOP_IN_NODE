const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGODB_URI;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then((client) => {
      console.log("Connected to database!");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      //throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
