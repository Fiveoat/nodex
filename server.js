const express = require('express');
require('dotenv').config();
const {Pool} = require('pg');
var port = process.env.PORT || 5000;
var app = express();
const connectionString = process.env.DATABASE_URL

app.set('port', port)
    .use(express.static(__dirname + "/public"))
    .set('views', __dirname + '/views')
    .set('view engine', 'ejs')
    .get('/', (req, res) => {
        res.sendFile('index.html', {
            root: __dirname + '/public'
        });
    })
    .get('/getPerson', function (req, res) {
        var sql = "SELECT * FROM users WHERE user_id = $1::int";
        var params = [req.query.id]
        const pool = new Pool({
            connectionString: connectionString
        });
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
        pool.query(sql, params, (err, result) => {
            if (err) {
                console.log("Error in query: ");
                console.log(err);
            }
            console.log(result.rows);
            res.json(result.rows);
        });
    })
    .get('/getParents', function (req, res) {
        var sql = "SELECT * FROM relationships r INNER JOIN users u ON u.user_id = r.parent_id WHERE parent_id = $1::int";
        var params = [req.query.id]
        const pool = new Pool({
            connectionString: connectionString
        });
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
        pool.query(sql, params, (err, result) => {
            if (err) {
                console.log("Error in query: ");
                console.log(err);
            }
            console.log(result)
            // console.log(result.rows);
            // res.json(result.rows);
        });
    })
    .get('/getChildren', function (req, res) {
        var sql = "SELECT * FROM relationships r INNER JOIN users u ON u.user_id = r.child_id WHERE child_id = $1::int";
        var params = [req.query.id]
        const pool = new Pool({
            connectionString: connectionString
        });
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
        pool.query(sql, params, (err, result) => {
            if (err) {
                console.log("Error in query: ");
                console.log(err);
            }
            console.log(result)
            // console.log(result.rows);
            // res.json(result.rows);
        });
    })
    .listen(app.get('port'), () => {
        console.log('Listening on port: ' + app.get('port'));
    })
