const express = require('express')
const { client } = require("../modules/database.js");
const router = express.Router();

// GET all tasks for a project
router.get('/', (req, res) => {
    console.log("tasks GET made it to server")
    // mongo query goes here

    //using dummy json data to start
    fetch('https://dummyjson.com/products/1')
        .then(response => response.json())
        .then((json) => {
            res.status(200).send(json);
        })
        .catch((err) => {
            res.status(501).send({ alert: "Error getting tasks" }, err);
        });
})

// POST new task
router.post('/', (req, res) => {
    console.log("task POST made it to server", req.body);
    // mongo query goes here
    const newProject = req.body;
    res.status(201).send(newProject);
})

// EDIT (put) task
router.put('/', (req, res) => {
    console.log("task EDIT made it to server", req.body);
    // mongo query goes here
    const newProject = req.body;
    res.status(201).send(newProject);
})

// DELETE project
router.delete('/:id', (req, res) => {
    console.log("task DELETE made it to server")
    // mongo query goes here
})

module.exports = router;