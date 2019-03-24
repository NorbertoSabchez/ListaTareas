document.getElementById('formTarea').addEventListener('submit', salvar);

function salvar(e){

	let nombre = document.getElementById('nTarea').value;
	let descrip = document.getElementById('descrip').value;
	const tarea = {
		nombre,
		descrip
	};
	if (localStorage.getItem('tareas') === null) {
		let tareas = [];
		tareas.push(tarea);
		localStorage.setItem('tareas', JSON.stringify(tareas));
	}else{
		let tareas = JSON.parse(localStorage.getItem('tareas'));
		tareas.push(tarea);
		localStorage.setItem('tareas', JSON.stringify(tareas));
	}
	cargar();
	document.getElementById('formTarea').reset();
	e.preventDefault();
}

function cargar (){
	let tareas = JSON.parse(localStorage.getItem('tareas'));
	let vistaTarea = document.getElementById('tar');

	vistaTarea.innerHTML = '';

	for (let i = 0; i < tareas.length; i++) {
		let titulo = tareas[i].nombre;
		let des = tareas[i].descrip;

		vistaTarea.innerHTML += `<div class="card mb-3"> 
		<div class="card-body">
		<p>${titulo} - ${des}</p>
		 <a class="btn btn-danger" onclick="borrar('${titulo}')">Borrar</a>
		 </div> 
		 </div>`
	}
}

function borrar(nombre){
	let tareas = JSON.parse(localStorage.getItem('tareas'));

	for (let i = 0; i < tareas.length; i++) {
		if (tareas[i].nombre == nombre) {
			tareas.splice(i, 1);
		}
	}
	localStorage.setItem('tareas', JSON.stringify(tareas));
	cargar();
}

cargar();