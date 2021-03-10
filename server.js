const express = require('express');
require('dotenv').config();
var port = process.env.PORT || 5000;
var app = express();
const connectionString = process.env.DATABASE_URL
const pool = new Pool({connectionString: connectionString});
app.set('port', port)
   .use(express.static(__dirname + "/public"))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/', (req, res) => {
       res.sendFile('index.html', {root: __dirname + '/public'});
   })
   .get('/getPerson', function(req, res){
    var sql = "SELECT * FROM People WHERE id = $1::int";
        var params = [req.query.id]
        pool.query(sql, params, (err, result) => {
            if (err) {
                console.log("Error in query: ");
                console.log(err);
            }
            console.log("Back from DB with result: ");
            console.log(result.rows);
            res.json(result.rows);
        });
   })
   .listen(app.get('port'), () => {
       console.log('Listening on port: ' + app.get('port'));
   })
