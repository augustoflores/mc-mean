var express = require('express');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = "mctrainee";


var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index');
});
app.get('/consultar', function (req, res) {
  getLogs(function (logs) {
    console.log(logs)
    let users = [];
    logs.forEach(log => {
      let nombre = log.name
      let cantidad = Number.parseInt(log.amount);
      let index = users.findIndex(u => u.name === log.name);
      if (index >= 0) {
        users[index].amount += cantidad
      } else {
        users.push(log);
      }
    });

    res.render('consultar', {
      users
    });
  });

});
app.get('/retirar', function (req, res) {
  res.render('retirar');
});
app.get('/depositar', function (req, res) {
  res.render('depositar');
});
app.get('/registrar', function (req, res) {
  res.render('registrar');
});


app.get('/people', function (req, res) {
  MongoClient.connect(url, (err, conn) => {
    const db = conn.db(dbName)
    db.collection('people').find().toArray((err, people) => {
      res.send(people)
    })
  })
});
app.post('/people', function (req, res) {
  MongoClient.connect(url, (err, conn) => {
    const db = conn.db(dbName)
    let name = req.body.name;
    let amount = req.body.amount;
    db.collection('people').insert({
      name
    }, (err, insertres) => {
      if (err) console.log(err);
    })
    db.collection('logs').insert({
      name,
      amount
    }, (err, res) => {
      if (err) console.log(err);
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

app.post('/logs', function (req, res) {
  MongoClient.connect(url, (err, conn) => {
    const db = conn.db(dbName)
    db.collection('logs').insert(req.body, (err, insertres) => {
      if (err) console.log(err);
      res.send(insertres)
    })
  })

});

app.listen(4000, function () {
  console.log('Example app listening on port 4001');
});

app.set('view engine', 'hbs')
app.set('views', 'views')

function getLogs(callback) {
  MongoClient.connect(url, (err, conn) => {
    const db = conn.db(dbName)
    db.collection('logs').find().toArray((err, logs) => {
      callback(logs)
    })
  })

}