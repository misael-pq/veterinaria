const registroSection = document.getElementById('registroSection')
const loginSection = document.getElementById('loginSection')
const formularioSection = document.getElementById('formularioSection')

const linkLogin = document.getElementById('linkLogin')
const linkRegistro = document.getElementById('linkRegistro')

const formRegistro = document.getElementById('formRegistro')
const formLogin = document.getElementById('formLogin')
const formVeterinaria = document.getElementById('formVeterinaria')

const nombreUsuarioSpan = document.getElementById('nombreUsuario')
const cerrarSesionBtn = document.getElementById('cerrarSesionBtn')

const fotoInput = document.getElementById('fotoMascota')
const previewFoto = document.getElementById('previewFoto')

linkLogin.addEventListener('click', e => {
  e.preventDefault()
  registroSection.style.display = 'none'
  loginSection.style.display = 'block'
  formularioSection.style.display = 'none'
})

linkRegistro.addEventListener('click', e => {
  e.preventDefault()
  registroSection.style.display = 'block'
  loginSection.style.display = 'none'
  formularioSection.style.display = 'none'
})

formRegistro.addEventListener('submit', e => {
  e.preventDefault()
  const nombre = document.getElementById('regNombre').value.trim()
  const correo = document.getElementById('regCorreo').value.trim()
  const pass = document.getElementById('regPass').value

  if (!nombre || !correo || !pass) return alert('Completa todos los campos')

  const userData = { nombre, correo, pass }
  localStorage.setItem('vetcareUser', JSON.stringify(userData))

  alert('Registro exitoso, ahora inicia sesión')
  formRegistro.reset()
  
  // Aquí: mostrar solo pantalla de login para iniciar sesión
  registroSection.style.display = 'none'
  loginSection.style.display = 'block'
  formularioSection.style.display = 'none'
})

formLogin.addEventListener('submit', e => {
  e.preventDefault()
  const correo = document.getElementById('loginCorreo').value.trim()
  const pass = document.getElementById('loginPass').value

  const userData = JSON.parse(localStorage.getItem('vetcareUser'))
  if (!userData) return alert('No hay usuarios registrados, primero regístrate')

  if (correo === userData.correo && pass === userData.pass) {
    nombreUsuarioSpan.textContent = userData.nombre
    registroSection.style.display = 'none'
    loginSection.style.display = 'none'
    formularioSection.style.display = 'block'
    formLogin.reset()
  } else alert('Correo o contraseña incorrectos')
})

cerrarSesionBtn.addEventListener('click', () => {
  registroSection.style.display = 'block'
  loginSection.style.display = 'none'
  formularioSection.style.display = 'none'
})

formVeterinaria.addEventListener('submit', e => {
  e.preventDefault()
  
  // Mostrar modal con datos de la cita
  mostrarModalCita()
  
  formVeterinaria.reset()
  previewFoto.style.display = 'none'
})

fotoInput.addEventListener('change', () => {
  const file = fotoInput.files[0]
  if (!file) {
    previewFoto.style.display = 'none'
    previewFoto.src = ''
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    previewFoto.src = reader.result
    previewFoto.style.display = 'block'
  }
  reader.readAsDataURL(file)
})

document.querySelectorAll('.btnShowPass').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target')
    const input = document.getElementById(targetId)
    if (input.type === 'password') {
      input.type = 'text'
      btn.innerHTML = '<i class="fas fa-eye-slash"></i>'
      btn.setAttribute('aria-label', 'Ocultar contraseña')
    } else {
      input.type = 'password'
      btn.innerHTML = '<i class="fas fa-eye"></i>'
      btn.setAttribute('aria-label', 'Mostrar contraseña')
    }
  })
})

function mostrarModalCita() {
  // Construye los datos para mostrar
  const nombreDueno = document.getElementById('nombreDueno').value
  const telefonoDueno = document.getElementById('telefonoDueno').value
  const emailDueno = document.getElementById('emailDueno').value
  const nombreMascota = document.getElementById('nombreMascota').value
  const razaMascota = document.getElementById('razaMascota').value
  const edadMascota = document.getElementById('edadMascota').value
  const pesoMascota = document.getElementById('pesoMascota').value
  const tipoMascota = document.getElementById('tipoMascota').value
  const doctorMascota = document.getElementById('doctorMascota').value
  const fechaCita = document.getElementById('fechaCita').value
  const horaCita = document.getElementById('horaCita').value
  const motivoCita = document.getElementById('motivoCita').value
  const fotoSrc = previewFoto.src

  // Crea contenido HTML
  let modalHtml = `
    <div id="modalCita" style="
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    ">
      <div style="
        background: #00271a;
        padding: 20px 30px;
        border-radius: 15px;
        max-width: 400px;
        width: 90%;
        color: #50e3c2;
        text-align: left;
        position: relative;
      ">
        <h2 style="text-align:center; margin-bottom: 15px;">Cita reservada</h2>
        <p><strong>Nombre dueño:</strong> ${nombreDueno}</p>
        <p><strong>Teléfono:</strong> ${telefonoDueno}</p>
        <p><strong>Email:</strong> ${emailDueno}</p>
        <p><strong>Nombre mascota:</strong> ${nombreMascota}</p>
        <p><strong>Raza:</strong> ${razaMascota}</p>
        <p><strong>Edad:</strong> ${edadMascota} años</p>
        <p><strong>Peso:</strong> ${pesoMascota} kg</p>
        <p><strong>Tipo:</strong> ${tipoMascota}</p>
        <p><strong>Doctor:</strong> ${doctorMascota}</p>
        <p><strong>Fecha:</strong> ${fechaCita}</p>
        <p><strong>Hora:</strong> ${horaCita}</p>
        <p><strong>Motivo:</strong> ${motivoCita}</p>`

  if (fotoSrc && fotoSrc !== '') {
    modalHtml += `<p><strong>Foto mascota:</strong><br><img src="${fotoSrc}" alt="Foto mascota" style="max-width:100%; border-radius:10px; margin-top:10px;"></p>`
  }

  modalHtml += `<button id="cerrarModal" style="
      margin-top: 15px;
      background-color: #50e3c2;
      border: none;
      padding: 10px 0;
      width: 100%;
      border-radius: 10px;
      font-weight: 700;
      color: #00271a;
      cursor: pointer;
    ">Cerrar</button></div></div>`

  // Agrega modal al body
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = modalHtml
  document.body.appendChild(tempDiv.firstChild)

  // Evento para cerrar modal
  document.getElementById('cerrarModal').addEventListener('click', () => {
    const modal = document.getElementById('modalCita')
    if (modal) modal.remove()
  })
}
