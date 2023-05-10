const formularioMedico = document.getElementById('registro-medicos-form');
formularioMedico.addEventListener('submit', (event) => {
    event.preventDefault();
    const datosMedico = {//objeto
        nombreMedico: document.getElementById('nombre').value,
        apellidoMedico: document.getElementById('apellido').value,
        cedula: document.getElementById('cedula').value,
        consultorio: document.getElementById('consultorio').value,
        telefonoMedico: document.getElementById('telefono').value,
        especialidad: document.getElementById('especialidad').value,
        correo: document.getElementById('correo').value
    };
    const medicosCookie = getCookie('medicos') ? JSON.parse(getCookie('medicos')) : [];
    //¿hay algun medico con la especialidad? si si me devuleve true sino false
    const existeMedico = medicosCookie.some(medico => medico.especialidad === datosMedico.especialidad);
    if (existeMedico) {
        alert("Ya existe un medico para esta especialidad");
    } else {
        guardarEnCookie(datosMedico);
    }
    const confirmacion = confirm('¿Desea ver los datos o seguir añadiendo medicos?');
    if (confirmacion) {
        window.location.href = 'medicos.html';
    } else {
        console.log('Continuando en el formulario');
        formularioMedico.reset()
    }
});
// Función para guardar una medico en la cookie
function guardarEnCookie(medico) {
    // Obtener los datos de la cookie actual
    let datosMedico = getCookie("medicos");
    // Si la cookie está vacía, inicializarla como un arreglo vacío
    if (datosMedico === "") {
        datosMedico = "[]";
    }
    // Convertir la cookie en un arreglo de objetos
    const medicos = JSON.parse(datosMedico);
    // Agregar la nueva medico al arreglo
    medicos.push(medico);
    // Convertir el arreglo de medicos de nuevo a un JSON
    const nuevoJSON = JSON.stringify(medicos);
    // Guardar el JSON en la cookie
    setCookie("medicos", nuevoJSON);
}

// Función para obtener los datos de la cookie
function getCookie(nombre) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === nombre) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return "";
}

// Función para guardar datos en la cookie
function setCookie(nombre, valor) {
    document.cookie = `${nombre}=${encodeURIComponent(valor)}`;
}
