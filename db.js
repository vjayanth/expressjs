var MongoClient = require("mongodb").MongoClient;
var db;

module.exports = {
  connectToServer(callback) {
    MongoClient.connect(
      "<dburl>",
      function(err, database) {
        if (err) throw err;
        db = database.db('<dbname>');
        callback(err);
      }
    );
  },
  getDB() {
    return db;
  }
};
