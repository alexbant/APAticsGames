import { auth, provider } from './firebase-config.js';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const initialProgress = {
  citas: { nivelActual: 1, estrellas: {} },
  referencias: { nivelActual: 1, estrellas: {} },
  formato: { nivelActual: 1, estrellas: {} },
  logros: ["Bienvenido a Bordo"]
};

const guestNames = ["Explorador", "Curioso", "Estudiante", "Investigador", "Académico", "Lector", "Analista", "Pensador", "Erudito", "Sabio", "Genio", "Maestro", "Doctor", "Profesor", "Científico", "Filósofo", "Autodidacta", "Aprendiz", "Mentor", "Visionario"];

const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const btn = document.getElementById('registerButton');

    if (password.length < 6) {
      showAuthModal("Contraseña débil", "La contraseña debe tener al menos 6 caracteres.", "error");
      return;
    }

    try {
      btn.textContent = "Registrando...";
      btn.disabled = true;

      // 1. Crear usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Actualizar perfil (Nombre)
      await updateProfile(user, { displayName: name });

      // 3. Guardar sesión local para que funcione con el resto de la app (cuenta.js, etc.)
      const sessionData = {
        name: name,
        email: email,
        uid: user.uid,
        avatar: null
      };
      localStorage.setItem('apaticgamesSession', JSON.stringify(sessionData));

      // Guardar en lista de usuarios permanente (Simulación DB para persistencia de perfil)
      const users = JSON.parse(localStorage.getItem('apaticgamesUsers')) || [];
      users.push({
        uid: user.uid,
        name: name,
        email: email,
        avatar: null,
        bio: ""
      });
      localStorage.setItem('apaticgamesUsers', JSON.stringify(users));

      // 4. REINICIAR PROGRESO (Cuenta nueva = Progreso 0)
      localStorage.setItem('apaticgamesProgreso', JSON.stringify(initialProgress));
      localStorage.removeItem('apaticgamesStats');
      localStorage.setItem('show_welcome_achievement', 'true'); // Bandera para mostrar logro

      showAuthModal("¡Cuenta Creada!", `Bienvenido, ${name}! Tu cuenta ha sido creada exitosamente.`, "success", "cuenta.html");

    } catch (error) {
      console.error(error);
      let msg = "Error al registrarse.";
      if (error.code === 'auth/email-already-in-use') msg = "El correo ya está registrado.";
      if (error.code === 'auth/invalid-email') msg = "El correo no es válido.";
      if (error.code === 'auth/api-key-not-valid') msg = "Error: La API Key de Firebase no es válida. Revisa firebase-config.js";
      showAuthModal("Error de Registro", msg, "error");
      btn.textContent = "Registrarse";
      btn.disabled = false;
    }
  });
}

// Lógica para Ingreso como Invitado desde Registro
const guestRegisterBtn = document.getElementById('guestRegisterBtn');
if (guestRegisterBtn) {
  guestRegisterBtn.addEventListener('click', async () => {
    try {
      const result = await signInAnonymously(auth);
      const user = result.user;

      // Generar nombre aleatorio
      const randomName = "Invitado " + guestNames[Math.floor(Math.random() * guestNames.length)];

      // Guardar sesión local
      const sessionData = {
        name: randomName,
        email: "Sin correo",
        uid: user.uid,
        avatar: null,
        isAnonymous: true
      };
      localStorage.setItem('apaticgamesSession', JSON.stringify(sessionData));

      // REINICIAR PROGRESO PARA INVITADO
      localStorage.setItem('apaticgamesProgreso', JSON.stringify(initialProgress));
      localStorage.removeItem('apaticgamesStats');
      localStorage.setItem('show_welcome_achievement', 'true'); // Bandera para mostrar logro

      showAuthModal("Modo Invitado", "Has ingresado como invitado.", "success", "cuenta.html");

    } catch (error) {
      console.error(error);
      showAuthModal("Error", "No se pudo ingresar como invitado.", "error");
    }
  });
}

// Lógica para Google Registro
const googleRegisterBtn = document.getElementById('googleRegisterBtn');
if (googleRegisterBtn) {
  googleRegisterBtn.addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Guardar sesión local
      const sessionData = {
        name: user.displayName || "Usuario Google",
        email: user.email,
        uid: user.uid,
        avatar: user.photoURL
      };
      localStorage.setItem('techplaySession', JSON.stringify(sessionData));

      // RECUPERAR O INICIALIZAR PROGRESO
      const savedProgress = localStorage.getItem('techplay_save_' + user.email);
      const savedStats = localStorage.getItem('techplay_stats_' + user.email);

      if (savedProgress) {
        localStorage.setItem('techplayProgreso', savedProgress);
      } else if (!localStorage.getItem('techplayProgreso')) {
        localStorage.setItem('techplayProgreso', JSON.stringify(initialProgress));
      }

      if (savedStats) localStorage.setItem('techplayStats', savedStats);

      showAuthModal("¡Bienvenido!", `Has iniciado sesión como ${user.displayName || 'Usuario Google'}.`, "success", "cuenta.html");

    } catch (error) {
      console.error(error);
      let msg = "Error al registrarse con Google.";
      if (error.code === 'auth/api-key-not-valid') {
        msg = "Error de configuración: La API Key en firebase-config.js es incorrecta.";
      }
      showAuthModal("Error de Google", msg, "error");
    }
  });
}

// ==========================================
// FUNCIÓN DE MODAL PERSONALIZADO
// ==========================================
function showAuthModal(title, message, type, redirectUrl = null) {
  // Eliminar modal previo si existe
  const existing = document.getElementById('authModal');
  if (existing) existing.remove();

  const isSuccess = type === 'success';
  const icon = isSuccess ? 'fa-circle-check' : 'fa-circle-xmark';
  const color = isSuccess ? '#22c55e' : '#ef4444'; // Verde o Rojo

  const modalHtml = `
    <div id="authModal" class="modal-backdrop" style="z-index: 99999; display: flex; align-items: center; justify-content: center; position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);">
      <div class="modal" style="background: var(--card-bg, #fff); padding: 30px; border-radius: 20px; text-align: center; max-width: 360px; width: 90%; box-shadow: 0 20px 50px rgba(0,0,0,0.3); animation: popIn 0.3s ease;">
        <div style="font-size: 3.5rem; margin-bottom: 15px; color: ${color};">
          <i class="fa-solid ${icon}"></i>
        </div>
        <h3 style="margin: 0 0 10px 0; font-size: 1.5rem; color: var(--text-color, #1e293b);">${title}</h3>
        <p style="margin: 0 0 20px 0; color: var(--text-muted, #64748b); line-height: 1.5;">${message}</p>
        <button id="authModalBtn" class="btn-primary" style="width: 100%; border: none; cursor: pointer; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 1rem; background: ${isSuccess ? 'var(--primary-color, #0f3c78)' : '#334155'}; color: white;">
          ${isSuccess ? 'Continuar' : 'Intentar de nuevo'}
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  document.getElementById('authModalBtn').onclick = () => {
    document.getElementById('authModal').remove();
    if (redirectUrl) window.location.href = redirectUrl;
  };
}