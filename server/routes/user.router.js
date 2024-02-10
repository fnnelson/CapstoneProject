const express = require('express')
const { client } = require("../modules/database.js");
const users = client.db().collection("users");
const router = express.Router();

router.post('/', (req, res) => {
    console.log("user credentials", req.body)
    let typedUsername = req.body.username;
    let typedPassword = req.body.password;
    // // mongo query goes here
    let data = users.find({ "username": typedUsername, "password": typedPassword }).toArray();
    data
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(501).send({ alert: "Error getting user" }, err);
        });
})

module.exports = router;