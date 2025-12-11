const seccionSidebar = document.getElementById('botones-proyectos')
const botonAgregarProyecto = document.getElementById('nuevo-proyecto')
const seccionTitulo = document.getElementById('titulo-proyecto')
const tituloProyecto = document.getElementById('titulo')
const pantallaSeccionesProyectos = document.getElementById('secciones-proyectos')
const seccionBotonesAD = document.getElementById('seccionBtnA-D')
const mensajeVacio = document.getElementById('aviso')

const modal = document.getElementById("modal");
const picker = document.getElementById("colorPicker");
const confirmar = document.getElementById("confirmar");
const omitir = document.getElementById('omitir')

//PARA GUARDAR TODO LO RELATIVO A LAS SECCIONES
let seccionesPredeterminadas = []
let seccion
let contenedorReal 
let contenedorTarjetasReal
let color
let nombreSeccion

//RELATIVAS A RELACIONAR PROYECTOS CON SUS RESPECTIVAS SECCIONES
let seccionesProyectos = []
let proyectos = []
let botonesProyectos = []

//RELATIVAS AL USO DE LOS BOTONES
let identificadorBoton
let botonAccionado

//FUNCION AGREGAR TARJETA
let nuevaTarjeta
let textoTarjeta 
let contenedorTarjetas
let contenedorBotones
let mensajeAgregarTarjeta 
let botonEditar
let botonMover 
let botonEliminar 
let contadorTarjetas = 0

//FUNCION AGREGAR PROYECTO
let proyectoNuevo
let botonProyectoNuevo
let nombreProyecto //con esta tambien se accede al proyecto en mostrar proyecto
let identificadorProyecto
let contadorProyectos = 0

//FUNCION AGREGAR SECCION
let nuevaSeccion
let identificadorSeccion

//let mostrarSeccion
let seccionesActuales
//FUNCION EDITAR Y MOVER
let tarjeta
let contenedor
let contNombreProyecto
let botonEditado

//CONTIENE LA SECCION SOBRE LA QUE SE TRABAJA AL EJECUTAR UN BOTON EN CASO DE SER NECESARIO
let contenedorSeccion
let idProyecto 
let contenedorProyecto

class Seccion {
    constructor (nombre, id) {
        this.nombre = nombre
        this.id = id
    }
}

let planning = new Seccion ('Planning', 'Planning')
let inProgress = new Seccion ('In Progress', 'InProgress')
let done = new Seccion ('Done', 'Done')

seccionesPredeterminadas.push(planning, inProgress, done)

class Proyecto {
    constructor (nombre, id) {
        this.nombre = nombre
        this.id = id
    }
}

class BProyectos {
    constructor (nombre, className, id) {
        this.nombre = nombre
        this.className = className
        this.id = id
    }
}

function iniciarPagina() {

    seccionTitulo.style.display = 'none'
    
    seccionBotonesAD.style.display = 'none'    

    botonAgregarProyecto.addEventListener('click', agregarProyecto)

    mensajeVacio.innerHTML = 'Aún no se han agregado proyectos'

}

async function agregarProyecto() {

    const {value: nombre} = await Swal.fire({
        title: "Ingrese el nombre del proyecto: ",
        input: "text",
        inputPlaceholder: "Ej: Planning",
        inputValidator: (value) => {
            if (!value.trim()) {
                return "Debes escribir un nombre";
            }
        },
        showCancelButton: true
    });

    if (!nombre) return;

    nombreProyecto = nombre    


    mensajeVacio.style.display = 'none'
    seccionTitulo.style.display = 'flex'
    seccionBotonesAD.style.display = 'flex'    


    botonProyectoNuevo = document.createElement('button')

    botonProyectoNuevo.textContent = nombreProyecto
    tituloProyecto.innerHTML = nombreProyecto
    botonProyectoNuevo.className = 'BProyectos'
    botonProyectoNuevo.id = 'btn-proyecto-' + contadorProyectos
    seccionSidebar.appendChild(botonProyectoNuevo)

    proyectoNuevo = document.createElement('div')
    proyectoNuevo.className = 'proyectos'

    identificadorProyecto = nombreProyecto.replace(/\s+/g, '-') + contadorProyectos
    proyectoNuevo.id = identificadorProyecto
    pantallaSeccionesProyectos.appendChild(proyectoNuevo)

    let seccionesIndependientes = []

    seccionesPredeterminadas.forEach((seccion) => {
        contenedorSeccion = 
        `
        <div class = 'secciones ${seccion.id}' id = '${seccion.id}-${contadorProyectos}'>
            <div class = 'nombre-seccion'>
                <h3 class = 'encabezado'>${seccion.nombre}</h3>
                <button class = 'AggTarj' id = 'agregar${seccion.id}-${contadorProyectos}' >+</button>
            </div>

            <div class = 'contenedor-tarjetas' id = 'tarjetas-${seccion.id}-${contadorProyectos}'> 
                
            </div>
        </div>
        `
        proyectoNuevo.innerHTML += contenedorSeccion

        contenedorReal = document.getElementById(`${seccion.id}-${contadorProyectos}`)
        contenedorTarjetasReal = document.getElementById(`tarjetas-${seccion.id}-${contadorProyectos}`)
        
        seccionesIndependientes.push({
            id: seccion.id,
            contenedor: contenedorReal,
            tarjetas: contenedorTarjetasReal
        })

        
    });

    seccionesProyectos.push(seccionesIndependientes)

    let proyecto = new Proyecto (nombreProyecto, identificadorProyecto)
    proyectos.push(proyecto)

    let boton = new BProyectos (nombreProyecto, 'BProyectos', 'btn-proyecto-'+contadorProyectos)
    botonesProyectos.push(boton)

    console.log(proyectos, seccionesProyectos, botonesProyectos)
    contadorProyectos ++ 

    document.querySelectorAll('.proyectos').forEach(div => {
        div.style.display = 'none'
    })
        
    seccionesActuales = seccionesIndependientes
    proyectoNuevo.style.display = 'flex'

        
}

function mostrarProyecto(botonAccionado) {
    
    for (let i = 0; i < botonesProyectos.length; i++) {
        
        if (botonesProyectos[i].id === botonAccionado) {
            seccionesActuales = seccionesProyectos[i]
            nombreProyecto = proyectos[i].nombre
            contenedorProyecto = document.getElementById(proyectos[i].id)
                
            document.querySelectorAll('.proyectos').forEach(div => {
                div.style.display = 'none'
            })
            
            seccionBotonesAD.style.display = 'flex'
            contenedorProyecto.style.display = 'flex'
            tituloProyecto.innerHTML = nombreProyecto
            seccionTitulo.style.display = 'flex'
            mensajeVacio.style.display = 'none'
    
        }
    }
}

async function editarNombreProyecto(boton) {
    
    contenedor = boton.closest('.encabezado')
    contNombreProyecto = contenedor.querySelector('h2')

    const { value: nuevoNombre } = await Swal.fire({
        title: "Editar nombre del proyecto",
        input: "text",
        inputValue: nombreProyecto,
        inputPlaceholder: "Nuevo nombre...",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
            if (!value.trim()) {
                return "El nombre no puede estar vacío";
            }
        }
    });

    if (!nuevoNombre) return;
    contNombreProyecto.textContent = nuevoNombre;


    for (let i = 0; i < proyectos.length; i++) {
        if (proyectos[i].nombre === nombreProyecto) {
            proyectos[i].nombre = nuevoNombre
            
            botonEditado = document.getElementById(botonesProyectos[i].id)
            botonesProyectos[i].nombre = nuevoNombre
            botonEditado.textContent = nuevoNombre
        }
    }

    nombreProyecto = nuevoNombre

    console.log(proyectos,seccionesProyectos)
}

function eliminarProyecto() {
    proyectos.forEach(proyecto => {
        if (proyecto.nombre === nombreProyecto) {
            let indDel = proyectos.indexOf(proyecto)

            Swal.fire({
                title: "¿Eliminar proyecto?",
                html: `
                    <b>${nombreProyecto}</b><br>
                    Esta acción eliminará el proyecto con todas sus secciones y tareas.
                `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            
            }).then(result => {
    
                    if (!result.isConfirmed) return;  // ← ESTA ES LA CORRECCIÓN

                    document.getElementById(botonesProyectos[indDel].id).remove()
                   
                    let contProyectoDOM = document.getElementById(proyectos[indDel].id);
                    if (contProyectoDOM) contProyectoDOM.remove();
                    // Opcional pero recomendado: ocultar el contenedor del título
                    seccionTitulo.style.display = 'none';

                    tituloProyecto.textContent = '';

                    seccionBotonesAD.style.display = 'none'

                    proyectos.splice(indDel, 1)
                    seccionesProyectos.splice(indDel, 1)
                    botonesProyectos.splice(indDel, 1)

                                        
                    if (proyectos.length > 0) {
                        mensajeVacio.innerHTML = 'Escoge un proyecto'
                    } else {
                        mensajeVacio.innerHTML = 'Aún no se han agregado proyectos'
                    }
                    
                    mensajeVacio.style.display = 'block';

                });

            
        }
    });
}

async function agregarTarjeta(identificadorBoton) {

    const {value: nombre} = await Swal.fire({
        title: "Ingrese la tarea: ",
        input: "text",
        inputPlaceholder: "Ej: Planning",
        inputValidator: (value) => {
            if (!value.trim()) {
                return "No puedes agregar tareas vacías";
            }
        },
        showCancelButton: true
    });

    if (!nombre) return;

    botonAccionado = document.getElementById(identificadorBoton)
    seccion = botonAccionado.closest('div[id]')
    
    contenedorTarjetas = seccion.querySelector("[id^='tarjetas-']");

    nuevaTarjeta = document.createElement('div')
    nuevaTarjeta.className = 'tarjetas'
    
    textoTarjeta = document.createElement('p')
    textoTarjeta.contentEditable = false
    mensajeAgregarTarjeta = nombre
    

    contenedorBotones = document.createElement('div')
    contenedorBotones.className = 'botones'
    

    botonEditar = document.createElement('button')
    botonEditar.textContent = '✏️'
    botonEditar.className = 'BAccion'
    botonEditar.dataset.tooltip = "Editar"

    botonMover = document.createElement('button')
    botonMover.textContent = '🔄️'
    botonMover.className = 'BAccion'
    botonMover.dataset.tooltip = "Mover"

    botonEliminar = document.createElement('button')
    botonEliminar.textContent = '🗑️'
    botonEliminar.className = 'BAccion'
    botonEliminar.dataset.tooltip = "Eliminar"


    contenedorTarjetas.appendChild(nuevaTarjeta)
    contenedorBotones.append(botonMover, botonEditar, botonEliminar)
    nuevaTarjeta.append(textoTarjeta, contenedorBotones)
    textoTarjeta.innerHTML = mensajeAgregarTarjeta

}

function eliminarTarjeta(boton) {
    tarjeta = boton.closest('.tarjetas')
    Swal.fire({
        title: "¿Eliminar tarea?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
    
    }).then(result => {

            if (!result.isConfirmed) return;  // ← ESTA ES LA CORRECCIÓN

                tarjeta.remove()
    })
    
   
}

async function editarTarjeta(boton) {
    tarjeta = boton.closest('.tarjetas')
    textoTarjeta = tarjeta.querySelector('p')

    const { value: nuevoTexto } = await Swal.fire({
        title: "Editar tarea",
        input: "text",
        inputValue: textoTarjeta.textContent,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
            if (!value.trim()) {
                return "El nombre no puede estar vacío";
            }
        }
    });

    if (!nuevoTexto) return;
    textoTarjeta.textContent = nuevoTexto;

}

function moverTarjeta(boton) {
    tarjeta = boton.closest('.tarjetas')
    seccion = boton.closest('.contenedor-tarjetas')
    let idSeccionActual = seccion.id
    
    let opcionesSecciones = seccionesActuales.map ( (sec) => {
        return {
            id: sec.tarjetas.id,
            nombre: sec.contenedor.querySelector('.encabezado').textContent
        }
    })
    

    let opciones = {}
    opcionesSecciones.forEach( sec => {
        let idTarjetas = sec.id

        if (idTarjetas !== idSeccionActual) {
            opciones[idTarjetas] = sec.nombre
        }
    })

    Swal.fire({
        title: "Mover tarjeta",
        input: "select",
        inputOptions: opciones,
        inputPlaceholder: "Selecciona la sección destino",
        showCancelButton: true,
        confirmButtonText: "Mover",
        cancelButtonText: "Cancelar"
    }).then (result => {
        if(!result.isConfirmed) return

        const idDestino = result.value
        const contenedorDestino = document.getElementById(idDestino)

        // if (!contenedorDestino) {
        //     console.error('No se encontró el contenedor destino: ', idDestino)
        // }

        contenedorDestino.appendChild(tarjeta)

    })

}

async function agregarSecciones() {
    const { value: form } = await Swal.fire({
        title: "Agrega un nombre a tu sección",
        html: `
            <input id="nombreSeccion" class="swal2-input" placeholder="Ej.: Pendiente">
            <br><br>
            <label>Elige un color para tu sección:</label>
            <input id="colorSeccion" type="color" style="width: 120px; height: 40px;">
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            const nombre = document.getElementById("nombreSeccion").value.trim();
            const color = document.getElementById("colorSeccion").value;

            if (!nombre) {
            Swal.showValidationMessage("Debes escribir un nombre");
            return false;
            }

            return { nombre, color };
        }
        });

        if (form) {
            nombreSeccion = form.nombre;
            color = form.color;
        } else {
            return
        }
    
    nuevaSeccion = nombreSeccion.replace(/ /g, "");  

    for (let i = 0; i < proyectos.length; i++) {
        if (proyectos[i].nombre === nombreProyecto) {
            identificadorSeccion = nuevaSeccion + '-' + i

            contenedorSeccion = 
                `
                <div class = 'secciones ${nuevaSeccion}' id = '${identificadorSeccion}'>
                    <div class = 'nombre-seccion'>
                        <h3 class = 'encabezado'>${nombreSeccion}</h3>
                        <button class = 'AggTarj' id = 'agregar${identificadorSeccion}' >+</button>
                    </div>

                    <div class = 'contenedor-tarjetas' id = 'tarjetas-${identificadorSeccion}'> 
                        
                    </div>
                </div>
                `

            document.getElementById(proyectos[i].id).innerHTML += contenedorSeccion
            
            contenedorReal = document.getElementById(identificadorSeccion)
            contenedorTarjetasReal = document.getElementById(`tarjetas-${identificadorSeccion}`)
    
            seccionesProyectos[i].push({
                id: identificadorSeccion,
                contenedor: contenedorReal,
                tarjetas: contenedorTarjetasReal
            })

            contenedorReal.style.background = color;
            
        }
    }
        
}

async function eliminarSecciones() {

    let listaSecciones = seccionesActuales.map(sec => ({
        id: sec.contenedor.id,
        nombre: sec.contenedor.querySelector('.encabezado').textContent
    }));

    let opciones = {};
    listaSecciones.forEach(sec => {
        opciones[sec.id] = sec.nombre;
    });

    // Primer swal — elegir sección
    const seleccion = await Swal.fire({
        title: "Selecciona una sección",
        input: "select",
        inputOptions: opciones,
        inputPlaceholder: "Elige una sección",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar"
    });

    if (!seleccion.isConfirmed) return;

    const idSeleccionada = seleccion.value;
    const nombreSeleccionado = opciones[idSeleccionada];

    const confirmacion = await Swal.fire({
        title: "¿Eliminar sección?",
        html: `
            <b>${nombreSeleccionado}</b><br>
            Esta acción eliminará la sección y todas sus tarjetas.
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true
    });

    if (!confirmacion.isConfirmed) return;

    // Eliminar del DOM
    const seccionDOM = document.getElementById(idSeleccionada);

    for (let i = 0; i < seccionesActuales.length; i++) {
        if (seccionesActuales[i].contenedor.id === idSeleccionada) {
            seccionesActuales.splice(i, 1)
            if (seccionDOM) seccionDOM.remove();
        }
    }
}



window.addEventListener('load',iniciarPagina)

document.body.addEventListener("click", (e) => {

    // SOLO escuchamos botones de acción
    if (e.target.classList.contains("BAccion")) {

        // 2. BOTÓN ELIMINAR
        if (e.target.textContent === "🗑️") {
            eliminarTarjeta(e.target);
            return;
        }

        // 3. BOTÓN EDITAR
        if (e.target.textContent === "✏️") {
            editarTarjeta(e.target);
            return;
        }

        // 4. BOTÓN MOVER
        if (e.target.textContent === "🔄️") {
            moverTarjeta(e.target);
            return;
        }
    }

    // 1. BOTÓN +
        if (e.target.textContent === "+") {
            let identificador = e.target.id;
            agregarTarjeta(identificador);
            return;
        }

    // --- BOTONES DE PROYECTOS ---
    if (e.target.className === "BProyectos") {
        botonAccionado = e.target.id

        mostrarProyecto(botonAccionado);
        return;
    }

    if (e.target.textContent === 'Agregar Seccion') {
        agregarSecciones()
    }

    
    if (e.target.textContent === 'Eliminar Seccion') {
        eliminarSecciones()
    }

    if (e.target.id === 'editarProyecto') {
        editarNombreProyecto(e.target)
    }

    if (e.target.id === 'eliminarProyecto'){
        eliminarProyecto()
    }
});
