document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del paciente
    cargarDatosPaciente();

    // Cargar citas
    cargarCitas();

    // Cargar ecografías
    cargarEcografias();

    // Cargar perfil
    cargarPerfil();

    // Event listeners
    document.getElementById('nuevaCitaBtn').addEventListener('click', solicitarNuevaCita);
    document.getElementById('actualizarPerfilBtn').addEventListener('click', actualizarPerfil);
});

function cargarDatosPaciente() {
    // Aquí se cargarían los datos del paciente desde el servidor
    // Por ahora, usaremos datos de ejemplo
    document.getElementById('nombrePaciente').textContent = 'María García';
    document.getElementById('proximaCita').textContent = '15 de Mayo, 2024';
    document.getElementById('ultimaEcografia').textContent = '3 de Abril, 2024';
    document.getElementById('semanasEmbarazo').textContent = '28 semanas';
}

function cargarCitas() {
    // Aquí se cargarían las citas desde el servidor
    // Por ahora, usaremos datos de ejemplo
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

function cargarEcografias() {
    // Aquí se cargarían las ecografías desde el servidor
    // Por ahora, usaremos datos de ejemplo
    const ecografias = [
        { fecha: '3 de Abril, 2024', tipo: '4D', imagen: 'ecografia1.jpg' },
        { fecha: '1 de Marzo, 2024', tipo: '3D', imagen: 'ecografia2.jpg' }
    ];

    const ecografiaGallery = document.querySelector('.ecografia-gallery');
    ecografias.forEach(ecografia => {
        const ecografiaCard = document.createElement('div');
        ecografiaCard.className = 'ecografia-card';
        ecografiaCard.innerHTML = `
            <img src="${ecografia.imagen}" alt="Ecografía ${ecografia.fecha}">
            <h3>${ecografia.fecha}</h3>
            <p>Tipo: ${ecografia.tipo}</p>
        `;
        ecografiaGallery.appendChild(ecografiaCard);
    });
}

function cargarPerfil() {
    // Aquí se cargarían los datos del perfil desde el servidor
    // Por ahora, usaremos datos de ejemplo
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

function solicitarNuevaCita() {
    // Aquí iría la lógica para solicitar una nueva cita
    alert('Funcionalidad de solicitar nueva cita aún no implementada');
}

function actualizarPerfil() {
    // Aquí iría la lógica para actualizar el perfil
    alert('Funcionalidad de actualizar perfil aún no implementada');
}
