const formularioMascota = document.getElementById('registro-mascotas-form');
formularioMascota.addEventListener('submit', (event) => {
    event.preventDefault();
    const datosMascota = {
        nombreMascota: document.getElementById('mascota').value,
        nombreDueño: document.getElementById('dueño').value,
        cedulaDueño: document.getElementById('cedula').value,
        edadMascota: document.getElementById('edad').value,
        telefonoDueño: document.getElementById('telefono').value,
        especialidad: document.getElementById('especialidad').value,
    };
    guardarMascotaEnCookie(datosMascota)
    const confirmacion = confirm('¿Desea ver los datos o seguir añadiendo medicos?');
    if (confirmacion) {
        window.location.href = 'mascotas.html';
    } else {
        console.log('Continuando en el formulario');
        formularioMascota.reset()
    }
});
// Función para guardar una mascota en la cookie
function guardarMascotaEnCookie(mascota) {
    // Obtener los datos de la cookie actual
    let datosMasco = getCookie("mascotas");
    // Si la cookie está vacía, inicializarla como un arreglo vacío
    if (datosMasco === "") {
        datosMasco = "[]";
    }
    // Convertir la cookie en un arreglo de objetos
    const mascotas = JSON.parse(datosMasco);
    // Agregar la nueva mascota al arreglo
    mascotas.push(mascota);
    // Convertir el arreglo de mascotas de nuevo a un JSON
    const nuevoJSON = JSON.stringify(mascotas);
    // Guardar el JSON en la cookie
    setCookie("mascotas", nuevoJSON);
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
