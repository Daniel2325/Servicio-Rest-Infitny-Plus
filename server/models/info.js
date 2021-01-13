  
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
    hora: {
        type: String,
        required: [true, "La hora es oblgatorio"]
    }
})

module.exports = mongoose.model('Caja', informacion)