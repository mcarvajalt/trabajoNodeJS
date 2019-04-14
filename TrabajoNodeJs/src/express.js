const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Usuario = require('./models/usuarios');
const Cursos = require('./models/cursos');
const UsuarioCursos = require('./models/usuariosCursos');
require('./helpers');
const directoriopublico = path.join(__dirname,'../public' );
const directoriopartials = path.join(__dirname,'../templates/partials' );
app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);

app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine','hbs');

path.join(__dirname,'../public' );
app.get('/',(req,res)=>{
	//console.log(req.query);
	res.render('index',{
		estudiante: req.body.nombre,
		nota1:parseInt(req.body.nota1),
		nota2:parseInt(req.body.nota2)
	});
});
app.post('/calculos',(req,res)=>{
	//console.log(req.query);
	res.render('calculos',{
		estudiante: req.body.nombre,
		nota1:parseInt(req.body.nota1),
		nota2:parseInt(req.body.nota2)
	});
});
app.get('/login',(req,res)=>{
	Usuario.findOne({documentoDeIdentidad: req.query.documentoDeIdentidad}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		if(respuesta  != null){
			if(respuesta.rol == 'administrador'){
				Cursos.find({}).exec((erro,respuestaCurso)=>{
					res.render('verCursos',{
						listado: respuestaCurso
					});
				});
			}else{
				Cursos.find({estado:'disponibles'}).exec((erro,respuestaCurso)=>{
					res.render('verCursosAbiertos',{
						listado: respuestaCurso
					});
				});	
			}
			
		}else{
			res.render('login');
		}
		
	});
})
app.get('/crearUsuario',(req,res)=>{
	console.log(req.query);
	res.render('crearUsuario',{
		documentoDeIdentidad: req.query.documentoDeIdentidad,
		nombre: req.query.nombre,
		correo: req.query.correo,
		telefono: req.query.telefono,
	});
})
app.get('/crearCurso',(req,res)=>{
	console.log(req.query);
	/*res.render('crearCurso',{
		nombre: req.query.nombre,
		idCurso: req.query.idCurso,
		descripcion: req.query.descripcion,
		valor: req.query.valor,
		modalidad: req.query.modalidad,
		intensidadHoraria: req.query.intensidadHoraria,
		estado: req.query.estado
	});*/

	let curso = new Cursos({
		nombre: req.query.nombre,
		idCurso: req.query.idCurso,
		descripcion: req.query.descripcion,
		valor: req.query.valor,
		modalidad: req.query.modalidad,
		intensidadHoraria: req.query.intensidadHoraria,
		estado: 'disponible'
	})
	Cursos.findOne({idCurso:req.query.idCurso}).exec((err,respuesta)=>{
		if(respuesta!= null){
			res.render('crearCurso', {
				titulo: "Error Ya existe Este curso",
			})
		}
		else{
			curso.save((err, resultado)=>{
				if(err){
					res.render('crearCurso', {
						titulo: "Error No se pudo guardar",
					})
				}else{
					Cursos.find({}).exec((err,respuestaCur)=>{
						res.render('verCursos', {
							listado: respuestaCur
						})
					})
				}
				console.log('Se guardo exitosamente')
			});	
		}
	})
})

app.get('/inscribir',(req,res)=>{
	console.log(req.query);
	res.render('inscribir',{
		documentoDeIdentidad: req.query.documentoDeIdentidad,
		nombre: req.query.nombre,
		correo: req.query.correo,
		telefono: req.query.telefono,
		nombreCurso: req.query.nombreCurso
	});
})
app.get('/verUsuarios',(req, res)=>{
	Usuario.find({}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('verUsuarios',{
			listado: respuesta
		});
	})
})
app.get('/Vercursos',(req,res)=>{
	Cursos.find({}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('verCursos',{
			listado: respuesta
		});
	})
})
app.get('/verCursosAbiertos',(req,res)=>{
	Cursos.find({estado:'disponibles'}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('verCursosAbiertos',{
			listado: respuesta
		});
	})
})
app.get('/infoUnCurso',(req,res)=>{
	Cursos.find({nombre: req.query.nombre}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('infoUnCurso',{
			listado: respuesta
		});
	})
})
app.get('/verInscritosCursos',(req,res)=>{
	UsuarioCursos.find({}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('verInscritosCursos',{
			listado: respuesta
		});
	})
})
app.get('/eliminar',(req,res)=>{
	Usuario.findOneAndDelete({documentoDeIdentidad:req.query.documentoDeIdentidad}, req.body).exec((err, resultados)=>{
		Usuario.find({}).exec((err,respuesta)=>{
			if(err){
				return console.log(err)
			}
			res.render('verUsuarios',{
				listado :respuesta
			})
		})
	})
})
app.get('/modificar',(req,res)=>{
	Usuario.findOneAndUpdate({nombreCurso:req.query.documentoDeIdentidad}, req.body).exec((err, resultados)=>{
		Usuario.find({}).exec((err,respuesta)=>{
			if(err){
				return console.log(err)
			}
			res.render('modificar')
		})
	})
})
app.get('/eliminarCurEs',(req,res)=>{
	UsuarioCursos.findOneAndDelete({documentoDeIdentidad:req.query.documentoDeIdentidad,nombreCurso: req.query.nombreCurso}, req.body).exec((err, resultados)=>{
		UsuarioCursos.find({}).exec((err,respuesta)=>{
			if(err){
				return console.log(err)
			}
			res.render('verInscritos',{
				listado:respuesta
			})
		})
	})
})
app.get('/eliminar',(req,res)=>{
	Usuario.findOneAndDelete({documentoDeIdentidad:req.query.documentoDeIdentidad}, req.body).exec((err, resultados)=>{
		Usuario.find({}).exec((err,respuesta)=>{
			if(err){
				return console.log(err)
			}
			res.render('verUsuarios',{
				listado :respuesta
			})
		})
	})
})

app.get('/verInscritos',(req,res)=>{
	UsuarioCursos.find({documentoDeIdentidad :req.query.documentoDeIdentidad}).exec((err,respuesta)=>{
		if(err){
			return console.log(err)
		}
		res.render('verInscritos',{
			listado: respuesta
		});
	})
})

app.get('*',(req,res)=>{
	res.render('error',{
		estudiante :'error'
	})
})

app.post('/',(req,res)=>{
	console.log( req.body.documentoDeIdentidad);
	console.log( req.body.nombre);
	console.log( req.body.correo);
	console.log( req.body.telefono);
	console.log( req.body.rol);
	let usuario = new Usuario({
		documentoDeIdentidad: req.body.documentoDeIdentidad,
		nombre: req.body.nombre,
		correo: req.body.correo,
		telefono: req.body.telefono,
		rol: req.body.rol
	})
	console.log( usuario);
	usuario.save((err, resultado)=>{
		if(err){
			res.render('verInscritos', {
				titulo: "Error 404",
				mostrar: err
			})
		}
		res.render('verInscritos',{
			mostrar: resultado

		})
		
	});
})
mongoose.connect('mongodb://localhost:27017/univercidad', {useNewUrlParser: true},(err, resultado) =>{
	if(err){
		return console.log(error)
	}
	console.log("Conectado")
});
//app.use(express.static(__dirname + '/public'))
console.log(__dirname);
app.listen(4000,()=>{
	console.log('escucha por el puerto');
});
