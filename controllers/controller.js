const model = require("../models/model.js");


function registerUser(req, res) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let password = req.body.password;
    let email = req.body.email;
    model.registerUser(first_name, last_name, password, email, function (error, results) {
        if (error == null) {
            return res.redirect('index.html');
        }
    })
}

function getUserData(req, res) {
    // let get user_id from session
    let user_id = 1;
    model.getUserCoinData(user_id, function (error, results) {
        if (error == null) {
            let data = [];
            results.rows.forEach(function (row) {
                let price = getCoinbaseCoinPrice()
                let total = row.quantity * parseFloat(price);
                data.push({
                    Name: row.name,
                    Symbol: row.symbol,
                    Price: price,
                    Quantity: row.quantity,
                    Total: total
                })
            })
            res.render('account', {
                'data': data
            });
        }
    })
}

function getPriceData(req, res) {
    model.getPriceData(function (error, results) {
        if (error == null) {
            let data = [];
            results.rows.forEach(function (row) {
                let price = 1;
                data.push({
                    Name: row.name,
                    Symbol: row.symbol,
                    // Price: row.last_known_price
                    Price: price
                })
            })
            res.render('account', {
                'data': data
            });
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
            return res.redirect("/account");
        }
    })
}



function getCoinbaseCoinPrice() {
    let reponse = $.ajax({
        url: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
        async: false,
        success: function (response) {
            return response;
        }
    })
    return reponse;
}




// function getCoinbaseCoinPrice(req, res) {
//     const fetch = require('node-fetch');
//     fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
//         .then((response) => {
//             return response.json().then((data) => {
//                 return data.data.rates['USD'];
//             }).catch((err) => {
//                 console.log(err);
//             })
//         });
// }



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
    return res.redirect("/account");
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
    return res.redirect("/");
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

// function get_rate(req, res) {
//     let mail_type = req.query.mail_type;
//     let weight = Number(req.query.weight);
//     let price = Number.parseFloat(calculate_price(mail_type, weight)).toFixed(2);
//     if (mail_type === 'Stamped' || mail_type === 'Metered') {
//         mail_type = "Letter " + mail_type
//     }
//     res.render('rate', {
//         mail_type: mail_type,
//         weight: weight,
//         price: price
//     });
// }


module.exports = {
    registerUser: registerUser,
    getUserData: getUserData,
    loginUser: loginUser,
    logoutUser: logoutUser,
    verifyLogin: verifyLogin,
    addCoinHolding: addCoinHolding,
    getPriceData: getPriceData,
    // getCoinbaseCoinPrice: getCoinbaseCoinPrice
}