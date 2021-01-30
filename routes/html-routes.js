var path = require("path");
var db = require("../models");



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

};

