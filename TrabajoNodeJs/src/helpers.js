const hbs = require('hbs');
const Cursos = require('./models/cursos');

hbs.registerHelper('listarIncritosCurso',(listado)=>{
	let texto = `<form action="/eliminarCur" method="get">
	<table class="table table-striped table-hover">
	<thead class="thdead-dark">
	<th>Nombre Curso</th>
	<th>Cedula Estudiante</th>
	<th>Correo</th>
	</thead>
	<tbody>`;
console.log(listado)
listado.forEach((cursoEstudiante) =>{
		texto = texto +
		`<tr> 
		<td> ${cursoEstudiante.nombreCurso}</td>
		<td> ${cursoEstudiante.documentoDeIdentidad }</td>
		<td> ${cursoEstudiante.correo }</td>
		<td><input type="hidden" class="btn btn-danger" name="nombreCurso" value="${cursoEstudiante.nombreCurso}"></input></td>
		<td><button class="btn btn-danger" name="documentoDeIdentidad" value="${cursoEstudiante.documentoDeIdentidad}">Eliminar</button></td>`;
	});
	texto = texto + '</tr></tbody></table><form>'

	return texto;
});
hbs.registerHelper('listarIncritos',(listado)=>{
		let texto = `<form action="/eliminarCur" method="get">
		<table class="table table-striped table-hover">
		<thead class="thdead-dark">
		<th>Nombre Curso</th>
		<th>Cedula Estudiante</th>
		<th>Correo</th>
		</thead>
		<tbody>`;
	console.log(listado)
	listado.forEach((cursoEstudiante) =>{
			texto = texto +
			`<tr> 
			<td> ${cursoEstudiante.documentoDeIdentidad}</td>
			<td> ${cursoEstudiante.nombreCurso }</td>
			<td> ${cursoEstudiante.correo }</td>
			<td><input type="hidden" class="btn btn-danger" name="nombreCurso" value="${cursoEstudiante.nombreCurso}"></input></td>
			<td><button class="btn btn-danger" name="documentoDeIdentidad" value="${cursoEstudiante.documentoDeIdentidad}">Eliminar</button></td>`;
		});
		texto = texto + '</tr></tbody></table><form>'
	
		return texto;
});
hbs.registerHelper('crearUsuario',(documentoDeIdentidad, nombre,correo, telefono)=>{
	let texto = '';
		console.log(documentoDeIdentidad);
		console.log(nombre);
		console.log(correo);
		console.log(telefono);
		listaUsuarios = require('./usuarios/funcionesUsuario');
		listaUsuarios.crear(documentoDeIdentidad, nombre,correo,telefono);
})
hbs.registerHelper('crearCurso',(nombre, idCurso, descripcion, valor, modalidad, intensidadHoraria, estado)=>{
	console.log(nombre);
	console.log(idCurso);
	console.log(descripcion);
	console.log(valor);
	console.log(modalidad);
	console.log(intensidadHoraria);
	console.log(modalidad);
	console.log(intensidadHoraria);
	console.log(estado);
	
	listaCursos = require('./cursos/funcionesCurso');
	listaCursos.crearCurso(nombre, idCurso, descripcion, valor, modalidad, intensidadHoraria, estado);
})
hbs.registerHelper('inscribir',(documento, nombre, correo,telefono ,nombreCurso)=>{
		listaUsuariosCursos = require('./usuariosCursos/funcionesUsuariosCursos');
		listaUsuariosCursos.crearUsuariosCursos(documento, nombre, correo, telefono, nombreCurso);
})

hbs.registerHelper('listarCursos',(listado)=>{
	let texto = ` <form action="/infoCurso" method="get">
		<table class="table table-striped table-hover">
		<thead class="thdead-dark">
		<th>Nombre de curso</th>
		<th>Decripcion</th>
		<th>Estado</th>
		<th>Valor</th>
		</thead>
		<tbody>`;
		listado.forEach(cursos =>{
			texto = texto +
			`<tr>
			<td>${cursos.nombre} </td>
			<td>${cursos.descripcion}</td>
			<td>${cursos.estado}</td>
			<td>${cursos.valor}</td>
			<td><button class="btn btn-success" name="nombreCurso" value="${cursos.nombre}">Usuarios en el Curso</button></td>
			<td>
				<form action="/modificar" method="get">
					<button class="btn btn-primary" name="nombre" value="${cursos.nombre}">Modificar</button>
				</form>
			</td>
			</tr>`;
		})
		texto = texto + '</tbody></table></form>'
		return texto;
})
hbs.registerHelper('infoCurso',(listado)=>{
	let texto = ` <form action="/" method="post">
		<table class="table table-striped table-hover">
		<thead class="thdead-dark">
		<th>Nombre de curso</th>
		<th>Decripcion</th>
		<th>Modalida</th>
		<th>Intensidad Horaria</th>
		<th>Valor Curso</th>
		</thead>
		<tbody>`;
		listado.forEach(cursos =>{
			texto = texto +
			`<tr>
			<td>${cursos.nombre} </td>
			<td>${cursos.descripcion}</td>
			<td>${cursos.modalidad}</td>
			<td>${cursos.intensidadHoraria}</td>
			<td>${cursos.valor}</td>
			</tr>`;
		})
		texto = texto + '</tbody></table></form>'
		return texto;
})
hbs.registerHelper('modificarCursos',(listado)=>{
	let texto = `<form action="/modificarCurso" method="get">
    <p>Datos Actuales curso</p>`;
		listado.forEach(cursos =>{
			texto = texto +
			`<tr>
				<td>Codigo del Curso: ${cursos.idCurso}</td>
				<td>Nombre del Curso: ${cursos.nombre}</td>
				<td> Estado del Curso: ${cursos.estado}</td>
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="mod">Nuevo Estado</label>
						<input type="text" name="estado" id="estado" value="${cursos.estado}">
						<button class="btn btn-primary" name="nombre" value="${cursos.nombre}">Modificar</button>
				</div>
			</div>
			</tr>`;
		})
		texto = texto + '</tbody></table></form>'
		return texto;
})
hbs.registerHelper('listarCursosAbiertos',(listado)=>{
	let texto = ` <form action="/infoUnCurso" method="get">
		<table class="table table-striped table-hover">
		<thead class="thdead-dark">
		<th>Nombre de curso</th>
		<th>Decripcion</th>
		<th>Valor</th>
		</thead>
		<tbody>`;
		listado.forEach(cursos =>{
			texto = texto +
			`<tr>
			<td>${cursos.nombre} </td>
			<td>${cursos.descripcion}</td>
			<td>${cursos.valor}</td>
			<td><button class="btn btn-success" name="nombre" value="${cursos.nombre}">Mas informacion</button>
			</tr>`;
		})
		texto = texto + '</tbody></table></form>'
		return texto;
})

hbs.registerHelper('verUsuarios',(listado)=>{
	let texto = ` <form action="/eliminar" method="get">
		<table class="table table-striped table-hover">
		<thead class="thdead-dark">
		<th>Nombre Estudiante</th>
		<th>Nombre Curso</th>
		</thead>
		<tbody>`;
		listado.forEach(usuario =>{
			texto = texto +
			`<tr>
			<td>${usuario.documentoDeIdentidad} </td>
			<td>${usuario.nombre}</td>
			<td>${usuario.correo}</td>
			<td>${usuario.telefono}</td>
			<td>${usuario.rol}</td>
			<td><button class="btn btn-danger" name="documentoDeIdentidad" value="${usuario.documentoDeIdentidad}">Eliminar</button>
			</tr>`;
		})
		texto = texto + '</tbody></table></form>'
		return texto;
})

