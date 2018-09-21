var inquirer = require('inquirer');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const request = require('request');

conectado();

function conectado(err, conn) {
     if (err) console.log(err)
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
                },
                {
                    name: "Salir",
                    value: "salir",
                    short: "Salir",
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
                    calculaTotales();
                    break;
                case "retira":
                    preguntaPersonas(-1);
                    break;
                case "deposita":
                    preguntaPersonas(1);
                    break;
                case "registra":
                    registraPersonas();
                    break;
                case "salir":
                    return false;
                break;
                default:
                    break;
            }
        });
}



function preguntaPersonas(multi) {
    request("http://localhost:4000/people",function(error, res,body){
            console.log(body);
            let people = JSON.parse(body);

            inquirer
            .prompt([{
                    type: "list",
                    name: "name",
                    message: "¿Para quien es la operacion?",
                    choices: people.map(people=>people.name)
                },
                {
                    type: "input",
                    name: "amount",
                    message: "Escribe la cantidad"
                }
            ])
            .then(answers => {
                console.log(answers)
                agregaRegistro(answers.name, answers.amount,multi)
            })
        }
    )}

function calculaTotales(db) {
    request("http://localhost:4000/logs",function(error, response,body){
            let movimientos = {};
            let logs = JSON.parse(body);
            console.log(logs.length);
            logs.forEach(element => {
                let nombre = element.name
                let cantidad = Number.parseInt(element.amount);
                if (Object.keys(movimientos).includes(nombre)) {
                    movimientos[nombre] += cantidad;
                } else {
                    movimientos[nombre] = cantidad;
                }
            });
            console.log(movimientos);
            conectado();

    })
}

function agregaRegistro(name, amount,multi) {
    request.post(
        'http://localhost:4000/logs',
         {json:{name, amount: amount * multi}},
         function(error, response, body){
            console.log(body);
            conectado();

        }
    );
}

function registraPersonas(){
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
        request.post(
            'http://localhost:4000/people',
             {json: answers},
             function(error, response, body){
                console.log(body);
                conectado();

            }
        );
    })    
}

