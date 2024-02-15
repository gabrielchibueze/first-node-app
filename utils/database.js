const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
    const url = "mongodb+srv://gabbyraw:node-complete@cluster0.izv4nlt.mongodb.net/shop?retryWrites=true&w=majority";

    MongoClient.connect(url)
        .then(client => {
            _db = client.db("shop");
            console.log("connected!!!!");
            callback();
        })
        .catch(err => {
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    } else {
        throw "No DB found"
    }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
