//cargar los datos de la cookie
//cargar los medicos y mascotas que ya esten guardados, como estan en formato JSON se pasan a objetos para poder trabajarlos en js
const mascotasCookie = JSON.parse(getCookie('mascotas'));
const medicosCookie = JSON.parse(getCookie('medicos') || "[]");
//buscar la tabla mascotas en HTML para agregar las nuevas mascotas
const tablaMascotas = document.getElementById("tabla-mascotas");
const cuerpoTabla = tablaMascotas.querySelector("tbody");

for (let i = 0; i < mascotasCookie.length; i++) {
    const mascota = mascotasCookie[i];
    //insertar fila para agregar mascotas
    const fila = cuerpoTabla.insertRow();
    //insertar celdas para agregar cada uno de los datos de las mascotas
    const celdaNombreMascota = fila.insertCell();
    const celdaNombreDueño = fila.insertCell();
    const celdaCedulaDueño = fila.insertCell();
    const celdaEdadMascota = fila.insertCell();
    const celdaTelefonoDueño = fila.insertCell();
    const celdaEspecialidad = fila.insertCell();
    //agregar la informaciona cada una de las celdas de la tabla
    celdaNombreMascota.textContent = mascota.nombreMascota;
    celdaNombreDueño.textContent = mascota.nombreDueño;
    celdaCedulaDueño .textContent = mascota.cedulaDueño;
    celdaEdadMascota.textContent = mascota.edadMascota;
    celdaTelefonoDueño.textContent = mascota.telefonoDueño;
    celdaEspecialidad.textContent = mascota.especialidad;
    //colocar el medico que va a tratar la mascota
    //mediante find encontramos el medico que tenga la especialidad
    //devuelde el medico que tenga esa especialidad
    const medicoEspecialidad = medicosCookie.find(medico => medico.especialidad === mascota.especialidad);
    //crear la celda
    const celdaMedicoMascota = fila.insertCell();
    //si hay medicos colocar el nombre del medico, de lo contrario colocar por asignar
    celdaMedicoMascota.textContent = medicoEspecialidad ? medicoEspecialidad.nombreMedico : "Por asignar";
}




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