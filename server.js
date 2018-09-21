var express = require('express');
var inquirer = require('inquirer');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = "mctrainee";


var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!!');
});

app.get('/people', function (req, res) {
  MongoClient.connect(url, (err, conn) => {
    const db = conn.db(dbName)
    db.collection('people').find().toArray((err, people) => {
        res.send(people)
    })
  })

});
app.get('/logs', function (req, res) {
  MongoClient.connect(url, (err, conn) => {
    const db = conn.db(dbName)
    db.collection('logs').find().toArray((err, logs) => {
        res.send(logs)
    })
  })

});

app.listen(4000, function () {
  console.log('Example app listening on port 4001');
});