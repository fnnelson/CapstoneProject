const express = require("express");
const { client } = require("../modules/database.js");
const tasks = client.db().collection("tasks");
const users = client.db().collection("users");
// const projects = client.db().collection("projects");
const router = express.Router();
const { PythonShell } = require("python-shell");

// GET all projects
router.get("/:id", (req, res) => {
  let userId = Number(req.params.id);
  console.log("projects GET made it to server", userId);
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
      res
        .status(501)
        .send(
          { alert: `Error getting characters of film with id ${userId}` },
          err
        );
    });
});

// POST new project

router.post("/", (req, res) => {
  console.log("project POST made it to server", req.body);
  // mongo query goes here
  const newProject = req.body;
  res.status(201).send(newProject);
});

// Endpoint for ML Model Inference
router.post("/predict", (req, res) => {
  // Input data for prediction received from front end
  console.log("project POST made it to server", req.body);
  const input_data = req.body;
  console.log("input_data", input_data);
  // Run Python script for inference
  // PythonShell.run(
  //   "load_model.py",
  //   { args: [JSON.stringify({ team_size: 3, budget: 2, workload: 3 })] },
  //   (err, result) => {
  //     if (err) {
  //       console.error("Error running Python script:", err);
  //       res.status(500).send("Error performing inference");
  //     } else {
  //       try {
  //         console.log("Prediction:", result);
  //         const prediction = JSON.parse(result);
  //         res.status(200).send({ prediction: prediction });
  //       } catch (jsonError) {
  //         console.error("Error parsing JSON from Python script:", jsonError);
  //         res.status(500).send("Error parsing prediction result");
  //       }
  //     }
  //   }
  // );
  PythonShell.run("./machine_learning/inference.py", {
    args: [JSON.stringify(input_data)],
  })
    .then((result) => {
      console.log("successful!");
      console.log("Prediction:", result);
      const prediction = JSON.parse(result);
      res.status(200).send({ prediction: prediction });
    })
    .catch((err) => console.log(err));
});

// DELETE project
router.delete("/:id", (req, res) => {
  console.log("project DELETE made it to server");
  // mongo query goes here
});

module.exports = router;
