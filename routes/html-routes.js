var path = require("path");
var db = require("../models");



var isAuthenticated = require("../config/middleware/isAuthenticated");
const bmi = require("../models/bmi");

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
    db.Bmi.findAll({
      where: {
        email: req.user.email
      }
    }).then(hbsObject => {
      console.log("This is HBS");
      console.log(hbsObject);
      let bmiArr = hbsObject.map(bmi => {
        return bmi.dataValues
      })
      console.log(bmiArr)
      const bmiObj = {
        bmis: bmiArr
      }
      res.render("BMI",bmiObj)
    })
  });



 

  app.get("/goals", isAuthenticated, function (req, res) {
    let userID = ""
    
    if (req.user) {
      userID = req.user.id
    }
    db.User.findAll({where: {id:userID}}).then(user => {
     
      db.Goal.findAll({where: {email: user[0].dataValues.email}}).then(hbsObject => {
        
        console.log("THIS IS HBS ")
        // console.log(hbsObject)
        let goalArr = hbsObject.map(goal => {
         return goal.dataValues
        })
        console.log(goalArr)
        const goalObj = { 
          goals: goalArr
        }
        res.render("goalsTrack", goalObj);
  
      })

    })
    
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

