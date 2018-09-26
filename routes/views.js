
var router = require("express").Router();
let logModel=require("../models/logs")
let peopleModel=require("../models/people")


router.get('/', function (req, res) {
    res.render('index');
  });
  router.get('/consultar', function (req, res) {
    logModel.find((err,logs)=>{
        if (err) console.log(err)
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

    })
    // MongoClient.connect(url, (err, conn) => {
    //     const db = conn.db(dbName)
    //     db.collection('logs').find().toArray((err, logs) => {
    //         let users = [];
    //         logs.forEach(log => {
    //           let nombre = log.name
    //           let cantidad = Number.parseInt(log.amount);
    //           let index = users.findIndex(u => u.name === log.name);
    //           if (index >= 0) {
    //             users[index].amount += cantidad
    //           } else {
    //             users.push(log);
    //           }
    //         });
        
    //         res.render('consultar', {
    //           users
    //         });
    //     })
    //   })  
  });
  router.get('/retirar', function (req, res) {
    peopleModel.find(function (err, people) {
      if(err) console.log(err); 
      res.render('retirar',{people});
    })
  });
  router.get('/depositar', function (req, res) {
    peopleModel.find(function (err, people) {
      if(err) console.log(err); 
      res.render('depositar',{people});
    })  });
  router.get('/registrar', function (req, res) {
    res.render('registrar');
  });

module.exports= router;