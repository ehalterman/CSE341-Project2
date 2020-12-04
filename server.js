const express = require('express')
const app = express();
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
app.use(express.json())
app.use(express.urlencoded({extended: true,})
)

const pool = new Pool({
  connectionString: connectionString
});

app.set('port', process.env.PORT);

app.use(express.static(__dirname + '/public'));

// // start the server listening
app.listen(app.post('port'), function () {
  console.log('Node app is running on port', app.post('port'));
});
// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
app.post('/newBaby', newBaby);



//
const newBaby = (request, response) => {
  const {first_name, last_name, dob} = request.body

  pool.query ('INSERT INTO Baby (first_name, last_name, dob) VALUES ( $1, $2, $3)', [first_name, last_name, dob], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Baby added with ID: $result.insertId}`)
  })
}


// function newBaby(req, response) {
//   const input {first_name, last_name, dob} = req.body

//   handleBaby(first_name, last_name, dob, function (error, result) {
//       // This is the callback function that will be called when the DB is done.
//       // The job here is just to send it back.

//       // Make sure we got a row with the person, then prepare JSON to send back
//       if (error || result == null || result.length != 1) {
//         response.status(500).json({
//           success: false,
//           data: error
//         });
//       } else {
//         const baby = result[0];
//         response.status(200).json(baby);
//       }
//     });
//   }

//     function handleBaby (first_name, last_name, dob, callback) {
//       console.log("inserting baby: " + first_name);
      
//       const sql = `INSERT INTO Baby (first_name, last_name, dob) VALUES ( '${first_name}', '${last_name}', '${dob}')`;
//       pool.query(sql, function (err, result) {
//           if (err) {
//             console.log("Error in query: ");
//             console.log(err);
//           }
//           console.log("Found Result: " + JSON.stringify(result.rows));
//           callback(null, result.rows);
//         });
      //}