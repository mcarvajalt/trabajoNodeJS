const fs = require ('fs');
const Curso = require('../models/cursos');
listaCursos = [];

const crearCurso = (nombre, idCurso, descripcion, valor, modalidad, intensidadHoraria, estado ) => {
	let curso = new Curso({
		nombre: nombre,
		idCurso: idCurso,
		descripcion: descripcion,
		valor: valor,
		modalidad: modalidad,
		intensidadHoraria: intensidadHoraria,
		estado: 'disponible'
	})
	Curso.findOne({idCurso:idCurso}).exec((err,respuesta)=>{
		if(respuesta!= null){
			return console.log('Noooooo se puede insertar')
		}
		else{
			curso.save((err, resultado)=>{
				if(err){
					console.log('No se pudo guardar')
				}
				console.log('Se guardo exitosamente')
				
			});	
		}
	})
}

const listarCurso = () => {

	Curso.find({}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}

			return respuesta;
		})
}

const guardarCurso = () => {
	let datos = JSON.stringify(listaCursos);
	fs.writeFile('src/cursos/cursos.json',datos,(err)=>{
		if (err) throw (err);
		console.log('curso creado con exito');
	})
}

let buscarCurso = (id) => {
	return cursos.find( (curso) => curso.id === id);
}

module.exports = {
	crearCurso,listarCurso,guardarCurso
}