const express = require('express')
const { client } = require("../modules/database.js");
const router = express.Router();

// GET all projects
router.get('/', (req, res) => {
    console.log("projects GET made it to server")
    // mongo query goes here

    //using dummy json data to start
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then((json) => {
            res.status(200).send(json.products);
        })
        .catch((err) => {
            res.status(501).send({ alert: "Error getting projects" }, err);
        });
})

// POST new project
router.post('/', (req, res) => {
    console.log("project POST made it to server", req.body);
    // mongo query goes here
    const newProject = req.body;
    res.status(201).send(newProject);
})

// DELETE project
router.delete('/:id', (req, res) => {
    console.log("project DELETE made it to server")
    // mongo query goes here
})

module.exports = router;