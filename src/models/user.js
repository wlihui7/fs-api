const mongo = require("../databases/db");
const ObjectId = require('mongodb').ObjectId;

class User {    
    constructor(name, role, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

static createUser(user, result) {
    console.log("passed json", user);
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("User");
      collection.insertOne(user, function(err, res) {
        if (err) {
            console.log("error in inserting user");
            result(err, null);
        } else {
            console.log("! new User", res);
            result(null, res);
        }
    });
    //   mongo.close();
    });

}

static getUserByID(id, result) {
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("User");
      collection.findOne(ObjectId(id), function(err, res) {
        if (err) {
            console.log("error in getting user by id from mongo: ", err);
            result(err, null);
        } else {
            console.log("Res from mongo: ", res);
            result(null, res);
        }
      });
    });
}

static getUserByEmail(email, result) {
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("User");
      collection.findOne({"email": email}, function(err, res) {
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

static updateUser(id, uUser, result) {
    console.log('passed in id', id);
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("User");
      collection.findOneAndReplace({"_id": ObjectId(id)}, uUser, function(err, res) {
        if (err) {
            console.log("error in replacing user in mongo: ", err);
            result(err, null);
        } else {
            console.log("Res from mongo: ", res);
            result(null, res);
        }
      });
    });
}

static deleteUser(id, result) {
    mongo.connect(err => {
        if (err) {
            console.log("error in connecting to mongo", err);
            result(err, null);
        }
      const collection = mongo.db("Bnb").collection("User");
      collection.deleteOne({"_id": ObjectId(id)}, function(err, res) {
        if (err) {
            console.log("error in replacing user in mongo: ", err);
            result(err, null);
        } else {
            console.log("Res from mongo: ", res);
            result(null, res);
        }
      });
    });
}

};

module.exports = User;


