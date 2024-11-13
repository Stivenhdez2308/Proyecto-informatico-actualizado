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

    // Función para el inicio de sesión
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            window.location.href = 'admin-dashboard.html';
        });
    }

    const pacienteNombre = localStorage.getItem('pacienteNombre');
    if (pacienteNombre) {
        document.getElementById('pacienteNombre').value = pacienteNombre;
    }

    // Función para editar doctor
    const editarDoctorForm = document.getElementById('editarDoctorForm');
    if (editarDoctorForm) {
        editarDoctorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const especialidad = document.getElementById('especialidad').value;

            //lógica para enviar los datos al servidor
            console.log('Datos del doctor a editar:', { nombre, email, especialidad });
            alert('Doctor editado exitosamente.');
        });
    }

    // Función para eliminar doctor
    const eliminarDoctorForm = document.getElementById('eliminarDoctorForm');
    if (eliminarDoctorForm) {
        eliminarDoctorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const doctorId = document.getElementById('doctorId').value;

            //lógica para eliminar el doctor
            console.log('ID del doctor a eliminar:', doctorId);
            alert('Doctor eliminado exitosamente.');
        });
    }

    // Evento para el formulario de importación de Excel
    const importExcelForm = document.getElementById('importExcelForm');
    if (importExcelForm) {
        importExcelForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const excelFile = document.getElementById('excelFile').files[0];
            const collection = document.getElementById('collectionSelect').value;

            const formData = new FormData();
            formData.append('file', excelFile);
            formData.append('collection', collection);

            try {
                const response = await fetch('/api/importar-excel', {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                if (response.ok) {
                    alert(data.msg || 'Datos importados exitosamente.');
                } else {
                    alert(data.msg || 'Error al importar los datos.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al importar los datos: ' + error.message);
            }
        });
    }

    document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const cedula = document.getElementById('cedula').value;
        const asunto = document.getElementById('asunto').value;

        try {
            const response = await fetch('/api/restablecer-contraseña', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cedula, asunto })
            });

            if (response.ok) {
                alert('Se ha enviado un correo electrónico para restablecer su contraseña.');
                window.location.href = 'acceso-doctor.html';
            } else {
                const errorMsg = await response.text();
                alert('Error: ' + errorMsg);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en el servidor');
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
            
        } else {
            alert(data.msg || 'Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro: ' + error.message);
    }
}

async function iniciarSesion(email, password) {
    
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

function accederCita(citaId, pacienteNombre) {
    localStorage.setItem('pacienteNombre', pacienteNombre);
    window.location.href = 'diagnosticos.html';
}

async function guardarArchivos(citaId) {
    const diagnostico = document.getElementById('diagnostico').value;
    const imagenes = document.getElementById('imagenes').files;
    const video = document.getElementById('video').files[0];

}

async function marcarNoRealizada(citaId) {
    const response = await fetch(`/api/citas/${citaId}/no-realizada`, {
        method: 'PATCH',
    });

    if (response.ok) {
        alert('Cita marcada como no realizada.');
    } else {
        alert('Error al marcar la cita.');
    }
}

async function cargarCitasDelDia() {
    const response = await fetch('/api/citas/dia');
    const citas = await response.json();
    const listaCitas = document.querySelector('.appointment-list');
    listaCitas.innerHTML = '';

    citas.forEach(cita => {
        const citaCard = document.createElement('div');
        citaCard.className = 'appointment-card';
        citaCard.innerHTML = `
            <h3>Paciente: ${cita.pacienteNombre}</h3>
            <p>Fecha: ${new Date(cita.fecha).toLocaleDateString()}</p>
            <p>Hora: ${new Date(cita.fecha).toLocaleTimeString()}</p>
            <button class="btn-primary" onclick="accederCita(${cita.id}, '${cita.pacienteNombre}')">Acceder a Cita</button>
            <button class="btn-secondary" onclick="marcarNoRealizada(${cita.id})">Marcar como No Realizada</button>
        `;
        listaCitas.appendChild(citaCard);
    });
}

