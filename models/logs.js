var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mctrainee')

var logSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    }
})

// Buscara en la base de datos la coleccion con el nombre del recurso en plural(ingles)
module.exports = mongoose.model('log',logSchema)