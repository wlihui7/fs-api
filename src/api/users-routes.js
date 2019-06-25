const express = require("express");
const router = express.Router();
// var fs = require("fs");
const User = require("../models/user");

router.get("/:id", (req, res) => {
    const id = req.params.id;
    
    // var nUser = new User(user.name, user.role, user.email, user.password);

    User.getUserByID(id, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: err });
        } else if (!result) {
            return res.status(400).json({msg: "User Not Found!"});
        } else {
            console.log("! user routes's result ", result);
            // var responseUser = {
            //     id: this.Id,
            //     name: result.name,
            //     email: result.email,
            //     password: result.password
            // };
            return res.status(200).json(result);
        }
       });
    });

router.post("/", (req, res) => {
    const user = req.body; 
    //name, role, email, password
    if (!user.name || !user.email || !user.password) {
        error = true;
        return res.status(400).json({ msg: "Missing information!"});
    }

    var nUser = new User(user.name, user.role, user.email, user.password);
    nUser.createUser((err, result) => { 
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ msg: "Duplicate Email." });
            }
            return res.status(500).json({ msg: err });
        } else {
            var responseUser = {
                id: result.insertId,
                name: nUser.name,
                email: nUser.email,
                password: nUser.password
            };
            return res.status(200).json(responseUser);
        }
       });
    
    // fs.readFile("./src/data/data.json", function(err, data) {
    //     var error = false;
    //     var errMsg = "";
    //     if (err) {
    //         error = true;
    //         throw err; 
    //     } else {

    //         if (data.length > 0) {
    //             var parseData = JSON.parse(data);
    //             parseData.users.forEach(existingUser => {
    //                 if (existingUser.email === user.email) {
    //                     // return res.status(400).json({message: "This email address has already been used!"});
    //                     throw new Error("This email address has already been used!");
    //                 }
    //                 // count++;
    //             });
    //         } else {
    //             parseData = {
    //                 users: []
    //             };
    //         }

    //         if (!user.firstName || !user.lastName || !user.email || !user.password) {
    //             error = true;
    //             errorMsg = "Missing information!";
    //             return;
    //             // return res.status(400).json({message: "Missing information!"});
    //         }

    //         const newUser = {
    //             id: parseData.users.length + 1, 
    //             firstName: user.firstName, 
    //             lastName: user.lastName,
    //             phone: user.phone,
    //             email: user.email,
    //             password: user.password,
    //             role: user.role
    //         };

    //         parseData.users.push(newUser);
    //         fs.writeFile("./src/data/data.json", JSON.stringify(parseData), 
    //         function(err) {
    //             if (err) {
    //                 error = true;
    //                 throw err;
    //             }
    //             // return res.json(newUser);
    //         });
    //     }

    //     if (error) {
    //         return res.status(400).json({ msg: errMsg });
    //     } else {
    //         return res.json(user);
    //     }
    // });
});

router.post("/update", (req, res) => {
    const user = req.body;
    if (!user.id || !user.name || !user.role || !user.email || !user.password) {
        error = true;
        return res.status(400).json({msg: "Missing information!"});
    }
    var nUser = new User(user.name, user.role, user.email, user.password);

    nUser.updateUser(user.id, user, (err, result) => { 
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            return res.json(nUser);
        }
       });
    // fs.readFile("./src/data/data.json", function(err, data) {
    //     var error = false;
    //     if (err) {
    //         error = true;
    //         throw err;
    //     } else {
    //         if (data.length > 0) {
    //             var parseData = JSON.parse(data);
    //         } else {
    //             return res.status(400).json({message: "No Users!"});
    //         }

    //         parseData.users = parseData.users.filter(existingUser => {
    //             return existingUser.email !== user.email;
    //         });

    //         const updateUser = {
    //             id: user.id, 
    //             firstName: user.firstName, 
    //             lastName: user.lastName,
    //             phone: user.phone,
    //             email: user.email,
    //             password: user.password,
    //             role: user.role
    //         };

    //         parseData.users.push(updateUser);
    //         fs.writeFile("./src/data/data.json", JSON.stringify(parseData), 
    //             function(err) {
    //                 if (err) {
    //                     error = true;
    //                     throw err;
    //                 }
    //                 return res.json(updateUser);
    //             });
    //         }

    //     if (error) {
    //         return res.status(400).json({ msg: err.msg });
    //     } else {
    //         return res.json(user);
    //     }
    // });
});

router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const user = req.body;
    if (!id || !user.name || !user.role || !user.email || !user.password) {
        error = true;
        return res.status(400).json({msg: "Missing information!"});
    }
    var nUser = new User(user.name, user.role, user.email, user.password);

    nUser.deleteUser(id, (err, result) => {
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            return res.json("User Deleted");
        }
       });
    });
    // fs.readFile("./src/data/data.json", function(err, data) {
    //     var error = false;
    //     if (err) {
    //         error = true;
    //         throw err;
    //     }
    //     var parseData = JSON.parse(data);
    //     parseData.users = parseData.users.filter(user => 
    //         user.id == req.params.id);
    //     fs.writeFile("./src/data/data.json", JSON.stringify(parseData), 
    //         function(err) {
    //             if (err) {
    //                 error = true;
    //                 throw err;
    //             }
    //             res.json({ status: "User deleted"});
    //         });
    //         if (error) {
    //             return res.status(400).json({ msg: err.message });
    //         } else {
    //             return res.json({ status: "User deleted" });
    //         }
    // });

module.exports = router;