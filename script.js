document.addEventListener('DOMContentLoaded', function() {
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropbtn.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Cerrar el menú desplegable al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.dropbtn')) {
            dropdownContent.style.display = 'none';
        }
    });

    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Enviar el formulario usando Formspree
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // Mostrar el mensaje de éxito
                successMessage.classList.add('show');
                form.reset();

                // Ocultar el mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            } else {
                throw new Error('Error en el envío del formulario');
            }
        }).catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al enviar el mensaje. Por favor, inténtelo de nuevo.');
        });
    });

    // Función para el registro de doctores
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            registrarDoctor(nombre, email, password);
        });
    }

    // Función para el inicio de sesión (si lo necesitas en el futuro)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            iniciarSesion(email, password);
        });
    }

    // Cargar opciones de nacionalidad
    const nacionalidadSelect = document.getElementById('nacionalidad');
    const nacionalidadInput = document.getElementById('nacionalidadInput');
    const paises = ['Argentina', 'Brasil', 'Chile', 'Colombia', 'México', 'Perú', 'España', 'Francia', 'Alemania', 'Italia', 'Reino Unido', 'Estados Unidos', 'Canadá', 'Australia', 'Japón', 'China', 'India', 'Sudáfrica']; // Agrega más países según sea necesario

    paises.forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        nacionalidadSelect.appendChild(option);
    });

    // Mostrar el campo de búsqueda al hacer clic en el selector
    nacionalidadSelect.addEventListener('click', function() {
        nacionalidadInput.style.display = 'block'; // Muestra el campo de búsqueda
        nacionalidadInput.focus(); // Enfoca el campo de búsqueda
    });

    // Filtrar países
    window.filtrarPaises = function() {
        const filter = nacionalidadInput.value.toLowerCase();
        const options = nacionalidadSelect.options;

        for (let i = 1; i < options.length; i++) { // Comenzar desde 1 para omitir la opción "Seleccione su país"
            const option = options[i];
            const text = option.textContent.toLowerCase();
            option.style.display = text.includes(filter) ? '' : 'none';
        }
    };

    // Ocultar el campo de búsqueda al seleccionar un país
    nacionalidadSelect.addEventListener('change', function() {
        nacionalidadInput.style.display = 'none'; // Oculta el campo de búsqueda
        nacionalidadInput.value = ''; // Limpia el campo de búsqueda
    });

    // Ocultar el campo de búsqueda si se hace clic fuera de él
    document.addEventListener('click', function(e) {
        if (!nacionalidadSelect.contains(e.target) && !nacionalidadInput.contains(e.target)) {
            nacionalidadInput.style.display = 'none'; // Oculta el campo de búsqueda
        }
    });
});

// Función para registrar un nuevo doctor
async function registrarDoctor(nombre, email, password) {
    try {
        const response = await fetch('/api/doctores/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registro exitoso.');
            // Puedes redirigir a otra página o limpiar el formulario aquí
        } else {
            alert(data.msg || 'Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro: ' + error.message);
    }
}

// Función para iniciar sesión (si la necesitas en el futuro)
async function iniciarSesion(email, password) {
    // Implementa la lógica de inicio de sesión aquí si es necesario
}

async function verificarCodigoAutorizacion(codigo) {
    console.log('Iniciando verificación del código:', codigo);
    try {
        const response = await fetch('http://localhost:3000/api/doctores/verificar-codigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codigo }),
        });

        const data = await response.json();
        if (response.ok) {
            window.location.href = '/registro-doctor.html';
        } else {
            alert(data.msg || 'Código de autorización incorrecto');
        }
    } catch (error) {
        console.error('Error detallado:', error);
        alert('Error al verificar el código de autorización: ' + error.message);
    }
}

document.getElementById('autenticacionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const codigoAutorizacion = document.getElementById('codigoAutorizacion').value;
    console.log('Código ingresado:', codigoAutorizacion);
    verificarCodigoAutorizacion(codigoAutorizacion);
});

// Función para registrar un nuevo paciente
async function registrarPaciente(datosRegistro) {
    try {
        const response = await fetch('/api/pacientes/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosRegistro),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registro exitoso. Por favor, inicia sesión.');
            window.location.href = 'acceso-paciente.html';
        } else {
            alert(data.msg || 'Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro: ' + error.message);
    }
}

// Evento para el formulario de registro de pacientes
const registroPacienteForm = document.getElementById('registroPacienteForm');
if (registroPacienteForm) {
    registroPacienteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const datosRegistro = {
            esExtranjero: document.getElementById('esExtranjero').checked,
            nacionalidad: document.getElementById('nacionalidad').value,
            usuario: document.getElementById('usuario').value,
            password: document.getElementById('password').value,
            nombre: document.getElementById('nombre').value,
            genero: document.getElementById('genero').value,
            telefono: document.getElementById('telefono').value,
            direccion: document.getElementById('direccion').value,
            departamento: document.getElementById('departamento').value,
            ciudad: document.getElementById('ciudad').value,
            fechaNacimiento: document.getElementById('fechaNacimiento').value,
            tipoSangre: document.getElementById('tipoSangre').value,
            mesesEmbarazo: document.getElementById('mesesEmbarazo').value,
            fechaUltimaEcografia: document.getElementById('fechaUltimaEcografia').value,
            estadoCivil: document.getElementById('estadoCivil').value,
            alergias: document.getElementById('alergias').value
        };

        const confirmPassword = document.getElementById('confirmPassword').value;

        if (datosRegistro.password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        registrarPaciente(datosRegistro);
    });
}

function accederCita(citaId) {
    // Lógica para acceder a la cita
    // Mostrar un formulario para adjuntar imágenes y videos
    const form = `
        <form id="adjuntarForm">
            <h3>Adjuntar Archivos para la Cita ${citaId}</h3>
            <div class="form-group">
                <label for="diagnostico">Diagnóstico</label>
                <textarea id="diagnostico" required></textarea>
            </div>
            <div class="form-group">
                <label for="imagenes">Imágenes Radiológicas (subir múltiples)</label>
                <input type="file" id="imagenes" multiple accept="image/*">
            </div>
            <div class="form-group">
                <label for="video">Video de Ecografía (AVI)</label>
                <input type="file" id="video" accept="video/avi">
            </div>
            <button type="submit" class="btn-primary">Guardar</button>
        </form>
    `;
    document.getElementById('modalContent').innerHTML = form; // Suponiendo que tienes un modal para mostrar el formulario
    document.getElementById('adjuntarForm').addEventListener('submit', (e) => {
        e.preventDefault();
        guardarArchivos(citaId);
    });
}

async function guardarArchivos(citaId) {
    const diagnostico = document.getElementById('diagnostico').value;
    const imagenes = document.getElementById('imagenes').files;
    const video = document.getElementById('video').files[0];

    // Lógica para subir archivos y guardar en la base de datos
    // Aquí deberías usar FormData para enviar los archivos al servidor
}

async function marcarNoRealizada(citaId) {
    const response = await fetch(`/api/citas/${citaId}/no-realizada`, {
        method: 'PATCH',
    });

    if (response.ok) {
        alert('Cita marcada como no realizada.');
        // Actualizar la interfaz de usuario según sea necesario
    } else {
        alert('Error al marcar la cita.');
    }
}

async function cargarCitasDelDia() {
    const response = await fetch('/api/citas/dia');
    const citas = await response.json();
    const listaCitas = document.querySelector('.appointment-list');
    listaCitas.innerHTML = ''; // Limpiar la lista

    citas.forEach(cita => {
        const citaCard = document.createElement('div');
        citaCard.className = 'appointment-card';
        citaCard.innerHTML = `
            <h3>Paciente: ${cita.pacienteNombre}</h3>
            <p>Fecha: ${new Date(cita.fecha).toLocaleDateString()}</p>
            <p>Hora: ${new Date(cita.fecha).toLocaleTimeString()}</p>
            <button class="btn-primary" onclick="accederCita(${cita.id})">Acceder a Cita</button>
            <button class="btn-secondary" onclick="marcarNoRealizada(${cita.id})">Marcar como No Realizada</button>
        `;
        listaCitas.appendChild(citaCard);
    });
}
