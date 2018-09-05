var inquirer = require('inquirer');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = "mctrainee";

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
                    preguntaPersonas(db,-1);
                    break;
                case "deposita":
                    preguntaPersonas(db,1);
                    break;
                default:
                    break;
            }
        });
}

function preguntaPersonas(db,multi) {
    db.collection('people').find().toArray((err,res)=>{
        inquirer
        .prompt([{
                type: "list",
                name: "name",
                message: "¿Para quien es la operacion?",
                choices: res.map(persona=>persona.name)
            },
            {
                type: "input",
                name: "amount",
                message: "Escribe la cantidad"
            }
        ])
        .then(answers => {
            //console.log(answers);
            db.collection('logs').insert({name:answers.name, amount:multi * answers.amount},(err,res)=>{
                console.log(res);
            })

        })
    })    
}

function calculaTotales(db) {
    let movimientos = {};
    db.collection('logs').find().toArray((err,res)=>{
        res.forEach(element => {
            let nombre = element.name
            let cantidad = element.amount;
            if (Object.keys(movimientos).includes(nombre)) {
                movimientos[nombre] += cantidad;
            } else {
                movimientos[nombre] = cantidad;
            }
        });
        console.log(movimientos);
    })

    
}

function retirarCantidad(persona, cantidad) {

}

function depositarCantidad(persona, cantidad) {

}