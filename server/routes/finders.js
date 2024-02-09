const { client } = require("../modules/database.js");
const projects = client.db().collection("projects");
const tasks = client.db().collection("tasks");
const users = client.db().collection("users");

/*==================== FILM - CHARACTERS ====================*/
module.exports.getFilmCharacters = (req, res) => {
  //let data = filmCharacters.findOne({ "id": Number(req.params.id) });
  const filmId = Number(req.params.id);
  let data = filmCharacters
    .aggregate([
      {
        $match: { film_id: filmId },
      },
      {
        $lookup: {
          from: "characters",
          localField: "character_id",
          foreignField: "id",
          as: "character_matches",
        },
      },
      {
        $unwind: "$character_matches",
      },
      {
        $replaceRoot: {
          newRoot: "$character_matches",
        },
      },
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
        },
      },
    ])
    .toArray();
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(501).send({ alert: `Error getting characters of film with id ${filmId}` }, err);
    });
};

/*==================== PROJECTS ====================*/
module.exports.getAllProjects = (req, res) => {
  let data = projects.find({}).toArray();
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(501).send({ alert: "Error getting all projects" }, err);
    });
};

module.exports.getOneProject = (req, res) => {
  let data = projects.findOne({ id: Number(req.params.id) });
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res
        .status(501)
        .send({ alert: `Error getting project with id ${id}` }, err);
    });
};

/*==================== TASKS ====================*/
module.exports.getAllTasks = (req, res) => {
  let data = tasks.find({}).toArray();
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(501).send({ alert: "Error getting all tasks" }, err);
    });
};

module.exports.getOneTask = (req, res) => {
  let data = tasks.findOne({ id: Number(req.params.id) });
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res
        .status(501)
        .send({ alert: `Error getting Task with id ${id}` }, err);
    });
};
