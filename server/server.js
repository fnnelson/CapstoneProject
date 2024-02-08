const express = require("express");
const cors = require("cors")
const app = express();
const projectsRouter = require('./routes/projects.router')

app.use(express.json()); //Parse JSON body
app.use(cors());

/*==================== ROUTES ====================*/
app.get("/", (req, res) => res.send("Server is running"));
app.use("/api/projects", projectsRouter);

// app.get("/characters", finders.getCharacters);
// app.get("/characters/:id", finders.getCharacter);
// app.get("/planets", finders.getPlanets);
// app.get("/planets/:id", finders.getPlanet);
// app.get("/films", finders.getFilms);
// app.get("/films/:id", finders.getFilm);
// app.get("/films/:id/characters", finders.getFilmCharacters);
// app.get("/films/:id/planets", finders.getFilmPlanets);
// app.get("/characters/:id/films", finders.getCharacterFilms);
// app.get("/planets/:id/films", finders.getPlanetFilms);
// app.get("/planets/:id/characters", finders.getPlanetCharacters);

/*==================== PORT ====================*/
const port = 3000;
console.log(
    "Open a browser to http://localhost:" + port + " to view the application"
);
app.listen(port, () => {
    console.log(`(/◕ヮ◕)/ listening on port: ${port}`);
});
