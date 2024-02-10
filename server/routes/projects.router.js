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
// Endpoint for ML Model Inference
router.post("/", (req, res) => {
  // Input data for prediction received from front end
  console.log("project POST made it to server", req.body);
  const input_data = req.body;
  console.log("input_data", input_data);
  // Run Python script for inference
  let options = {
    mode: "text",
    pythonPath: "C:/Users/wasadmin/anaconda3/python",
    pythonOptions: ["-u"], // get print results in real-time
    scriptPath: "C:/CapstoneProject/",
    args: [JSON.stringify(input_data)],
  };
  PythonShell.run("load_model.py", options, (err, result) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Error performing inference");
    } else {
      console.log("Prediction:", result);
      // Parse the result as JSON, assuming the script returns JSON
      const prediction = JSON.parse(result);
      res.status(200).json({ prediction: prediction });
    }
  });
});

// DELETE project
router.delete("/:id", (req, res) => {
  console.log("project DELETE made it to server");
  // mongo query goes here
});

module.exports = router;
