const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usuarioCursosSchema = new Schema({
    documentoDeIdentidad:{
        type : Number,
        required: true
    },
    nombreEstudiante:{
        type: String,
        require: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true
    },
    nombreCurso:{
        type: String,
        required: true
    }
})

const UsuarioCursos = mongoose.model('UsuarioCursos', usuarioCursosSchema);
module.exports = UsuarioCursos