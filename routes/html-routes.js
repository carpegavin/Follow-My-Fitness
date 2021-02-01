var path = require("path");
var db = require("../models");
const moment = require("moment");

var isAuthenticated = require("../config/middleware/isAuthenticated");
const bmi = require("../models/bmi");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/signup", function (req, res) {
    if (req.user) {
      res.render("index");
    }
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect('/');
    }
    res.render("login");
  });

  app.get("/BMI", isAuthenticated, function (req, res) {
    db.Bmi.findAll({
      where: {
        email: req.user.email,
      },
    }).then((hbsObject) => {
      
      let bmiArr = hbsObject.map((bmi) => {
        return bmi.dataValues;
      });
      
      const bmiObj = {
        bmis: bmiArr,
      };
      res.render("BMI", bmiObj);
    });
  });

  app.get("/goals", isAuthenticated, function (req, res) {
    db.Goal.findAll({ where: { email: req.user.email }, raw: true })
      .then(function (goals) {
        const hbsObj = {};

        hbsObj.goals = goals.map((x) => ({
          ...x,
          time: moment(x.createdAt).format("h:mm A"),
          date: moment(x.createdAt).format("MM/DD/YYYY"),
        }));

        res.render("goalsTrack", hbsObj);
      })
      .catch(function (err) {});
  });



  app.get("/workout", isAuthenticated, function (req, res) {
    db.Workout.findAll({
      where: {
        email: req.user.email,
      },
    }).then((hbsObject) => {
      
      let workoutArr = hbsObject.map((workout) => {
        return workout.dataValues;
      });
      
      const workoutObj = {
        workouts: workoutArr,
      };
      res.render("workout", workoutObj);
    });
  });

  app.get("/profile", isAuthenticated, function (req, res) {
    res.render("profile");
  });

  app.get("/workoutBodyweight", isAuthenticated, function (req, res) {
    db.Workout.findAll({
      where: {
        email: req.user.email,
        workout_type: "Bodyweight"
      },
    }).then((hbsObject) => {
      
      let workoutArr = hbsObject.map((workout) => {
        return workout.dataValues;
      });
      
      const workoutObj = {
        workouts: workoutArr,
      };
      res.render("workoutBodyweight", workoutObj);
    });;
  });

  app.get("/workoutCardio", isAuthenticated, function (req, res) {
    db.Workout.findAll({
      where: {
        email: req.user.email,
        workout_type: "Cardio"
      },
    }).then((hbsObject) => {
      
      let workoutArr = hbsObject.map((workout) => {
        return workout.dataValues;
      });
      
      const workoutObj = {
        workouts: workoutArr,
      };
      res.render("workoutCardio", workoutObj);
    });;
  });

  app.get("/workoutWeightlifting", isAuthenticated, function (req, res) {
    db.Workout.findAll({
      where: {
        email: req.user.email,
        workout_type: "Weightlifting"
      },
    }).then((hbsObject) => {
      
      let workoutArr = hbsObject.map((workout) => {
        return workout.dataValues;
      });
      
      const workoutObj = {
        workouts: workoutArr,
      };
      res.render("workoutWeightlifting", workoutObj);
    });;
  });
};
