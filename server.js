const { response } = require('express');
const express = require('express')
const app = express();
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const pool = new Pool({
  connectionString: connectionString
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true,})
)
app.get('/getdata', function(req, res){
  pool.query("SELECT * FROM Feed; SELECT * FROM Diaper", function(err, results){
    if (err) {
      throw err;
    }
    res.send(results.rows);
  });
});
// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.post('/newBaby', newBaby);
app.post('/newFeed', newFeed);
app.post('/newDiaper', newDiaper);
// // start the server listening
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});



//Adding a Baby 


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

      //Adding a Feed
      
 function newFeed(req, res) {
  const start_time = req.body.start_time;
  const amount = req.body.amount;
  const baby_id = req.body.baby_id;
 
  handleFeed(start_time, amount, baby_id, function (error, result) {
      
      if (error || result == null || result.length != 1) {
        response.status(500).json({
          success: false,
          data: error
        });
      } else {
        const feed = result[0];
        response.status(204).json(feed);
      }
    });
  }

    function handleFeed (start_time, amount, baby_id, callback) {
      console.log("inserting feed ");
      
      const sql = `INSERT INTO Feed (start_time, amount, baby_id) VALUES ( '${start_time}', '${amount}', '${baby_id}')`;
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

      // Adding a Diaper change
      function newDiaper(req, res) {
        const change_time = req.body.change_time;
        const change_type = req.body.change_type;
        const baby_id = req.body.baby_id;
       
        handleDiaper(change_time, change_type, baby_id, function (error, result) {
            
            if (error || result == null || result.length != 1) {
              response.status(500).json({
                success: false,
                data: error
              });
            } else {
              const diaper = result[0];
              response.status(204).json(diaper);
            }
          });
        }
      
          function handleDiaper (change_time, change_type, baby_id, callback) {
            console.log("inserting diaper ");
            
            const sql = `INSERT INTO Diaper (change_time, change_type, baby_id) VALUES ( '${change_time}', '${change_type}', '${baby_id}')`;
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