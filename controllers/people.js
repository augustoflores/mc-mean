let personModel=require("../models/people")


function getPeoples (req, res) {
    personModel.find((err,people)=>{
        if (err) console.log(err)
        console.log(people)
        res.send(people)
    })
  }

  function insertPerson(req, res) {
    let newPerson = new personModel(req.body)
    newPerson.save((err,insertres)=>{
        if(err) console.log(err)
        res.send(insertres)
    });

  }

module.exports = {
    getPeoples,
    insertPerson
}