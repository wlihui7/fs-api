// const mysql = require("../databases/db");
const mongo = require("../databases/db");
const ObjectId = require('mongodb').ObjectId;

class Booking {
    constructor(propID, userID, dateFrom, dateTo) {
        this.rentalID = propID;
        this.userID = userID;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        // this.date_created = new Date();
    }

static createBooking(booking, result) {
    console.log("passed json", booking);
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("Booking");
      collection.insertOne(booking, function(err, res) {
        if (err) {
            console.log("error in inserting booking");
            result(err, null);
        } else {
            console.log("! new booking", res);
            result(null, res.ops);
        }
    });
    //   mongo.close();
    });

}

static getBookingByID(id, result) {
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("Booking");
      collection.findOne(ObjectId(id), function(err, res) {
        if (err) {
            console.log("error in getting Booking by id from mongo: ", err);
            result(err, null);
        } else {
            console.log("Res from mongo: ", res);
            result(null, res);
        }
      });
    });
}


static updateBooking(id, uBooking, result) {
    console.log('passed in id', id);
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("Booking");
      collection.findOneAndReplace({"_id": ObjectId(id)}, uBooking, function(err, res) {
        if (err) {
            console.log("error in replacing Booking in mongo: ", err);
            result(err, null);
        } else {
            console.log("Res from mongo: ", res);
            result(null, res);
        }
      });
    });
}

static deleteBooking(id, result) {
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("Booking");
      collection.deleteOne({"_id": ObjectId(id)}, function(err, res) {
        if (err) {
            console.log("error in replacing Booking in mongo: ", err);
            result(err, null);
        } else {
            console.log("Res from mongo: ", res);
            result(null, res);
        }
      });
    });
}

static getBookingByUser(userId, rentalId, result) {
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("Booking");
      collection.findOne(
            {
              $and: [
                {"userID": userId}, 
                {"rentalID": rentalId}
                    ]
            }, 
          function(err, res) {
        if (err) {
            console.log("error in getting user by email from mongo: ", err);
            result(err, null);
        } else {
            console.log("Res from mongo: ", res);
            result(null, res);
        }
      });
    }); 
}

static getAllBookingsByUser(userId, result) {
    console.log('-- passed user id --', userId);
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("Booking");
      collection.find({"userID": userId}).toArray(function(err, res) {
        if (err) {
            console.log("error in getting bookings from mongo: ", err);
            result(err, null);
        } else {
            console.log(" -- Res from mongo: -- ", res);
            result(null, res);
        }
      });
    });
}

static getAllBookingsByRental(rentalId, result) {
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("Booking");
      collection.find({"rentalID": rentalId}).toArray(function(err, res) {
        if (err) {
            console.log("error in getting bookings from mongo: ", err);
            result(err, null);
        } else {
            console.log(" -- Res from mongo: -- ", res);
            result(null, res);
        }
      });
    });
}

};

module.exports = Booking;


