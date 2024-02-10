const express = require('express')
const { client } = require("../modules/database.js");
const tasks = client.db().collection("tasks");
const users = client.db().collection("users");
// const projects = client.db().collection("projects");
const router = express.Router();

// GET all projects
router.get('/:id', (req, res) => {
    let userId = Number(req.params.id);
    console.log("projects GET made it to server", userId)
    // mongo query goes here

    let data = tasks
        .aggregate([
            {
                $match: { user_id: userId },
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "project_id",
                    foreignField: "project_id",
                    as: "project_matches",
                },
            },
            {
                $unwind: "$project_matches",
            },
            {
                $replaceRoot: {
                    newRoot: "$project_matches",
                },
            },
        ])
        .toArray();
    data
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(501).send({ alert: `Error getting characters of film with id ${userId}` }, err);
        });
});


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