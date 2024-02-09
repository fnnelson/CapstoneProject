const express = require('express')
const { client } = require("../modules/database.js");
const tasks = client.db().collection("tasks");
const router = express.Router();

// GET all tasks for a single project
router.get('/:id', (req, res) => {
    let projectId = Number(req.params.id);
    console.log("tasks GET made it to server", projectId)
    // mongo query goes here
    let data = tasks.find({ "project_id": projectId }).toArray();
    data
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(501).send({ alert: "Error getting all tasks" }, err);
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
router.put('/task/:id', (req, res) => {
    let taskId = Number(req.params.id);
    let newStatus = req.body;
    console.log("task EDIT made it to server", taskId);
    console.log("data to update", req.body)
    // mongo query goes here
    // update query here
    // let data = tasks.find({ "project_id": taskId }).toArray();
    // data
    //     .then((data) => {
    //         res.status(202).send(data);
    //     })
    //     .catch((err) => {
    //         res.status(501).send({ alert: "Error updating task" }, err);
    //     });
})

// DELETE project
router.delete('/:id', (req, res) => {
    console.log("task DELETE made it to server")
    // mongo query goes here
})

module.exports = router;