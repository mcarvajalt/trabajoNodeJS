const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    nombre:{
        type : String,
        required: true
    },
    
    idCurso:{
        type : Number,
        required: true
    },
    
    descripcion:{
        type : String,
        required: true
    },
    
    valor: {
        type : Number,
        required: true
    },
    
    modalidad: {
        type : String
    },
    
   intensidadHoraria: {
    type : String,
    
    },
    
    estado: {
       type : String
    
    }
})

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso


