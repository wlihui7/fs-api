const express = require("express");
const router = express.Router();

const ValidationService = require("../services/validation-service");
const validationService = new ValidationService();
const User = require("../models/user");

//if user tries to register, register with the auth service then return it to the user as json if there is no error 
router.post("/register", (req, res) => {
    var user = req.body;
    console.log("user that's passed in from front end", user);

    // if (!validationService.isValidRegister(user)) {
    //     return res.status(400).json({ msg: "Registration not valid!" });
    // }
    
    // var nUser = new User(user.name, user.role, user.email, user.password);
    User.createUser(user, (err, result) => { 
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            return res.json(result);
        }
       });
});

router.post("/login", (req, res) => {
    let user = req.body;
    console.log("auth route's user:", user);
    if (!validationService.isValidRegister(user)) {
        return res.status(400).json({ msg: "Invalid Registration!" });
      }
     User.getUserByEmail(user.email, (err, result) => {
         result = result;
         console.log("auth routes's result: ", result);
        if (err) { 
            return res.status(400).json({ msg: err });
        } else {
            if (result.password == user.password) {
                var ret = {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    password: result.password
                };
                console.log("auth routes ret var", ret);
                return res.status(200).json(ret);
            } else {
                return res.status(400).json({ msg: "Invalid Login"});
            }
        }
       });
     })
    // let found = false;
    // fs.readFile("./src/data/data.json", (err, data) => {
    //     if (err) throw err;
    //     var parseData = JSON.parse(data);
    //   // tries to find the user logging in by email
    //   // if found, returns the user; if not, throws error
    //       parseData.users.forEach(existingUser => {
    //           if (existingUser.email === user.email) {
    //               ret = existingUser;
    //               found = true;
    //           }
    //       });
    //       if (!found) {
    //           return res.status(400).json({ msg: "User not found" });
    //       }
    //       return res.json(ret);



    // authService
    //     .login(req.body)
    //     .then((user) => {
    //         console.log("then user: " + user);
    //         return res.json(user);
    //     })
    //     .catch(err => {
    //         return res.status(400).json({ msg: err.message });
    //     });
// });
// });

module.exports = router;