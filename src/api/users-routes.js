const express = require("express");
const router = express.Router();
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
    User.createUser(nUser, (err, result) => { 
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
});

router.post("/update", (req, res) => {
    const user = req.body;
    if (!user._id || !user.name || !user.role || !user.email || !user.password) {
        error = true;
        return res.status(400).json({msg: "Missing information!"});
    }
    var nUser = new User(user.name, user.role, user.email, user.password);

    User.updateUser(user._id, nUser, (err, result) => { 
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            return res.json(result.value);
        }
       });
});

router.get("/delete/:id", (req, res) => {
    const id = req.params.id;

    User.deleteUser(id, (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            return res.json("User Deleted");
        }
       });
    });

module.exports = router;