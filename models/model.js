const {
    Pool
} = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString
});


function getUserData(user_id, callback) {
    let sql = "SELECT * FROM users u INNER JOIN user_coins uc on u.user_id = uc.user_id INNER JOIN coins c ON uc.coin_id = c.coin_id WHERE u.user_id=" + user_id;
    pool.query(sql, function (err, db_results) {
        if (err) {
            throw err;
        } else {
            var results = {
                list: db_results.rows
            };
            callback(null, results);
        }
    })
}

function registerUser(first_name, last_name, password, email, callback) {
    let sql = "INSERT INTO users(first_name, last_name, password_, email) VALUES ('" + first_name + "', '" + last_name + "', '" + password + "', '" + email + "');";
    pool.query(sql, function (err, db_results) {
        if (err) {
            throw err;
        } else {
            let results = {
                list: db_results.rows
            };
            callback(null, results);
        }
    })
}


function favoriteCoin(user_id, symbol, is_favorite, callback) {
    let sql = "UPDATE user_coins SET is_favorite=$3::boolean WHERE user_id = $1::text AND symbol=$2::text"
    var params = [user_id, symbol, is_favorite];
    pool.query(sql, params, function (err, db_results) {
        if (err) {
            throw err;
        } else {
            let results = {
                list: db_results.rows
            };
            callback(null, results);
        }
    })
}

function addCoinHolding(user_id, symbol, quantity) {
    let sql = "INSERT INTO user_coins(user_id, symbol, quantity) VALUES ('" + user_id + "', '" + symbol + "', '" + quantity + "');";
    pool.query(sql, function (err, db_results) {
        if (err) {
            throw err;
        } else {
            let results = {
                list: db_results.rows
            };
            callback(null, results);
        }
    })
}


module.exports = {
    registerUser: registerUser,
    getUserData: getUserData,
    addCoinHolding: addCoinHolding,
    favoriteCoin: favoriteCoin
}