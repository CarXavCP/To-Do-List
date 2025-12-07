const seccionSidebar = document.getElementById('botones-proyectos')
const botonAgregarProyecto = document.getElementById('nuevo-proyecto')
const seccionTitulo = document.getElementById('titulo-proyecto')
const pantallaSeccionesProyectos = document.getElementById('secciones-proyectos')
const seccionBotonesAD = document.getElementById('seccionBtnA-D')
const mensajeVacio = document.getElementById('aviso')
//PARA GUARDAR TODO LO RELATIVO A LAS SECCIONES
let seccionesPredeterminadas = []
let seccion

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
let nombreProyecto
let identificadorProyecto
let contadorProyectos = 0

//FUNCION MOSTRAR PROYECTO
let titulo
//let mostrarSeccion
let seccionesActuales
//FUNCION EDITAR Y MOVER
let tarjeta

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

}

function agregarProyecto() {
    
    nombreProyecto = prompt('Agrega el nombre de tu proyecto: ')
    

    if (nombreProyecto !== null) {
        nombreProyecto = nombreProyecto.trim()
    }

    if (nombreProyecto !== '' && nombreProyecto !== null) {
        console.log(nombreProyecto)
        mensajeVacio.style.display = 'none'
        seccionTitulo.style.display = 'flex'
        seccionBotonesAD.style.display = 'flex'    


        botonProyectoNuevo = document.createElement('button')

        botonProyectoNuevo.textContent = nombreProyecto
        seccionTitulo.innerHTML = nombreProyecto
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

            let contenedorReal = document.getElementById(`${seccion.id}-${contadorProyectos}`)
            let contenedorTarjetasReal = document.getElementById(`tarjetas-${seccion.id}-${contadorProyectos}`)
            
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
        

    }else if (nombreProyecto === null) {
        return
    
    } else {
        alert('No has agregado un nombre, no se pudo crear el proyecto')
    }

}

function mostrarProyecto(botonAccionado) {
    
    for (let i = 0; i < botonesProyectos.length; i++) {
        
        if (botonesProyectos[i].id === botonAccionado) {
            seccionesActuales = seccionesProyectos[i]
            titulo = proyectos[i].nombre
            contenedorProyecto = document.getElementById(proyectos[i].id)
                
            document.querySelectorAll('.proyectos').forEach(div => {
                div.style.display = 'none'
            })
            
            contenedorProyecto.style.display = 'flex'
            seccionTitulo.innerHTML = titulo
    
        }
    }
}

function agregarTarjeta(identificadorBoton) {

    botonAccionado = document.getElementById(identificadorBoton)
    seccion = botonAccionado.closest('div[id]')
    
    contenedorTarjetas = seccion.querySelector("[id^='tarjetas-']");

    nuevaTarjeta = document.createElement('div')
    nuevaTarjeta.className = 'tarjetas'
    
    textoTarjeta = document.createElement('p')
    textoTarjeta.contentEditable = false
    mensajeAgregarTarjeta = prompt('Agregue Tarea')
    
    if (mensajeAgregarTarjeta !== null) {
        mensajeAgregarTarjeta = mensajeAgregarTarjeta.trim()
    }
    
    if (mensajeAgregarTarjeta !== '' && mensajeAgregarTarjeta !== null) {
        contenedorBotones = document.createElement('div')
        contenedorBotones.className = 'botones'

        
        botonEditar = document.createElement('button')
        botonEditar.textContent = 'Editar'
        botonEditar.className = 'BAccion'

        botonMover = document.createElement('button')
        botonMover.textContent = 'Mover'
        botonMover.className = 'BAccion'

        botonEliminar = document.createElement('button')
        botonEliminar.textContent = 'Eliminar'
        botonEliminar.className = 'BAccion'


        contenedorTarjetas.appendChild(nuevaTarjeta)
        contenedorBotones.append(botonMover, botonEditar, botonEliminar)
        nuevaTarjeta.append(textoTarjeta, contenedorBotones)
        textoTarjeta.innerHTML = mensajeAgregarTarjeta

    }else if (mensajeAgregarTarjeta === null) {
        return
    
    } else {
        alert('No has agregado contenido, no se pudo agregar la tarea')
    }
}

function eliminarTarjeta(boton) {
    tarjeta = boton.closest('.tarjetas')
    tarjeta.remove()
}

function editarTarjeta(boton) {
    tarjeta = boton.closest('.tarjetas')
    textoTarjeta = tarjeta.querySelector('p')

    const nuevoTexto = prompt('Edita el texto:', textoTarjeta.textContent);
    if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
        textoTarjeta.textContent = nuevoTexto;
    }

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
    
    console.log(seccion, idSeccionActual, opcionesSecciones)

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

        if (!contenedorDestino) {
            console.error('No se encontró el contenedor destino: ', idDestino)
        }

        contenedorDestino.appendChild(tarjeta)

    })


    
}


window.addEventListener('load',iniciarPagina)

document.body.addEventListener("click", (e) => {

    // SOLO escuchamos botones de acción
    if (e.target.classList.contains("BAccion")) {

        // 2. BOTÓN ELIMINAR
        if (e.target.textContent === "Eliminar") {
            eliminarTarjeta(e.target);
            return;
        }

        // 3. BOTÓN EDITAR
        if (e.target.textContent === "Editar") {
            editarTarjeta(e.target);
            return;
        }

        // 4. BOTÓN MOVER
        if (e.target.textContent === "Mover") {
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

        //console.log(e.target.id)
        mostrarProyecto(botonAccionado);
        return;
    }

});
