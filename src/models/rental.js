const mongo = require("../databases/db");
const ObjectId = require('mongodb').ObjectId;

class Rental {
    constructor(name, location, price, providerID, consumerID, imageURL) {
        this.name = name;
        this.location = location;
        this.price = price;
        this.providerID = providerID;
        this.consumerID = consumerID;
        this.imageURL = imageURL;
        // this.date_created = new Date();
    }
    static createRental(rental, result) {
        console.log("passed json", rental);
        mongo.connect(err => {
            if (err) {
                console.log("error in connecting to mongo", err);
                result(err, null);
            }
          const collection = mongo.db("Bnb").collection("Rental");
          collection.insertOne(rental, function(err, res) {
            if (err) {
                console.log("error in inserting rental");
                result(err, null);
            } else {
                console.log("! new Rental", res);
                result(null, res.ops);
            }
        });
        //   mongo.close();
        });
    
    }
    
    static getRentalByID(id, result) {
        mongo.connect(err => {
            if (err) {
                console.log("error in connecting to mongo", err);
                result(err, null);
            }
          const collection = mongo.db("Bnb").collection("Rental");
          collection.findOne(ObjectId(id), function(err, res) {
            if (err) {
                console.log("error in getting Rental by id from mongo: ", err);
                result(err, null);
            } else {
                console.log("Res from mongo: ", res);
                result(null, res);
            }
          });
        });
    }

    static getAllRentals(result) {
        mongo.connect(err => {
            if (err) {
                console.log("error in connecting to mongo", err);
                result(err, null);
            }
          const collection = mongo.db("Bnb").collection("Rental");
          collection.find().toArray(function(err, res) {
            if (err) {
                console.log("error in getting Rentals from mongo: ", err);
                result(err, null);
            } else {
                console.log(" -- Res from mongo: -- ", res);
                result(null, res);
            }
          });
        });
    }
    
    static updateRental(id, uRental, result) {
        console.log('passed in id', id);
        mongo.connect(err => {
            if (err) {
                console.log("error in connecting to mongo", err);
                result(err, null);
            }
          const collection = mongo.db("Bnb").collection("Rental");
          collection.findOneAndReplace({"_id": ObjectId(id)}, uRental, function(err, res) {
            if (err) {
                console.log("error in replacing Rental in mongo: ", err);
                result(err, null);
            } else {
                console.log("Res from mongo: ", res);
                result(null, res);
            }
          });
        });
    }
    
    static deleteRental(id, result) {
        mongo.connect(err => {
            if (err) {
                console.log("error in connecting to mongo", err);
                result(err, null);
            }
          const collection = mongo.db("Bnb").collection("Rental");
          collection.deleteOne({"_id": ObjectId(id)}, function(err, res) {
            if (err) {
                console.log("error in replacing Rental in mongo: ", err);
                result(err, null);
            } else {
                console.log("Res from mongo: ", res);
                result(null, res);
            }
          });
        });
    }    
};

module.exports = Rental;

