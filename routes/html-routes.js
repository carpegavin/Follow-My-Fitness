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
    res.render("workourInput");
  });

};

