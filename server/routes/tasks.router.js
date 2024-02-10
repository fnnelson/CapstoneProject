const express = require('express')
const { client } = require("../modules/database.js");
const tasks = client.db().collection("tasks");
const router = express.Router();

// GET all tasks for a single project
router.get('/project/:id', (req, res) => {
    let projectId = Number(req.params.id);
    console.log("project tasks GET made it to server, project id:", projectId)
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
// GET all tasks for a single employee
router.get('/employee/:id', (req, res) => {
    let userId = Number(req.params.id);
    console.log("employee tasks GET made it to server, user ID:", userId)
    // mongo query goes here
    let data = tasks.find({ "user_id": userId }).toArray();
    data
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            res.status(501).send({ alert: "Error getting all tasks" }, err);
        });
})

// // POST new task
// router.post('/', (req, res) => {
//     console.log("task POST made it to server", req.body);
//     // mongo query goes here
//     const newProject = req.body;
//     res.status(201).send(newProject);
// })

// EDIT (put) task status only
router.put('/taskstatus/:id', (req, res) => {
    let taskId = Number(req.params.id);
    let newStatus = req.body.status;
    console.log("task EDIT made it to server", taskId);
    console.log("data to update", newStatus)
    // mongo query goes here
    // update query here
    let data = tasks.updateOne(
        { "task_id": taskId },
        { $set: { "status": newStatus } }
    );
    data
        .then(() => {
            res.status(200).send({ message: "task updated successfully" });
        })
        .catch((err) => {
            res.status(501).send({ alert: "Error updating task" }, err);
        })
});

// EDIT (put) task details
router.put('/taskdetails/:id', (req, res) => {
    let taskId = Number(req.params.id);
    console.log("full data recd:", req.body);
    let newDescription = req.body.description;
    let newDueDate = req.body.due_date;
    let newEstimatedDuration = Number(req.body.estimated_duration);
    console.log("task EDIT made it to server", taskId);
    console.log("data to update:", "desc:", newDescription, "duedate:", newDueDate, "newestdur:", newEstimatedDuration)
    // mongo query goes here
    let data = tasks.updateOne(
        { "task_id": taskId },
        {
            $set: {
                "description": newDescription,
                "due_date": newDueDate,
                "estimated_duration": newEstimatedDuration
            }
        }
    );
    data
        .then(() => {
            res.status(200).send({ message: "task updated successfully" });
        })
        .catch((err) => {
            res.status(501).send({ alert: "Error updating task" }, err);
        })
});

// DELETE task
router.delete('/delete/:id', (req, res) => {
    let taskId = Number(req.params.id);
    console.log("task DELETE made it to server", taskId)
    // mongo query goes here

    let data = tasks.deleteOne(
        { "task_id": taskId }
    );
    data
        .then(() => {
            res.status(200).send({ message: "task deleted successfully" });
        })
        .catch((err) => {
            res.status(500).send({ alert: "Error deleting task" }, err);
        })
})

module.exports = router;