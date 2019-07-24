const MongoClient  = require('mongodb').MongoClient;

const uri = 'mongodb+srv://wlihui7:airbnb@bnb-lpuyq.mongodb.net/test?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true });

module.exports = client;

// const mongo = require('mongodb').MongoClient;

// const url = 'mongodb+srv://wlihui7:welshvalley@bnb-lpuyq.mongodb.net/test?retryWrites=true&w=majority';

// const config = {
//     host: "localhost", 
//     port: 3306,
//     user: "root",
//     password: "qwertyuiop",
//     database: "fs_bnb"
// };

// var connection = mysql.createConnection(config);
// connection.connect(function(err) {
//     if (err) {console.log(err);}
//     console.log("Database Connected: " + config.host + ":" + config.port);
// });

// module.exports = connection;
