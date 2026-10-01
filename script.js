document.addEventListener('DOMContentLoaded', () => {
    // Carga de datos mediante llamada relativa
    fetch('./cv-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar el JSON: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            renderCV(data);
        })
        .catch(error => {
            console.error('Error procesando la información del CV:', error);
        });
});

function renderCV(data) {
    // 1. Información de Perfil
    const perfil = data.perfil;
    document.getElementById('profile-img').src = perfil.fotoBase64;
    document.getElementById('user-name').innerHTML = perfil.nombre.replace(" ", "<br>");
    document.getElementById('user-title').textContent = perfil.titulo;
    document.getElementById('user-email').textContent = perfil.email;
    document.getElementById('user-phone').textContent = perfil.telefono;
    document.getElementById('user-location').textContent = perfil.ubicacion;
    
    const linkedinAnchor = document.getElementById('user-linkedin');
    linkedinAnchor.href = perfil.linkedin;
    linkedinAnchor.textContent = perfil.linkedinLabel;

    // 2. Sobre Mí
    document.getElementById('user-about').textContent = data.sobreMi;

    // 3. Habilidades Técnicas
    const skillsContainer = document.getElementById('skills-container');
    skillsContainer.innerHTML = '';
    data.habilidades.forEach(skill => {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill';
        skillDiv.innerHTML = `
            <div class="skill-name">
                <span>${skill}</span>
            </div>
        `;
        skillsContainer.appendChild(skillDiv);
    });

    // 4. Idiomas
    const languagesContainer = document.getElementById('languages-container');
    languagesContainer.innerHTML = '';
    data.idiomas.forEach(idioma => {
        const langDiv = document.createElement('div');
        langDiv.className = 'language';
        langDiv.innerHTML = `
            <div class="skill-name">
                <span>${idioma}</span>
            </div>
        `;
        languagesContainer.appendChild(langDiv);
    });

    // 5. Experiencia Laboral
    const expContainer = document.getElementById('experience-container');
    expContainer.innerHTML = '';
    data.experiencia.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.className = 'experience';
        
        const achievementsList = exp.logros.map(logro => `<li>${logro}</li>`).join('');
        
        expDiv.innerHTML = `
            <div class="company">${exp.empresa} | ${exp.ubicacion}</div>
            <div class="period">${exp.periodo}</div>
            <div class="job-title">${exp.puesto}</div>
            <ul class="achievements">
                ${achievementsList}
            </ul>
        `;
        expContainer.appendChild(expDiv);
    });

    // 6. Educación
    const eduContainer = document.getElementById('education-container');
    eduContainer.innerHTML = '';
    data.educacion.forEach(edu => {
        const eduDiv = document.createElement('div');
        eduDiv.className = 'education';
        eduDiv.innerHTML = `
            <div class="company">${edu.carrera}</div>
            <div class="period">${edu.institucion} / ${edu.ubicacion} / ${edu.anio}</div>
            <ul class="achievements">
                <li>${edu.descripcion}</li>
            </ul>
        `;
        eduContainer.appendChild(eduDiv);
    });
}