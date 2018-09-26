let logModel=require("../models/logs")

function getLogs (req, res) {
    logModel.find((err,logs)=>{
        if (err) console.log(err)
        console.log(logs)
        res.send(logs)
    })
    // MongoClient.connect(url, (err, conn) => {
    //   const db = conn.db(dbName)
    //   db.collection('logs').find().toArray((err, logs) => {
    //     res.send(logs)
    //   })
    // })
}

function insertLog (req, res) {
    let newLog = new logModel(req.body)
    newLog.save((err,insertres)=>{
        if(err) console.log(err)
        res.send(insertres)
    });
    // MongoClient.connect(url, (err, conn) => {
    //   const db = conn.db(dbName)
    //   db.collection('logs').insert(req.body, (err, insertres) => {
    //     if (err) console.log(err);
    //     res.send(insertres)
    //   })
    // })
  
  }

  module.exports = {
      getLogs,
      insertLog
  }