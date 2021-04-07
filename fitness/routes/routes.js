const db = require("../models");
const path = require("path");
module.exports = function (app) {
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  })
  app.get("/api/workouts/range", ({}, res) => {
    db.Workout.find({}).then((dbWorkout) => {
      res.json(dbWorkout);
    }).catch(err => {
      res.status(400).json(err);
    });
  });
  app.post("/api/workouts/", (req, res) => {
    db.Workout.create(req.body).then((dbWorkout) => {
      res.json(dbWorkout);
    }).catch(err => {
      res.status(400).json(err);
    });
  });
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate({
      _id: req.params.id
    }, {
      exercises: req.body
    }).then((dbWorkout) => {
      res.json(dbWorkout);
    }).catch(err => {
      res.status(400).json(err);
    });
  });
  app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
  app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
  });
};