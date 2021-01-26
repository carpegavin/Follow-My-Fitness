var express = require("express");
var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/fitness_controller.js");

// app.use(routes);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

// BMI CALCULATOR
// // weight is in pounds
// // height will need to be converted to inches

function calculator(weight, height) {
  var results = weight / height / height * 703; 
  console.log(results);
}

calculator(300,72);