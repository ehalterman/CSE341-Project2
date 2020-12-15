const { response } = require('express');
const express = require('express')
const app = express();
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true,})
)
app.get('/getdata', function(request, response){
  client.query("SELECT * FROM feed", function(err, results){
    if (err){
    throw err;
  }
  response.send(results.row);
});
});
// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.post('/newBaby', newBaby);
// // start the server listening
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});


//
// 


 function newBaby(req, res) {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const dob = req.body.dob;
 
  handleBaby(first_name, last_name, dob, function (error, result) {
      // This is the callback function that will be called when the DB is done.
      // The job here is just to send it back.

      // Make sure we got a row with the person, then prepare JSON to send back
      if (error || result == null || result.length != 1) {
        response.status(500).json({
          success: false,
          data: error
        });
      } else {
        const baby = result[0];
        response.status(204).json(baby);
      }
    });
  }

    function handleBaby (first_name, last_name, dob, callback) {
      console.log("inserting baby: " + first_name);
      
      const sql = `INSERT INTO Baby (first_name, last_name, dob) VALUES ( '${first_name}', '${last_name}', '${dob}')`;
      pool.query(sql)
        .then((res) => {
          console.log(res);
          pool.end();
        })
        .catch((err) => {
          console.log(err);
          pool.end();
        });
      }