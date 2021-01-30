var db = require("../models");
var passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// console.log(db);
// console.log("***************************");
// console.log(db.BMI);
// console.log("***************************");

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
    db.Goal.findAll({
      where: {
        email: req.user.email
      }
    })
      .then(function(goalDB) {
        console.log(goalDB)
        res.json(goalDB);
      });
  });
  // Goal api route

    app.post("/api/goals", function(req, res) {
      console.log(req.body);
      console.log(req.user.email);
      
      db.Goal.create({
        goalSetByUser: req.body.goal,
        email: req.user.email
      })
        .then(function(goalDB) {
          res.json(goalDB);
        });
    });
      // Goal api route

    app.put("/api/goals/:id", function (req, res) {
      var condition = "id = " + req.params.id;
    
      console.log("condition", condition);
    
      Goal.update(
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

  // BMI api route
  app.get("/api/BMI", function(req, res) {
  
    db.Bmi.findAll({
      where: {
        email: req.user.email
      }
    })
      .then(function(BMIDB) {
        console.log(BMIDB)
        res.json(BMIDB);
      });
    });
  
  app.post("/api/BMI", function(req, res) {
    
    db.Bmi.create({
      height: req.body.height,
      weight:req.body.weight,
      bmi: req.body.bmi,
      email: req.user.email
    })
      .then(function(BMIDB) {
        res.json(BMIDB);
      });
  });

};
    