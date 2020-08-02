const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
var favicon = require('serve-favicon');
// var path = require('path');

const app = express();
app.set('view engine', 'ejs');
// app.use(favicon(path.join(__dirname +
//   '/public/favicon.ico')));


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("search");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/signup", function(req, res) {
  res.render("signup");
}) ;
app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/signup/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const password = req.body.password;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        MERGE: password
      }
    }]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us17.api.mailchimp.com/3.0/lists/f2fc5baabf";
  const options = {
    method: "POST",
    auth: "shreyas:1b95ce859316c088140736e696df337c-us17"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/index.html");

    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    // response.on("data", function(data) {
    //   // console.log(JSON.parse(data));
    // })
  })
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
})

//API Key
//1b95ce859316c088140736e696df337c-us17

//Lidt // IDEA:
//f2fc5baabf
