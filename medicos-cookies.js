//cargar los datos de la cookie
const medicosCookie = JSON.parse(getCookie('medicos'));
const mascotasCookie = JSON.parse(getCookie('mascotas') || "[]");
const tablaMedicos = document.getElementById("tabla-medicos");
const cuerpoTabla = tablaMedicos.querySelector("tbody");
medicosCookie.forEach(medico => {
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
    if (mascotasEncontradas.length > 0) {
        const medicoMascota = fila.insertCell();
        medicoMascota.innerHTML = `<ul id="pacientes"></ul>`
        const pacientes = medicoMascota.querySelector("#pacientes")
        mascotasEncontradas.forEach(mascota => {
            pacientes.innerHTML += `<li>${mascota.nombreMascota}</li>`;
        });
    } else {
        const medicoMascota = fila.insertCell();
        medicoMascota.textContent = "Sin pacientes";
    }
});



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