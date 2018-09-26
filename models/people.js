var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mctrainee')

var personSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    }
})

// Buscara en la base de datos la coleccion con el nombre del recurso en plural(ingles)
module.exports = mongoose.model('person',personSchema, "people")