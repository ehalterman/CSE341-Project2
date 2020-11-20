const express = require('express')
const app = express();
var { Pool } = require('pg');
var connectionString = process.env.DATABASE_URL;


const pool = new Pool ({connectionString: connectionString});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//app.get('/newBaby', newBaby);

// // start the server listening
app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

// //
// function newBaby(req, res) {
//   const id = Number(req.query.id);
//   handleBaby(res, id);
// }

// function handleBaby(res, id) {
//   pg.connect(conString, function(err, client, done) {
//     if (err) {
//       return console.error('error fetching client from pool', err);
//     }
//     console.log("connected to database");
//     client.query(`SELECT * FROM Person WHERE id = ${id}`, function(err, result) {
//       done();
//       if (err) {
//         return console.error('error running query', err);
//       }
//       res.send(result);
//       console.log(result);
//     });
//   });
// }