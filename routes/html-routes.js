var path = require("path");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.render("index");
    }
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    if (req.user) {
      res.render("index");
    }
    res.render("login");
  });

  app.get("/BMI", isAuthenticated, function(req, res) {
    res.render("BMI");
  });

  app.get("/goals", isAuthenticated, function(req, res) {
    res.render("goalsTrack");
  });

  app.get("/workout", isAuthenticated, function(req, res) {
    res.render("workout");
  });

  app.get("/profile", isAuthenticated, function(req, res) {
    res.render("profile");
  });

  app.get("/workoutBodyweight", isAuthenticated, function(req, res) {
    res.render("workoutBodyweight");
  });

  app.get("/workoutCardio", isAuthenticated, function(req, res) {
    res.render("workoutCardio");
  });


  app.get("/workoutWeightlifting", isAuthenticated, function(req, res) {
    res.render("workoutWeightlifting");
  });



};

