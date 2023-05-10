//cargar los datos de la cookie
const medicosCookie = JSON.parse(getCookie('medicos'));
const mascotasCookie = JSON.parse(getCookie('mascotas') || "[]");
const tablaMedicos = document.getElementById("tabla-medicos");
const cuerpoTabla = tablaMedicos.querySelector("tbody");
//length tamaño del arreglo
for (let i = 0; i < medicosCookie.length; i++) {
    const medico = medicosCookie[i];
    const fila = cuerpoTabla.insertRow();
    const nombreMedico = fila.insertCell();
    nombreMedico.textContent = medico.nombreMedico;
    const apellidoMedico = fila.insertCell();
    apellidoMedico.textContent = medico.apellidoMedico;
    const cedula = fila.insertCell();
    cedula.textContent = medico.cedula;
    const especialidad = fila.insertCell();
    especialidad.textContent = medico.especialidad;
    const consultorio = fila.insertCell();
    consultorio.textContent = medico.consultorio;
    const correoContacto = fila.insertCell();
    correoContacto.textContent = medico.correo;
    const telefonoMedico = fila.insertCell();
    telefonoMedico.textContent = medico.telefonoMedico;
    //colocar las mascotas que atiende el medico
    //mediante filter encontramos todas las mascotas que tienen esa especialidad
    let mascotasEncontradas = mascotasCookie.filter(mascota => medico.especialidad === mascota.especialidad);
    //se creo la celda
    const medicoMascota = fila.insertCell();
    if (mascotasEncontradas.length > 0) {
        medicoMascota.innerHTML = `<ul id="pacientes"></ul>`
        const pacientes = medicoMascota.querySelector("#pacientes")
        for (let j = 0; j < mascotasEncontradas.length; j++) {
            const mascotaEncontrada = mascotasEncontradas[j];
            pacientes.innerHTML += `<li>${mascotaEncontrada.nombreMascota}</li>`;
        }
    } else {
        medicoMascota.textContent = "Sin pacientes";
    }
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