var inquirer = require('inquirer');
var fs = require("fs");
let dataRegistros = fs.readFileSync("registro.txt").toString().split("\n");

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
                console.log(calculaTotales());
                break;
            case "retira":
                let totales= calculaTotales();
                preguntaPersonas(totales);
                break;
            case "deposita":
                console.log("depopsitaremo");
                break;
            default:
                break;
        }
    });
function preguntaPersonas(totales) {
    inquirer
    .prompt([
        {
            type: "list",
            name: "receptor",
            message: "¿Para quien es la operacion?",
            choices: Object.keys(totales),
        },
        {
            type:"input",
            name: "cantidad",
            message: "Escribe la cantidad"
        }
    ])
    .then(answers=>{
        //console.log(answers);
        let total=totales[answers.receptor]-answers.cantidad;
        console.log(total);

    })
}

function calculaTotales(params) {
    console.log("vamos a calcular");
    let movimientos = {};
    dataRegistros.forEach(element => {
        let linea = element.split(" ");
        let nombre = linea[0];
        let cantidad = Number.parseInt(linea[1]);
        if (element !== "") {
            if (Object.keys(movimientos).includes(nombre)) {
                movimientos[nombre] += cantidad;
            } else {
                movimientos[nombre] = cantidad;
            }
        }
    });
    return movimientos;
}
function retirarCantidad(persona, cantidad) {
    
}
function depositarCantidad(persona, cantidad) {
    
}