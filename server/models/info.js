  
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let informacion = new Schema({
    caja: {
        type: Number,
        required: [true, "El campo caja es obligatorio"]
    },
    fecha: {
        type: String,
        required: [true, "La fecha es obligatoria"]
    },
    anio: {
        type: String,
        required: [true, 'El anio es obligatorio']
    },
    mes: {
        type: String,
        required: [true, 'El mes es obligatorio']
    },
    dia: {
        type: String,
        required: [true, 'El dia es obligatorio'],
    hora: {
        type: String,
        required: [true, "La hora es oblgatorio"]
    }
})

module.exports = mongoose.model('Caja', informacion)