//cargar los datos de la cookie
//cargar los medicos y mascotas que ya esten guardados, como estan en formato JSON se pasan a objetos para poder trabajarlos en js
const mascotasCookie = JSON.parse(getCookie('mascotas'));
const medicosCookie = JSON.parse(getCookie('medicos') || "[]");
//buscar la tabla mascotas en HTML para agregar las nuevas mascotas
const tablaMascotas = document.getElementById("tabla-mascotas");
const cuerpoTabla = tablaMascotas.querySelector("tbody");
mascotasCookie.forEach(mascota => {
    //insertar fila para agregar mascotas
    const fila = cuerpoTabla.insertRow();
    //insertar celdas para agregar cada uno de los datos de las mascotas
    const nombreMascota = fila.insertCell();
    const nombreDueño = fila.insertCell();
    const cedulaDueño = fila.insertCell();
    const edadMascota = fila.insertCell();
    const telefonoDueño = fila.insertCell();
    const especialidad = fila.insertCell();
    //agregar la informaciona cada una de las celdas de la tabla
    nombreMascota.textContent = mascota.nombreMascota;
    nombreDueño.textContent = mascota.nombreDueño;
    cedulaDueño.textContent = mascota.cedulaDueño;
    edadMascota.textContent = mascota.edadMascota;
    telefonoDueño.textContent = mascota.telefonoDueño;
    especialidad.textContent = mascota.especialidad;
    //colocar el medico que va a tratar la mascota
    //mediante find encontramos el medico que tenga la especialidad
    const medicoEspecialidad = medicosCookie.find(medico => medico.especialidad === mascota.especialidad);
    const medicoMascota = fila.insertCell();
    //si hay medicos colocar el nombre del medico, de lo contrario colocar por asignar
    medicoMascota.textContent = medicoEspecialidad ? medicoEspecialidad.nombreMedico : "Por asignar";
});



// Función para obtener los datos de la cookie
function getCookie(nombre) {
    //separa todas las cookies que se tengan
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        //busca la cookie que necesitemos en este caso la cookie llamada mascota
        if (cookie[0] === nombre) {
            //si encuentra la cookie devuelve la informacion desencriptada (en formato JSON)
            return decodeURIComponent(cookie[1]);
        }
    }
    //si no encuentra ninguna cookie devuelve vacio
    return "";
}