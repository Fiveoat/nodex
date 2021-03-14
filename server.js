process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
let express = require("express");
let app = express();
require('dotenv').config();
app.set('view engine', 'html');
const controller = require("./controllers/controller.js");

var session = require("express-session");

app.use(session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true
}));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.set('port', (process.env.PORT || 5000));
app.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
app.get('/x', function (req, res, next) {
    var data = {
        studentList: ["Johnson", "Mary", "Peter", "Chin-su"]
    };
    res.render('x', {
        students: data
    });
})
app.get('/userData', controller.getUserData);
app.get('/registration');
app.post('/login', controller.loginUser);
app.post('/logout', controller.logoutUser);
app.post('/register', controller.registerUser);
app.listen(app.get("port"), function () {
    console.log("Now listening on port: ", app.get("port"));
});