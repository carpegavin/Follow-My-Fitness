var db = require("../models");
var passport = require("../config/passport");



module.exports = function(app) {

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res) {
      db.User.create({
        email: req.body.email,
        password: req.body.password,
        height: req.body.height,
        weight: req.body.weight,
      })
        .then(function() {
          console.log("it worked")
          res.redirect("/login");
        })
        .catch(function(err) {
          console.log("it didn't")
          res.status(401).json(err);
        });
    });

  app.get("/logout", function(req, res) {
      req.logout();
      res.redirect("/");
    });

  app.get("/api/user_data", function(req, res) {
      if (!req.user) {
        res.json({});
      } else {
        res.json({
          email: req.user.email,
          id: req.user.id
        });
      }
    });

    // Goal api route
    app.get("/api/goals/", function(req, res) {
    db.Goals.findAll({})
      .then(function(goalDB) {
        res.json(goalDB);
      });
  });
  // Goal api route

    app.post("/api/goals", function(req, res) {
      console.log(req.body);
      db.Goals.create({
        goalSetByUser: req.body.goalSetByUser
      })
        .then(function(goalDB) {
          res.json(goalDB);
        });
    });
      // Goal api route

    app.put("/api/goals/:id", function (req, res) {
      var condition = "id = " + req.params.id;
    
      console.log("condition", condition);
    
      Goals.update(
        {
          completed: req.body.completed,
        },
        condition,
        function (result) {
          if (req.body.completed === true) {
            console.log("Goal marked as complete");
          }
          if (result.changedRows == 0) {
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
      });
    });
  
};
    