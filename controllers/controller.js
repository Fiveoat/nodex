const model = require("../models/model.js");

function registerUser(req, res) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let password = req.body.password;
    let email = req.body.email;
    model.registerUser(first_name, last_name, password, email, function (error, results) {
        if (error == null) {
            return res.redirect("/account.html");
        }
    })
}

function favoriteCoin(req, res) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let password = req.body.password;
    let email = req.body.email;
    model.favoriteCoin(first_name, last_name, password, email, function (error, results) {
        if (error == null) {
            return res.redirect("/account.html");
        }
    })
}

function addCoinHolding(req, res) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let password = req.body.password;
    let email = req.body.email;
    model.addCoinHolding(first_name, last_name, password, email, function (error, results) {
        if (error == null) {
            return res.redirect("/account.html");
        }
    })
}

function getUserData(req, res) {
    let user_id = req.query.user_id;
    model.getUserData(user_id, function (error, results) {
        if (error == null) {
            return res.json(results);
        }
    });
}

function loginUser(req, res) {
    let result = {
        success: false
    };
    if (req.body.email == "admin" && req.body.password == "password") {
        req.session.user = req.body.username;
        result = {
            success: true
        };
    }
    return res.redirect("/account.html");
}

function logoutUser(req, res) {
    var result = {
        success: false
    };
    if (req.session.user) {
        req.session.destroy();
        result = {
            success: true
        };
    }
    return res.redirect("/index.html");
}

function verifyLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        var result = {
            success: false,
            message: "Access Denied"
        };
        res.status(401).json(result);
    }
}


module.exports = {
    registerUser: registerUser,
    getUserData: getUserData,
    loginUser: loginUser,
    logoutUser: logoutUser,
    verifyLogin: verifyLogin,
    favoriteCoin, favoriteCoin,
    addCoinHolding, addCoinHolding
}