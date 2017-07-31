var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var mongodb= require("mongodb");
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://urlshort:78292725@ds127993.mlab.com:27993/israelmarmar';      


router.get('/new/http://:url', function (req, res) {
var resp=res;

  MongoClient.connect(url, function (err, db) {
  if (err) throw err;
 
	db.collection("urls").count().then(function(value) {
		db.collection("urls").insert({ _id: value, url: "http://"+req.params.url }, function(err, res) {
    if (err) throw err;
    resp.json({ original_url: "http://"+req.params.url, short_url: value});
    db.close();
  
});
});

  });
 
});

router.get('/new/https://:url', function (req, res) {
	var resp=res;

   MongoClient.connect(url, function (err, db) {
  if (err) throw err;
 
	db.collection("urls").count().then(function(value) {
		db.collection("urls").insert({ _id: value, url: "https://"+req.params.url }, function(err, res) {
    if (err) throw err;
    resp.json({ original_url: "https://"+req.params.url, short_url: value});
    db.close();
  
});
});

  });
});

router.get('/:shurl', function (req, res) {
	var resp=res;
	
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  
  var query = { _id: parseInt(req.params.shurl) };

  db.collection("urls").find(query).toArray(function(err, result) {
    if (err) throw err;
	console.log(result[0]["url"]);
    resp.write("<script>");
  resp.write("location.href='"+result[0]["url"]+"'");
	resp.write("</script>");
    db.close();
  });

});

});


app.listen(port, function () {
 console.log("ligado");
});

app.use('/', router);