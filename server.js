process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var express = require("express");
var app = express();
require('dotenv').config();

const controller = require("./controllers/controller.js");

var session = require("express-session");

app.use(session({
  secret: "my-secret",
  resave: false,
  saveUninitialized: true
}));

app.use(express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.set('port', (process.env.PORT || 5000));
app.get('/userData', controller.getUserData);
app.get('/registration')
app.post('/login', controller.loginUser);
app.post('/logout', controller.logoutUser);
app.post('/register', controller.registerUser);
app.listen(app.get("port"), function() {
    console.log("Now listening on port: ", app.get("port"));
});
