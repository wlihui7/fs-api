const mysql = require("../databases/db");

class User {
    constructor(name, role, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        // this.date_created = new Date();
    }

createUser(result) {
    mysql.query("INSERT INTO user set ?", this, function(err, results) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("User: ", results);
            result(null, results);
        }
    });
}

getAllUsers(result) {
    mysql.query("SELECT * FROM user", this, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Users: ", res);
            result(null, res);
        }
    });
}

static getUserByID(id, result) {
    mysql.query("Select * from user where id = ? ", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("User: ", res[0]);
            result(null, res[0]);
        }
    });
}

static getUserByEmail(email, result) {
    mysql.query("Select * from user where email = ? ", email, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("user's User (does not throw error in getting user): ", res[0]);
            result(null, res[0]);
        }
    });
}

updateUser(id, uUser, result) {
    mysql.query("UPDATE user SET ? WHERE id = ?", [uUser, id], function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Updated User: ", res);
            result(null, res);
        }
    });
}

deleteUser(id, result) {
    mysql.query("DELETE FROM user WHERE id = ?", id, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("Deleted User: ", res);
            result(null, res);
        }
    });

}

};

module.exports = User;

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

