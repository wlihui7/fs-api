const mysql = require("../databases/db");

class Booking {
    constructor(propID, userID, dateFrom, dateTo) {
        this.rentalID = propID;
        this.userID = userID;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        // this.date_created = new Date();
    }

createBooking(result) {
mysql.query("INSERT INTO booking set ?", this, function(err, results) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Bookings: ", results);
            result(null, results);
        }
    });
}

getAllBookings(result) {
    mysql.query("SELECT * FROM booking", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("bookings: ", res);
            result(null, res);
        }
    });
}

getBookingByID(id, result) {
    mysql.query("Select * from booking where id = ? ", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Booking: ", res[0]);
            result(null, res[0]);
        }
    });
}

updateBooking(id, uBooking, result) {
    mysql.query("UPDATE booking SET ? WHERE id = ?", [uBooking, id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Updated Booking: ", res);
            result(null, res);
        }
    });
}

static deleteBooking(id, result) {
    mysql.query("DELETE FROM booking WHERE id = ?", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Deleted Booking: ", res);
            result(null, res);
        }
    });
}

static getBookingByUser(consumerId, rentalId, result) {
    consumerId = parseInt(consumerId);
    rentalId = parseInt(rentalId);
    mysql.query("SELECT * FROM booking WHERE rentalID = ? AND userID = ?", [rentalId, consumerId], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Booking: ", res[0]);
            result(null, res[0]);
        }
    });
}

};

module.exports = Booking;

// var User = function(user) {
//     this.name = user.name;
//     this.surname = user.surname;
//     this.cellPhone = user.cellPhone;
//     this.email = user.email;
//     this.password = user.password;
//     this.role = user.role;
//     this.date_created = new Date();
//   };
  
//   module.exports = User;

//   User.createUser = function(newUser, result) {
//       mysql.query("INSERT INTO user", function(err, results, fields) {
//         console.log("error: ", err);
//         console.log("results: ", results);
//     });
//   };

