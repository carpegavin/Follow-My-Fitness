var db = require("../models");
var passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");



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
<<<<<<< HEAD
/////Goals
    // Goal api route
    app.get("/api/goals/", function(req, res) {
    db.Goals.findAll({
=======



    // Goal api route
    app.get("/api/goals/", function(req, res) {
    db.Goal.findAll({
>>>>>>> e6b080fe5493e1837b428437769420d9d3d815e5
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
//////workout main
     // workout api route
     app.get("/api/workouts/", function(req, res) {
      db.Workout.findAll({
        where: {
          email: req.user.email
        }
      })
        .then(function(workoutDB) {
          console.log(workoutDB)
          res.json(workoutDB);
        });
    });
  ////workout cardio
       // workout api route
     app.get("/api/workouts/cardio", function(req, res) {
      db.Workout.findAll({
        where: {
          email: req.user.email,
          workout_type: req.body.workout_type
        }
      })
        .then(function(workoutDB) {
          console.log(workoutDB)
          res.json(workoutDB);
        });
    });
     // workout api route
  
     app.post("/api/workouts/cardio", function(req, res) {
      console.log(req.body);
      db.Workout.create({
        workout: req.body.workout,
        email: req.user.email,
        workout_type: req.body.workout_type,
        reps: req.body.reps,
        distance: req.body.distance,
        date: req.body.date,
        weight_lifted: req.body.weight_lifted,
        exercise_name: req.body.exercise_name,
        time_workout: req.body.time_workout,
      })
        .then(function(workoutDB) {
          res.json(workoutDB);
        });
    });
      // workout api route

    // app.put("/api/workouts/cardio:id", function (req, res) {
    //   var condition = "id = " + req.params.id;
    
    //   console.log("condition", condition);
    
    //   Workout.update(
    //     {
         
    //     },
    //     condition,
    //     function (result) {
    //       if (req.body.completed === true) {
    //         console.log("workout updated");
    //       }
    //       if (result.changedRows == 0) {
    //         return res.status(404).end();
    //       } else {
    //         res.status(200).end();
    //       }
    //   });
    // });

  ////workout weight lifting
       // workout api route
       app.get("/api/workouts/weightlifting", function(req, res) {
        db.Workout.findAll({
          where: {
            email: req.user.email
          }
        })
          .then(function(workoutDB) {
            console.log(workoutDB)
            res.json(workoutDB);
          });
      });

    ////workout body weight
       // workout api route
       app.get("/api/workouts/bodyweight", function(req, res) {
        db.Workout.findAll({
          where: {
            email: req.user.email
          }
        })
          .then(function(workoutDB) {
            console.log(workoutDB)
            res.json(workoutDB);
          });
      });

  // BMI api route
  app.get("/api/BMI/", function(req, res) {
    db.BMI.findAll({
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
    
    db.BMI.create({
      height: req.body.height,
      weight:req.body.weight,
      BMI: req.body.BMI,
      email: req.user.email
    })
      .then(function(goalDB) {
        res.json(goalDB);
      });
  });

};
    