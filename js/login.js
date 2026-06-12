import { auth, provider } from './firebase-config.js';
import { signInWithEmailAndPassword, signInWithPopup, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const initialProgress = {
  citas: { nivelActual: 1, estrellas: {} },
  referencias: { nivelActual: 1, estrellas: {} },
  formato: { nivelActual: 1, estrellas: {} },
  logros: ["Bienvenido a Bordo"]
};

const guestNames = ["Explorador", "Curioso", "Estudiante", "Investigador", "Académico", "Lector", "Analista", "Pensador", "Erudito", "Sabio", "Genio", "Maestro", "Doctor", "Profesor", "Científico", "Filósofo", "Autodidacta", "Aprendiz", "Mentor", "Visionario"];

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const btn = loginForm.querySelector('button[type="submit"]');

    try {
      btn.textContent = "Ingresando...";
      btn.disabled = true;

      // 1. Iniciar sesión en Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Recuperar datos locales extra (Avatar/Bio) si existen
      const users = JSON.parse(localStorage.getItem('apaticgamesUsers')) || [];
      const localUser = users.find(u => u.email === user.email);

      // 2. Guardar sesión local para compatibilidad con el resto de la app
      const sessionData = {
        name: (localUser && localUser.name) ? localUser.name : (user.displayName || "Usuario"),
        email: user.email,
        uid: user.uid,
        avatar: (localUser && localUser.avatar) ? localUser.avatar : (user.photoURL || null),
        bio: localUser ? localUser.bio : ""
      };
      localStorage.setItem('apaticgamesSession', JSON.stringify(sessionData));
      
      // RECUPERAR PROGRESO SI EXISTE
      const savedProgress = localStorage.getItem('apaticgames_save_' + user.email);
      const savedStats = localStorage.getItem('apaticgames_stats_' + user.email);

      if (savedProgress) {
        localStorage.setItem('apaticgamesProgreso', savedProgress);
      } else {
        localStorage.setItem('apaticgamesProgreso', JSON.stringify(initialProgress));
      }

      if (savedStats) localStorage.setItem('apaticgamesStats', savedStats);

      showAuthModal("¡Bienvenido!", "Has iniciado sesión correctamente.", "success", "cuenta.html");

    } catch (error) {
      console.error(error);
      let msg = "Error al iniciar sesión.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        msg = "Correo o contraseña incorrectos.";
      }
      if (error.code === 'auth/api-key-not-valid') {
        msg = "Error: La API Key de Firebase no es válida. Revisa firebase-config.js";
      }
      showAuthModal("Error de Ingreso", msg, "error");
      btn.textContent = "Ingresar";
      btn.disabled = false;
    }
  });
}

// Lógica para Google Login
const googleLoginBtn = document.getElementById('googleLoginBtn');
if (googleLoginBtn) {
  googleLoginBtn.addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Recuperar datos locales extra
      const users = JSON.parse(localStorage.getItem('apaticgamesUsers')) || [];
      const localUser = users.find(u => u.email === user.email);

      // Guardar sesión local
      const sessionData = {
        name: (localUser && localUser.name) ? localUser.name : (user.displayName || "Usuario Google"),
        email: user.email,
        uid: user.uid,
        avatar: (localUser && localUser.avatar) ? localUser.avatar : (user.photoURL || null),
        bio: localUser ? localUser.bio : ""
      };
      localStorage.setItem('apaticgamesSession', JSON.stringify(sessionData));

      // RECUPERAR PROGRESO SI EXISTE
      const savedProgress = localStorage.getItem('apaticgames_save_' + user.email);
      const savedStats = localStorage.getItem('apaticgames_stats_' + user.email);

      if (savedProgress) {
        localStorage.setItem('apaticgamesProgreso', savedProgress);
      } else if (!localStorage.getItem('apaticgamesProgreso')) {
        localStorage.setItem('apaticgamesProgreso', JSON.stringify(initialProgress));
        localStorage.setItem('show_welcome_achievement', 'true'); // Bandera para mostrar logro (Solo si es nuevo)
      }

      if (savedStats) localStorage.setItem('apaticgamesStats', savedStats);

      showAuthModal("¡Bienvenido!", "Has iniciado sesión con Google correctamente.", "success", "cuenta.html");

    } catch (error) {
      console.error(error);
      let msg = "Error al ingresar con Google.";
      if (error.code === 'auth/api-key-not-valid') {
        msg = "Error de configuración: La API Key en firebase-config.js es incorrecta.";
      }
      showAuthModal("Error de Google", msg, "error");
    }
  });
}

// Lógica para Ingreso como Invitado (Anónimo)
const guestLoginBtn = document.getElementById('guestLoginBtn');
if (guestLoginBtn) {
  guestLoginBtn.addEventListener('click', async () => {
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

      // REINICIAR PROGRESO PARA INVITADO NUEVO
      localStorage.setItem('apaticgamesProgreso', JSON.stringify(initialProgress));
      localStorage.removeItem('apaticgamesStats'); // Limpiar estadísticas previas
      localStorage.setItem('show_welcome_achievement', 'true'); // Bandera para mostrar logro

      showAuthModal("Modo Invitado", "Has ingresado como invitado. Tu progreso se guardará localmente.", "success", "cuenta.html");

    } catch (error) {
      console.error(error);
      showAuthModal("Error", "No se pudo ingresar como invitado.", "error");
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