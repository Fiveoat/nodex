const model = require("../models/model.js");
const https = require('https');
const fetch = require('node-fetch');
let coins = [
    'MKR', 'LRC', 'ALGO', 'ZEC', 'ZRX', 'USD', 'REP', 'LINK', 'DNT', 'ATOM', 'DASH', 'LTC', 'BNT', 'FIL', 'ETC',
    'UNI', 'USDC', 'XTZ', 'BAND', 'ETH', 'COMP', 'KNC', 'BAT', 'UMA', 'CGLD', 'NU', 'MANA', 'AAVE', 'CVC', 'XLM', 'GRT', 'BAL',
    'SNX', 'OXT', 'REN', 'NMR', 'BTC', 'OMG'
]

function registerUser(req, res) {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let password = req.body.password;
    let email = req.body.email;
    model.registerUser(first_name, last_name, password, email, function (error, results) {
        if (error == null) {
            return res.redirect('/signin');
        }
    })
}

function updateCoinPrice(req, res) {
    coins.forEach(function (coin) {
        https.get('https://api.coinbase.com/v2/exchange-rates?currency=' + coin, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                price = parseFloat(JSON.parse(data)['data']['rates']['USD']).toFixed(2);
                model.updatePriceData(coin, price, function (error, results) {
                    if (error == null) {}
                })
            })
        })
    })
}

function getUserData(req, res) {
    updateCoinPrice();
    sess = req.session;
    let user_id = 0;
    if (sess.user_id) {
        user_id = sess.user_id;
        first_name = sess.first_name;
        model.getUserCoinData(user_id, function (error, results) {
            let combined_total = 0;
            if (error == null) {
                let return_data = [];
                results.rows.forEach(function (row) {
                    let total = (row.quantity * row.last_known_price).toFixed(2);
                    combined_total += parseFloat(total);
                    return_data.push({
                        Name: row.name,
                        Symbol: row.symbol,
                        Price: row.last_known_price,
                        Quantity: row.quantity,
                        Total: total
                    })
                })
                res.render('account', {
                    'data': return_data,
                    'total': combined_total.toFixed(2),
                    'first_name': first_name
                });
            }
        })
    } else {
        res.redirect('/signin')
    }
}


function getPriceData(req, res) {
    updateCoinPrice();
    model.getPriceData(function (error, results) {
        if (error == null) {
            let data = [];
            results.rows.forEach(function (row) {
                data.push({
                    Name: row.name,
                    Symbol: row.symbol,
                    Price: row.last_known_price,
                })
            })
            res.render('prices', {
                'data': data
            });
        }
    })
}

function addCoinHolding(req, res) {
    sess = req.session;
    let user_id = sess.user_id;
    let symbol = req.body.symbol;
    let quantity = req.body.quantity;
    model.addCoinHolding(user_id, symbol, quantity, function (error, results) {
        if (error == null) {
            getUserData(req, res);
        }
    })
}

function deleteCoinHolding(req, res) {
    sess = req.session;
    let user_id = sess.user_id;
    let symbol = req.query.symbol;
    model.deleteCoinHolding(user_id, symbol, function (error, results) {
        if (error == null) {
            getUserData(req, res);
        }
    })
}

function loginUser(req, res) {
    let email = req.body.email;
    let input_password = req.body.password;
    model.getPassword(email, function (error, results) {
        if (error == null) {
            try {
                user = results.list[0];
                let password = user.password_;
                if (password == input_password) {
                    sess = req.session;
                    sess.email = user.email;
                    sess.first_name = user.first_name;
                    sess.user_id = user.user_id;
                    getUserData(req, res);
                } else {
                    return res.redirect('/signin')
                }
            } catch (err) {
                return res.redirect('/signin')
            }
        }
    })
}

function logoutUser(req, res) {
    if (req.session.user_id) {
        req.session.destroy();
    }
    return res.redirect("/signin");
}

module.exports = {
    registerUser: registerUser,
    getUserData: getUserData,
    loginUser: loginUser,
    logoutUser: logoutUser,
    addCoinHolding: addCoinHolding,
    getPriceData: getPriceData,
    updateCoinPrice: updateCoinPrice,
    deleteCoinHolding: deleteCoinHolding
}