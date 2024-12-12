let personas = [
    { id: 1, nombre: "Andres", apellidos: "Banderas", identificacion: "7699" },
    { id: 2, nombre: "Jaime", apellidos: "Valencia", identificacion: "1234" },
    { id: 3, nombre: "Luis", apellidos: "Martínez", identificacion: "5678" },
    { id: 4, nombre: "Alma", apellidos: "Marcela", identificacion: "9101" },
    { id: 5, nombre: "Carlos", apellidos: "Gómez", identificacion: "2345" }
];

function mostrarFormulario() {
    const modal = new bootstrap.Modal(document.getElementById('modal'));  //new se usa para crear una instancia de un objeto - bootstrap.Modal y se usa para manejar los modales mediante JavaScript.
    document.getElementById("modal-titulo").textContent = "Nueva Persona";
    document.getElementById("id").value = ""; // el .value lo que hace es asignarle un valor, en este caso un string vacio (.value="")
    document.getElementById("nombres").value = ""; // limpia los campos
    document.getElementById("apellidos").value = "";
    document.getElementById("identificacion").value = "";
    modal.show(); // show(): Abre (muestra) el modal en la pantalla. hide(): Cierra el modal. esto viene de parte de el boostrap.modal
}
function prepararActualizar(id) {   //Modal actualizar 
    const persona = personas.find(p => p.id === id); //find Busca en el arreglo personas el objeto con el id que coincida.
    if (persona) {
        const modal = new bootstrap.Modal(document.getElementById('modal'));  
        document.getElementById("modal-titulo").textContent = "Actualizar Persona";
        document.getElementById("id").value = persona.id;
        document.getElementById("nombres").value = persona.nombre;  //Llena los campos del formulario con los datos de la persona seleccionada.
        document.getElementById("apellidos").value = persona.apellidos;
        document.getElementById("identificacion").value = persona.identificacion;
        modal.show(); // nos muestra toda la informacion anterior en los insputs de el modal de actualizar
    }
}

function guardarPersona(event) { //
    event.preventDefault();  // evita que se recargue la página al enviar el formulario
    const id = parseInt(document.getElementById("id").value, 10);
    const nombre = document.getElementById("nombres").value;
    const apellidos = document.getElementById("apellidos").value;
    const identificacion = document.getElementById("identificacion").value;

    if (id) {
        // Actualizar
        const persona = personas.find(p => p.id === id);
        if (persona) {
            persona.nombre = nombre;
            persona.apellidos = apellidos;
            persona.identificacion = identificacion;
        }
    } else {
        // Crear
        personas.push({
            id: personas.length ? personas[personas.length - 1].id + 1 : 1, // El operador ternario (?) es una forma compacta de escribir una estructura if-else
            nombre,
            apellidos,
            identificacion
        });
    }

    mostrarTabla();
    const modal = bootstrap.Modal.getInstance(document.getElementById('modal'));
    modal.hide(); // cierra el modal al momento de finalizar cualquiera de las 2 condiciones
}

function mostrarTabla() {
    const tabla = document.getElementById("TablaP");
    tabla.innerHTML = ""; // Limpia la tabla

    personas.forEach(persona => {    //(forEach)Por cada persona en el arreglo, creamos una nueva fila <tr> y agregamos celdas <td> con los datos de esa persona.
        
        const fila = document.createElement("tr");

        const columnaId = document.createElement("td");
        columnaId.textContent = persona.id;

        const columnaNombre = document.createElement("td");
        columnaNombre.textContent = persona.nombre;

        const columnaApellidos = document.createElement("td");
        columnaApellidos.textContent = persona.apellidos;

        const columnaIdentificacion = document.createElement("td");
        columnaIdentificacion.textContent = persona.identificacion;

        const columnaAcciones = document.createElement("td");

        const btnActualizar = document.createElement("button");  // boton actualizar C
        btnActualizar.textContent = "Actualizar";
        btnActualizar.className = "btn btn-warning btn-sm";
        btnActualizar.onclick = function () {
            prepararActualizar(persona.id);
        };

        const btnEliminar = document.createElement("button");  // boton borrar C
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn btn-danger btn-sm";
        btnEliminar.onclick = function () {
            eliminarPersona(persona.id);
        };
        // agregar botones a la columna acciones
        columnaAcciones.appendChild(btnActualizar);
        columnaAcciones.appendChild(btnEliminar);

        // agregar las columnas creadas 
        fila.appendChild(columnaId);
        fila.appendChild(columnaNombre);
        fila.appendChild(columnaApellidos);
        fila.appendChild(columnaIdentificacion);
        fila.appendChild(columnaAcciones);

        // agregar fila a la tabla
        tabla.appendChild(fila);
    });
}

function eliminarPersona(id) {
    personas = personas.filter(p => p.id !== id); // La función filter recorrerá el arreglo personas y creará un nuevo arreglo que solo contendrá las personas cuyo id no sea igual a 2.
    mostrarTabla();
}

// Inicializar la tabla al cargar la página
window.onload = mostrarTabla;
