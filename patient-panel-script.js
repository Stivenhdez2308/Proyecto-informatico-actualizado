document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del paciente
    cargarDatosPaciente();

    // Cargar citas
    cargarCitas();

    // Cargar ecografías
    cargarEcografias();

    // Cargar perfil
    cargarPerfil();

    // Cargar historial médico
    cargarHistorialMedico();

    // Event listeners para los botones de solicitar diagnóstico
    document.querySelectorAll('.solicitarDiagnosticoBtn').forEach(button => {
        button.addEventListener('click', async () => {
            const email = prompt("Por favor, ingresa tu correo electrónico para recibir el diagnóstico:");
            if (email) {
                const archivo = button.getAttribute('data-archivo'); // Obtener el archivo del botón

                try {
                    const response = await fetch('/api/enviar-diagnostico', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, archivo }),
                    });

                    const data = await response.json();
                    if (response.ok) {
                        alert('Diagnóstico enviado exitosamente a ' + email);
                    } else {
                        alert(data.msg || 'Error al enviar el diagnóstico');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Error al enviar el diagnóstico: ' + error.message);
                }
            } else {
                alert('Por favor, ingresa un correo electrónico válido.');
            }
        });
    });
});

function cargarDatosPaciente() {
    document.getElementById('nombrePaciente').textContent = 'María García';
    document.getElementById('proximaCita').textContent = '15 de Mayo, 2024';
    document.getElementById('ultimaEcografia').textContent = '3 de Abril, 2024';
    document.getElementById('semanasEmbarazo').textContent = '28 semanas';
}

function cargarCitas() {
    const citas = [
        { fecha: '15 de Mayo, 2024', hora: '10:00 AM', doctor: 'Dr. Pérez' },
        { fecha: '1 de Junio, 2024', hora: '11:30 AM', doctor: 'Dra. Gómez' }
    ];

    const citasList = document.querySelector('.appointment-list');
    citas.forEach(cita => {
        const citaCard = document.createElement('div');
        citaCard.className = 'appointment-card';
        citaCard.innerHTML = `
            <h3>${cita.fecha}</h3>
            <p>Hora: ${cita.hora}</p>
            <p>Doctor: ${cita.doctor}</p>
        `;
        citasList.appendChild(citaCard);
    });
}

function cargarPerfil() {
    const perfil = {
        nombre: 'María García',
        email: 'maria@example.com',
        telefono: '123-456-7890',
        fechaNacimiento: '1990-05-15'
    };

    const perfilForm = document.getElementById('perfilForm');
    for (const [key, value] of Object.entries(perfil)) {
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        formGroup.innerHTML = `
            <label for="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input type="text" id="${key}" name="${key}" value="${value}">
        `;
        perfilForm.appendChild(formGroup);
    }
}

function cargarHistorialMedico() {
    const diagnosticos = [
        { fecha: '10 de Enero, 2024', descripcion: 'Diagnóstico de Diabetes', archivo: 'diabetes_video.mp4' },
        { fecha: '5 de Febrero, 2024', descripcion: 'Ecografía de Control', archivo: 'ecografia_control.jpg' }
    ];

    const historialList = document.querySelector('.historial-list');
    diagnosticos.forEach(diagnostico => {
        const diagnosticoCard = document.createElement('div');
        diagnosticoCard.className = 'diagnostico-card';
        diagnosticoCard.innerHTML = `
            <h3>${diagnostico.fecha}</h3>
            <p>${diagnostico.descripcion}</p>
            <a href="${diagnostico.archivo}" download class="btn-primary">Descargar</a>
        `;
        historialList.appendChild(diagnosticoCard);
    });
}

function solicitarNuevaCita() {
    alert('Funcionalidad de solicitar nueva cita aún no implementada');
}

function actualizarPerfil() {
    alert('Funcionalidad de actualizar perfil aún no implementada');
}
