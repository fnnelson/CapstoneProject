const express = require('express')
const { client } = require("../modules/database.js");
const projects = client.db().collection("projects");
const users = client.db().collection("users");
const router = express.Router();

// GET all projects
router.get('/', (req, res) => {
    console.log("projects GET made it to server")
    // mongo query goes here

    console.log("reached getAllProjects")
    let data = projects.find({}).limit(20).toArray();
    data
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(501).send({ alert: "Error getting all projects" }, err);
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