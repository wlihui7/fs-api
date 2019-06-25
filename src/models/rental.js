const mysql = require("../databases/db");

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

createRental(result) {
mysql.query("INSERT INTO rental set ?", this, function(err, results) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Rentals: ", results);
            result(null, results);
        }
    });
}

static getAllRentals(result) {
    mysql.query("SELECT * FROM rental", function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Rentals: ", res);
            result(null, res);
        }
    });
}

static getRentalByID(id, result) {
    mysql.query("Select * from rental where id = ? ", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Rental: ", res[0]);
            result(null, res[0]);
        }
    });
}

updateRental(id, uRental, result) {
    mysql.query("UPDATE rental SET ? WHERE id = ?", [uRental, id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Updated Rental: ", res);
            result(null, res);
        }
    });
}

deleteRental(id, result) {
    mysql.query("DELETE FROM rental WHERE id = ?", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Deleted Rental: ", res);
            result(null, res);
        }
    });

}

};

module.exports = Rental;

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

