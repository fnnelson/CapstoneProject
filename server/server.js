const express = require("express");
const cors = require("cors")
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

/*==================== PORT ====================*/
const port = 3000;
console.log(
    "Open a browser to http://localhost:" + port + " to view the application"
);
app.listen(port, () => {
    console.log(`(/◕ヮ◕)/ listening on port: ${port}`);
});

