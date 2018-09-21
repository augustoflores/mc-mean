var inquirer = require('inquirer');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = "mctrainee";
const request = require('request');

MongoClient.connect(url, conectado);

function conectado(err, conn) {

    if (err) console.log(err)

    const db = conn.db(dbName)

    //var fs = require("fs");
    //let dataRegistros = fs.readFileSync("registro.txt").toString().split("\n");

    let primerapregunta = [
        /* Pass your questions in here */
        {
            "type": "list",
            "name": "accion",
            "message": "¿Que acción quieres hacer?",
            "choices": [{
                    name: "Consultar",
                    value: "consulta",
                    short: "Consultar"
                },
                {
                    name: "Retirar",
                    value: "retira",
                    short: "Retirar",
                },
                {
                    name: "Depositar",
                    value: "deposita",
                    short: "Depositar",
                },
                {
                    name: "Registrar",
                    value: "registra",
                    short: "Registrar",
                }
                
            ]
        }
    ];

    inquirer
        .prompt(primerapregunta)
        .then(answers => {
            // Use user feedback for... whatever!!
            switch (answers.accion) {
                case "consulta":
                    calculaTotales(db);
                    break;
                case "retira":
                    preguntaPersonas();
                    break;
                case "deposita":
                    preguntaPersonas();
                    break;
                case "registra":
                    registraPersonas(db);
                    break;
                default:
                    break;
            }
        });
}

function preguntaPersonas() {
    request("http://localhost:4000/people",function(error, response,body){
            console.log(body)
        }
    )

    // db.collection('people').find().toArray((err,res)=>{
    //     inquirer
    //     .prompt([{
    //             type: "list",
    //             name: "name",
    //             message: "¿Para quien es la operacion?",
    //             choices: res.map(persona=>persona.name)
    //         },
    //         {
    //             type: "input",
    //             name: "amount",
    //             message: "Escribe la cantidad"
    //         }
    //     ])
    //     .then(answers => {
    //         //console.log(answers);
    //         db.collection('logs').insert({name:answers.name, amount:multi * answers.amount},(err,res)=>{
    //             console.log(res);
    //         })

    //     })
    // })    
}

function calculaTotales(db) {
    request("http://localhost:4000/people",function(error, response,body){
            let movimientos = {};
            console.log(body);
            // body.forEach(element => {
            //     let nombre = element.name
            //     let cantidad = element.amount;
            //     if (Object.keys(movimientos).includes(nombre)) {
            //         movimientos[nombre] += cantidad;
            //     } else {
            //         movimientos[nombre] = cantidad;
            //     }
            // });
            console.log(movimientos);
    })
}

function retirarCantidad(persona, cantidad) {

}

function depositarCantidad(persona, cantidad) {

}

function registraPersonas(db){
    inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "Escribe el nombre de la persona"
        },
        {
            type: "input",
            name: "amount",
            message: "Escribe la cantidad inicial"
        },
    ])
    .then(answers => {
        //console.log(answers);
        db.collection('people').insert({name:answers.name},(err,res)=>{
            if (err) console.log(err);
        })        
        db.collection('logs').insert({name:answers.name, amount:answers.amount},(err,res)=>{
            if (err) console.log(err);
        })

    })    

}