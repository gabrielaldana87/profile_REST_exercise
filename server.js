var express = require('express');
var cors = require('cors');
var app =  express();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("profiles.db");

app.use(cors());
app.use(bodyParser.json({extended: false}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res)
{
  res.sendFile(__dirname + '/public/index.html')
});

app.get('/profiles', function(req,res)
{
  db.all("SELECT * FROM profile", function(err,rows)
  {
    if(err){throw err;}
      res.json(rows);
  });
});

app.post('/profile', function(req,res)
{
  var newName = req.body.name;
  var newHometown = req.body.hometown;
  var newAge = req.body.age;
  db.run("INSERT INTO profile (newName, newHometown, newAge) VALUES (?,?,?)", newName, newHometown, newAge, function(err)
  {
    if(err) {throw err;}
      var id = this.lastID;
      db.get("SELECT * FROM profile WHERE id = ?", id, function(err,row)
      {
        if(err){ throw err;}
          res.json(row);
      });
  });
});

app.delete('/pet/:id',function(req, res)
{
  var id = req.params.id;
  db.run("DELETE FROM pets WHERE id = ?", id, function(err)
  {
    if(err) {throw err;}
      res.json({deleted: true});
  });
});

app.put('/profile/:id', function(req, res)
{
  var id = req.params.id;
  var newName = req.body.name;
  var newHometown = req.body.hometown;
  var newAge = req.body.age;

  db.run("UPDATE profile SET newName = ?, newHometown = ?, newAge = ? WHERE id = ?", newName, newHometown, newAge, id,
  function(err)
  {
    if(err) {throw err;}
  db.get("SELECT * FROM profile WHERE id = ?", id, function(err,row)
  {
    if(err) {throw err;}
      res.json(row)
  });
  });
});

app.listen(3000);
console.log("listening on port 3000");
