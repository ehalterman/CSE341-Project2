const express = require('express')
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
var {pg} = require('pg');
var conString = process.env.DATABASE_URL;


const pg = new Pool ({conString: conString});


app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/getPerson', handlePerson);

// start the server listening
app.listen(port, function () {
  console.log('Node app is running on port', port);
});

//
function handlePerson(req, res) {
  const id = Number(req.query.id);
  getPerson(res, id);
}

function getPerson(res, id) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query(`SELECT * FROM Person WHERE id = ${id}`, function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
      console.log(result);
    });
  });
}