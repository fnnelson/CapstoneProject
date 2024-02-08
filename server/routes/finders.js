const { client } = require("../modules/database.js");
const characters = client.db().collection("characters");
const planets = client.db().collection("planets");
const films = client.db().collection("films");
const filmCharacters = client.db().collection("films-characters");

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

/*==================== CHARACTERS ====================*/
module.exports.getCharacters = (req, res) => {
  let data = characters.find({}).toArray();
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(501).send({ alert: "Error getting all characters" }, err);
    });
};

module.exports.getCharacter = (req, res) => {
  let data = characters.findOne({ id: Number(req.params.id) });
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res
        .status(501)
        .send({ alert: `Error getting character with id ${id}` }, err);
    });
};

/*==================== PLANETS ====================*/
module.exports.getPlanets = (req, res) => {
  let data = planets.find({}).toArray();
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(501).send({ alert: "Error getting all planets" }, err);
    });
};

module.exports.getPlanet = (req, res) => {
  let data = planets.findOne({ id: Number(req.params.id) });
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res
        .status(501)
        .send({ alert: `Error getting Planet with id ${id}` }, err);
    });
};

/*==================== FILMS ====================*/
module.exports.getFilms = (req, res) => {
  let data = films.find({}).toArray();
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(501).send({ alert: "Error getting all films" }, err);
    });
};

module.exports.getFilm = (req, res) => {
  let data = films.findOne({ id: Number(req.params.id) });
  data
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(501).send({ alert: `Error getting film with id ${id}` }, err);
    });
};

// mongodb query to get all characters in a single film (in this case we're searching for film with id 5)

// db['films-characters'
// ].aggregate([
//   {
//   $match: {
//       "film_id": 5
//     }
//   },
//   {
//   $lookup: {from: "films", localField: "film_id", foreignField: "id", as: "film_matches"
//     },
//   },
//   {
//   $lookup: {from: "characters", localField: "character_id", foreignField: "id", as: "character_matches"
//     },
//   },
//   {
//   $unwind: "$character_matches"
//   },
//   {
//   $replaceRoot: {
//     newRoot: "$character_matches"
//     }
//   },
//   {
//   $sort: {
//     id: 1
//     }
//   }
// ])
