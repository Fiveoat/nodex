process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
let express = require("express");

require('dotenv').config();

const controller = require("./controllers/controller.js");
let app = express();
var session = require('express-session');
app.use(session({
    secret: 'ssshhhhh'
}));

app.set('port', (process.env.PORT || 5000))
    .use(express.static(__dirname + "/public"))
    .set('views', __dirname + '/views')
    .set('view engine', 'ejs')
    .use(express.json())
    .use(express.urlencoded({
        extended: true
    }))
    .get('/', (req, res) => {
        res.sendFile('index.html', {
            root: __dirname + '/public'
        })
    })
    .get('/registration', (req, res) => {
        res.sendFile('registration.html', {
            root: __dirname + '/public'
        })
    })
    .get('/signin', (req, res) => {
        res.sendFile('signin.html', {
            root: __dirname + '/public'
        })
    })
    .post('/addCoin', controller.addCoinHolding)
    .get('/deleteCoin', controller.deleteCoinHolding)
    .get('/signout', controller.logoutUser)
    .get('/account', controller.getUserData)
    .get('/prices', controller.getPriceData)
    .post('/login', controller.loginUser)
    .post('/register', controller.registerUser)
    .listen(app.get("port"), function () {
        console.log("Now listening on port: ", app.get("port"));
    });