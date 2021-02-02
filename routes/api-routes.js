var db = require("../models");
var passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// console.log(db);
// console.log("***************************");
// console.log(db.BMI);
// console.log("***************************");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function (req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })
      .then(function () {
        console.log("it worked");
        res.redirect("/login");
      })
      .catch(function (err) {
        console.log("it didn't");
        res.status(401).json(err);
      });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
  /////Goals
  // Goal api route
  app.get("/api/goals/", function (req, res) {
    db.Goal.findAll({
      where: {
        email: req.user.email,
      },
      raw: true,
    }).then(function (goalDB) {
      console.log(goalDB);
      res.json(goalDB);
    });
  });
  // Goal api route

  app.post("/api/goals", isAuthenticated, function (req, res) {
    console.log(req.body);
    console.log(req.user.email);

    db.Goal.create({
      goalSetByUser: req.body.goal,
      email: req.user.email,
    }).then(function (goalDB) {
      res.redirect("/goals");
    });
  });

  app.post("/api/goals", function (req, res) {
    console.log(req.body);
    console.log(req.user.email);

    db.Goal.create({
      goalSetByUser: req.body.goal,
      email: req.user.email,
    }).then(function (goalDB) {
      res.json(goalDB);
    });
  });
  // Goal api route

  app.post("/api/goals/:id", function (req, res) {
    console.log(req.body);
    db.Goal.update(
      {
        completed: req.body.completed,
      },
      {
        where: { id: req.params.id },
      }
    )
      .then(function () {
        res.redirect("/goals");
      })
      .catch(function (err) {
        console.log(err);
        res.redirect("/goals");
      });
  });

  // Workout Routes
  app.post("/api/workout/cardio", function (req, res) {
    console.log(req.body);
    db.Workout.create({
      workout_type: "Cardio",
      email: req.user.email,
      exercise_name: req.body.exercise_name,
      distance: req.body.distance,
      time_workout: req.body.time_workout,
    }).then(function (workoutDB) {
      res.json(workoutDB);
    });
  });

  app.post("/api/workout/bodyweight", function (req, res) {
    console.log(req.body);
    db.Workout.create({
      workout_type: "Bodyweight",
      email: req.user.email,
      exercise_name: req.body.exercise_name,
      time_workout: req.body.time_workout,
      reps:req.body.reps,
      sets:req.body.sets
    }).then(function (workoutDB) {
      res.json(workoutDB);
    });
  });

  app.post("/api/workout/weightlifting", function (req, res) {
    console.log(req.body);
    db.Workout.create({
      workout_type: "Weightlifting",
      email: req.user.email,
      exercise_name: req.body.exercise_name,
      reps:req.body.reps,
      sets:req.body.sets,
      weight_lifted:req.body.weight_lifted
    }).then(function (workoutDB) {
      res.json(workoutDB);
    });
  });

  // BMI api route
  app.get("/api/BMI", function (req, res) {
    db.Bmi.findAll({
      where: {
        email: req.user.email,
      },
    }).then(function (BMIDB) {
      
      res.json(BMIDB);
    });
  });

  app.post("/api/BMI", function (req, res) {
    db.Bmi.create({
      height: req.body.height,
      weight: req.body.weight,
      bmi: req.body.bmi,
      email: req.user.email,
    }).then(function (BMIDB) {
      res.json(BMIDB);
    });
  });

  app.delete("/api/BMI/:id", function (req,res){
    db.Bmi.destroy({
      where:{
        id: req.params.id
      }
    }).then(function(dbBMI){
      res.json(dbBMI);
    })
  })
};
