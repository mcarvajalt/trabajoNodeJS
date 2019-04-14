const fs = require ('fs');
const UsuarioCursos = require('../models/usuariosCursos');
const Usuario = require('../models/usuarios');
const Curso = require('../models/cursos');
listaCursosUsuarios = [];
listaCursos = [];

//listaCursosUsuarios = require ('./CursosUsuarios.json');
//listaCursos = require ('../cursos/cursos.json');
//////listaUsuarios = require('../usuarios/usuarios.json');

const crearUsuariosCursos = (documentoDeIdentidad, nombre, correo, telefono, nombreCurso) => {	
	let usuarioCursos = new UsuarioCursos({
		documentoDeIdentidad:documentoDeIdentidad,
		nombreEstudiante: nombre,
		correo: correo,
		telefono: telefono,
		nombreCurso: nombreCurso
	})
	console.log( usuarioCursos);
    Usuario.findOne({documentoDeIdentidad:documentoDeIdentidad}).exec((err,respuesta)=>{
		if(respuesta!= null){
			Curso.findOne({nombre:nombreCurso}).exec((err,respuestaCurso)=>{
                if(respuestaCurso!= null){
                    UsuarioCursos.findOne({documentoDeIdentidad:documentoDeIdentidad, nombreCurso:nombreCurso}).exec((err,respuestaUsuCur)=>{
                        if(respuestaUsuCur!= null){
                           console.log('Ya te esta inscrito en este curso el usuario');
                        }
                        else{
                            usuarioCursos.save((err, resultado)=>{
                                if(err){
                                    console.log('No se pudo guardar')
                                }
                                console.log('Se guardo exitosamente')
                                
                            });
                        }
                    });
                }
                else{
                    console.log('El Curso con el nombre insertado no se encuentra aun registrado');
                }
            });
		}
		else{
			console.log('El usuario con el documento insertado no se encuentra aun registrado');
		}
	})	
}   
const eliminar = (nom) =>{
    listar();
    let nombre = listaCursosUsuarios.find(id=> id.nombre == nom);
    let nuevo = listaCursosUsuarios.filter(nomb => nomb.nombre == nom);
    
    if(nuevo.length == listaCursosUsuarios.length){
        console.log("no tienes ningun curso con este nombre");
    }else{
        listaCursosUsuarios = nuevo
        console.log("se elimino con exito");
        guardar();
    }
}

const listar = () => {
	try{
        console.log("Cursos");
        listaCursosUsuarios = require('./CursosUsuarios.json');
		}
		catch(error){
			listaCursosUsuarios=[];
		}
}

const guardar = () => {
	let datos = JSON.stringify(listaCursosUsuarios);
	fs.writeFile('CursosUsuarios.json',datos,(err)=>{
		if (err) throw (err);
		console.log('Inscripcion exitosa');
	})
}

module.exports = {
    crearUsuariosCursos, 
    eliminar,
    listar
}