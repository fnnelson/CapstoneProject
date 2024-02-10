const express = require("express");
const cors = require("cors")
const { PythonShell } = require("python-shell");
const app = express();
const projectsRouter = require('./routes/projects.router');
const tasksRouter = require('./routes/tasks.router');
const userRouter = require('./routes/user.router');

app.use(express.json()); //Parse JSON body
app.use(cors());

/*==================== ROUTES ====================*/
app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/user", userRouter);

// Endpoint for ML Model Interference
app.get("/predict", (req, res) => {
  // Input data for prediction
  const input_data = {
    team_size: 4,
    budget: 40000,
    workload: 3
  };

  // Run Python script for inference
  PythonShell.run(
    "C:/CapstoneProject/load_model.py",
    { args: [JSON.stringify(input_data)] },
    (err, result) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).send("Error performing inference");
      } else {
        console.log("Prediction:", result);
        res.status(200).json({ prediction: result });
      }
    }
  );
});

/*==================== PORT ====================*/
const port = 3000;
console.log(
    "Open a browser to http://localhost:" + port + " to view the application"
);
app.listen(port, () => {
    console.log(`(/◕ヮ◕)/ listening on port: ${port}`);
});

