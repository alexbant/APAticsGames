// ==========================================
// CONFIGURACIÓN GLOBAL Y UTILIDADES
// ==========================================
const AUDIO_KEY = 'apaticgames_audio_v1'; // Clave nueva para reiniciar configuración limpia
const NOTIF_KEY = 'apaticgames_notif_v1'; // Clave para notificaciones

// 1. MODO OSCURO (Con protección contra errores de memoria)
const toggle = document.getElementById('darkModeToggle');

try {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    if (toggle) toggle.checked = true;
  }
} catch(e) { console.warn('No se pudo leer modo oscuro'); }

if (toggle) {
  toggle.addEventListener('change', () => {
    try {
      if (toggle.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled');
        if (window.showNotification) window.showNotification('<i class="fa-solid fa-moon"></i> Modo oscuro activado', 'success');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled');
        if (window.showNotification) window.showNotification('<i class="fa-solid fa-sun"></i> Modo claro activado', 'info');
      }
    } catch(e) {
      console.warn('Memoria llena, no se guardó el modo oscuro');
    }
  });
}

// 2. LOGOS Y NAVEGACIÓN
document.addEventListener('DOMContentLoaded', () => {
  // Reemplazo de logos
  document.querySelectorAll('.logo').forEach(el => {
    if (el.querySelector('img')) return;
    const text = (el.textContent || '').trim().toLowerCase();
    if (text.includes('apaticgames') || text.length > 0) {
      el.innerHTML = '<img src="/images/image-Photoroom.png" alt="APAticGames Logo">';
    }
  });

  // Reemplazo seguro de texto antiguo "TECHPLAY" por "APAticGames"
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while(node = walker.nextNode()) {
    if (node.nodeValue.includes('TECHPLAY')) {
      node.nodeValue = node.nodeValue.replace(/TECHPLAY/g, 'APAticGames');
    }
  }

  // Menú de perfil dinámico
  setupProfileMenu();

  // ==========================================
  // 3. LÓGICA DEL INTERRUPTOR DE SONIDO
  // ==========================================
  const soundToggle = document.getElementById('soundToggle');
  
  if (soundToggle) {
    // Sincronizar estado al cargar
    const currentPref = getAudioPreference();
    // Si es 'off', desmarcar. Si es cualquier otra cosa (null, 'on'), marcar.
    soundToggle.checked = (currentPref !== 'off');

    // Escuchar cambios
    soundToggle.addEventListener('change', () => {
      const newState = soundToggle.checked ? 'on' : 'off';
      setAudioPreference(newState);
      
      // Feedback auditivo solo al activar
      if (newState === 'on' && window.playSound) {
        window.playSound('correct');
      }

      if (newState === 'on') {
        if (window.showNotification) window.showNotification('<i class="fa-solid fa-volume-high"></i> Sonido activado', 'success');
      } else {
        if (window.showNotification) window.showNotification('<i class="fa-solid fa-volume-xmark"></i> Sonido desactivado', 'info');
      }
    });
  }

  // ==========================================
  // 4. LÓGICA DE NOTIFICACIONES (INTERRUPTOR)
  // ==========================================
  const notifToggle = document.getElementById('notifToggle');
  if (notifToggle) {
    // Cargar estado (por defecto activado 'on')
    const notifPref = localStorage.getItem(NOTIF_KEY);
    notifToggle.checked = (notifPref === 'on');

    notifToggle.addEventListener('change', () => {
      const newState = notifToggle.checked ? 'on' : 'off';
      localStorage.setItem(NOTIF_KEY, newState);
      if (newState === 'on' && window.showNotification) window.showNotification('<i class="fa-solid fa-bell"></i> Notificaciones activadas', 'success');
    });
  }
});

// ==========================================
// 2.1 MENÚ DE PERFIL DINÁMICO
// ==========================================
function setupProfileMenu() {
  const session = JSON.parse(localStorage.getItem('apaticgamesSession'));
  const navContainer = document.querySelector('header nav');
  if (!navContainer) return;

  const loginLink = navContainer.querySelector('a[href="ingresar.html"]');
  const logoutLink = Array.from(navContainer.querySelectorAll('a')).find(a => a.textContent.trim() === 'Salir');

  if (session) {
    // Usuario logueado: quitar "Ingresar" y "Salir", poner menú de perfil
    if (loginLink) loginLink.remove();
    if (logoutLink) logoutLink.remove();

    const avatarSrc = session.avatar;
    const avatarHTML = avatarSrc
      ? `<img src="${avatarSrc}" alt="Avatar">`
      : `<i class="fa-solid fa-user"></i>`;

    const menuHTML = `
      <div class="profile-menu">
        <div class="profile-avatar" id="profileAvatarBtn">
          ${avatarHTML}
        </div>
        <div class="profile-dropdown" id="profileDropdown">
          <a href="cuenta.html"><i class="fa-solid fa-circle-user"></i> Ver Cuenta</a>
          <div class="divider"></div>
          <a href="#" id="profileLogoutBtn"><i class="fa-solid fa-right-from-bracket"></i> Cerrar Sesión</a>
        </div>
      </div>
    `;
    navContainer.insertAdjacentHTML('beforeend', menuHTML);

    const avatarBtn = document.getElementById('profileAvatarBtn');
    const dropdown = document.getElementById('profileDropdown');
    const logoutBtn = document.getElementById('profileLogoutBtn');

    avatarBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.remove('show');
      showConfirmModal("Cerrar Sesión", "¿Cerrar sesión? Tu progreso se guardará para la próxima vez.", () => {
        if (session && session.email) {
          localStorage.setItem('apaticgames_save_' + session.email, localStorage.getItem('apaticgamesProgreso') || '{}');
          localStorage.setItem('apaticgames_stats_' + session.email, localStorage.getItem('apaticgamesStats') || '{}');
        }
        localStorage.removeItem('apaticgamesSession');
        localStorage.removeItem('apaticgamesProgreso');
        localStorage.removeItem('apaticgamesStats');
        window.location.href = 'ingresar.html';
      });
    });

    document.addEventListener('click', () => {
      if (dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');
      }
    });

  } else {
    // Usuario no logueado: asegurar que "Salir" no esté
    if (logoutLink) logoutLink.remove();
  }
}

// ==========================================
// 4. FUNCIONES DE GESTIÓN DE AUDIO (ROBUSTAS)
// ==========================================

// Leer preferencia (Prioridad: Session -> Local -> Default 'on')
function getAudioPreference() {
  try {
    const sessionVal = sessionStorage.getItem(AUDIO_KEY);
    if (sessionVal) return sessionVal;

    const localVal = localStorage.getItem(AUDIO_KEY);
    if (localVal) return localVal;
  } catch (e) {
    console.warn("Error leyendo audio pref:", e);
  }
  return 'on'; // Por defecto encendido
}

// Guardar preferencia (Intenta en ambos, no falla si uno está lleno)
function setAudioPreference(val) {
  // 1. SessionStorage (Siempre funciona mientras la pestaña esté abierta)
  try { sessionStorage.setItem(AUDIO_KEY, val); } catch(e) {}

  // 2. LocalStorage (Persistencia, puede fallar si está lleno)
  try { localStorage.setItem(AUDIO_KEY, val); } catch(e) {
    console.warn("LocalStorage lleno, configuración guardada solo para esta sesión.");
  }
}

// ==========================================
// 5. SISTEMA DE SONIDOS (Web Audio API)
// ==========================================
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = AudioContext ? new AudioContext() : null;

window.playSound = function(type) {
  if (!audioCtx) return;

  // Verificar preferencia antes de reproducir
  if (getAudioPreference() === 'off') return;

  // Reactivar contexto si el navegador lo suspendió
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  const now = audioCtx.currentTime;

  // Generador de tonos
  const playTone = (freq, type, duration, vol = 0.1) => {
    const osc = audioCtx.createOscillator();
    const gn = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    
    gn.gain.setValueAtTime(vol, now);
    gn.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc.connect(gn);
    gn.connect(audioCtx.destination);
    
    osc.start(now);
    osc.stop(now + duration);
  };

  if (type === 'click') {
    // Sonido de click mejorado: más corto y nítido (tipo "pop" de interfaz moderna)
    playTone(1000, 'sine', 0.08, 0.05);
  } else if (type === 'correct') {
    // Acorde de éxito
    playTone(523.25, 'sine', 0.4, 0.1);
    setTimeout(() => playTone(659.25, 'sine', 0.4, 0.1), 50);
    setTimeout(() => playTone(783.99, 'sine', 0.6, 0.08), 100);
  } else if (type === 'wrong') {
    // Sonido de error
    playTone(150, 'triangle', 0.3, 0.15);
    playTone(140, 'sawtooth', 0.3, 0.05);
  } else if (type === 'achievement') {
    // Sonido de logro (fanfarria)
    playTone(523.25, 'sine', 0.1, 0.1); // Do
    setTimeout(() => playTone(659.25, 'sine', 0.1, 0.1), 80); // Mi
    setTimeout(() => playTone(783.99, 'sine', 0.1, 0.1), 160); // Sol
    setTimeout(() => playTone(1046.50, 'sine', 0.4, 0.1), 240); // Do (octava arriba)
  }
};

// Interacción global para clicks
document.addEventListener('click', (e) => {
  // Selector expandido para cubrir todos los elementos interactivos
  const target = e.target.closest('button, a, input, select, textarea, .option, .card, .piece, .part, .ref-part, .choice, .avatar, .logo, .btn, [role="button"], [onclick]');
  if (target && target.id !== 'soundToggle') {
    window.playSound('click');
  }
});

// ==========================================
// 6. SISTEMA DE NOTIFICACIONES VISUALES (TOASTS)
// ==========================================
// Inyectamos los estilos CSS dinámicamente para no depender de archivos externos
const toastStyle = document.createElement('style');
toastStyle.innerHTML = `
  .toast-notification {
    position: fixed;
    top: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: #1e293b;
    color: #fff;
    padding: 12px 24px;
    border-radius: 50px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    z-index: 10000;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 10px;
    pointer-events: none;
  }
  .toast-notification.show { transform: translateX(-50%) translateY(0); opacity: 1; }
  .toast-notification.success { background: #10b981; color: white; }
  .toast-notification.error { background: #ef4444; color: white; }
  .toast-notification.info { background: #3b82f6; color: white; }

  /* Estilos para Logros (Achievements) - Asegurando que se vean arriba */
  .achievement-notification {
    position: fixed;
    top: 30px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    background: var(--card-bg, #ffffff);
    color: var(--text-color, #1e293b);
    border-left: 5px solid #f59e0b;
    padding: 15px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 10000;
    animation: slideInTop 0.5s ease forwards;
    max-width: 320px;
  }
  .achievement-notification .icon { font-size: 24px; color: #f59e0b; }
  .achievement-notification .text { display: flex; flex-direction: column; }
  .achievement-notification .text strong { font-size: 14px; color: var(--primary-color, #1e3a8a); margin-bottom: 2px; }
  .achievement-notification .text span { font-size: 13px; color: var(--text-muted, #64748b); }
  .achievement-notification.hide { animation: slideOutTop 0.5s ease forwards; }
  
  @keyframes slideInRight { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }
  
  @keyframes slideInTop { from { transform: translateX(-50%) translateY(-100%); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
  @keyframes slideOutTop { from { transform: translateX(-50%) translateY(0); opacity: 1; } to { transform: translateX(-50%) translateY(-100%); opacity: 0; } }

  /* Fix global para Drag & Drop en móviles */
  [draggable="true"], .piece, .part { touch-action: none; }
`;
document.head.appendChild(toastStyle);

window.showNotification = function(message, type = 'info') {
  if (localStorage.getItem(NOTIF_KEY) === 'off') return;
  const toast = document.createElement('div');
  toast.className = `toast-notification ${type}`;
  toast.innerHTML = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
};

// ==========================================
// 7. TRACKING DE TIEMPO (GLOBAL)
// ==========================================
setInterval(() => {
  // Solo contar si la pestaña está visible para ser más precisos
  if (!document.hidden) {
    const stats = JSON.parse(localStorage.getItem('apaticgamesStats')) || { timePlayed: 0 };
    stats.timePlayed = (stats.timePlayed || 0) + 1; // Sumar 1 minuto
    localStorage.setItem('apaticgamesStats', JSON.stringify(stats));
  }
}, 60000); // Ejecutar cada 60 segundos

// ==========================================
// 8. SOPORTE TÁCTIL PARA DRAG & DROP (MÓVIL)
// ==========================================
(function() {
  let dragSrc = null;
  let dragData = {};
  let dragImage = null;
  let xOffset = 0;
  let yOffset = 0;

  function touchStart(e) {
    const target = e.target.closest('[draggable="true"]');
    if (!target) return;
    
    dragSrc = target;
    dragData = {};

    // Crear imagen fantasma para feedback visual
    const rect = target.getBoundingClientRect();
    const touch = e.touches[0];
    xOffset = touch.clientX - rect.left;
    yOffset = touch.clientY - rect.top;

    dragImage = target.cloneNode(true);
    dragImage.style.cssText = `
      position: fixed; top: ${rect.top}px; left: ${rect.left}px;
      width: ${rect.width}px; height: ${rect.height}px;
      z-index: 9999; opacity: 0.8; pointer-events: none;
      transform: scale(1.05); box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(dragImage);
    
    const evt = new Event('dragstart', { bubbles: true, cancelable: true });
    evt.dataTransfer = {
      setData: (type, val) => { dragData[type] = val; },
      effectAllowed: 'move',
      dropEffect: 'move'
    };
    target.dispatchEvent(evt);
  }

  function touchMove(e) {
    if (!dragSrc) return;
    e.preventDefault(); // Evitar scroll mientras se arrastra

    const touch = e.touches[0];
    
    // Mover imagen fantasma
    if (dragImage) {
      dragImage.style.left = (touch.clientX - xOffset) + 'px';
      dragImage.style.top = (touch.clientY - yOffset) + 'px';
    }

    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    if (target) {
      const evt = new MouseEvent('dragover', {
        bubbles: true,
        cancelable: true,
        clientX: touch.clientX,
        clientY: touch.clientY,
        view: window
      });
      evt.dataTransfer = {
        dropEffect: 'move',
        types: Object.keys(dragData)
      };
      target.dispatchEvent(evt);
    }
  }

  function touchEnd(e) {
    if (!dragSrc) return;
    e.preventDefault();

    // Eliminar imagen fantasma
    if (dragImage) {
      dragImage.remove();
      dragImage = null;
    }

    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);

    if (target) {
      const evt = new MouseEvent('drop', {
        bubbles: true,
        cancelable: true,
        clientX: touch.clientX,
        clientY: touch.clientY,
        view: window
      });
      evt.dataTransfer = {
        getData: (type) => dragData[type],
        types: Object.keys(dragData)
      };
      target.dispatchEvent(evt);
    }

    const endEvt = new Event('dragend', { bubbles: true });
    dragSrc.dispatchEvent(endEvt);
    
    dragSrc = null;
    dragData = {};
  }

  document.addEventListener('touchstart', touchStart, { passive: false });
  document.addEventListener('touchmove', touchMove, { passive: false });
  document.addEventListener('touchend', touchEnd, { passive: false });
})();

// Inyectar estilos para el menú de perfil
(function() {
  const profileMenuStyles = document.createElement('style');
  profileMenuStyles.innerHTML = `
    .profile-menu {
      position: relative;
      display: flex;
      align-items: center;
    }
    .profile-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--hover-bg);
      border: 2px solid var(--primary-color);
      overflow: hidden;
    }
    .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .profile-avatar .fa-user { color: var(--primary-color); font-size: 1.1rem; }
    .profile-dropdown {
      position: absolute;
      top: 130%;
      right: 0;
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: var(--card-shadow);
      width: 180px;
      padding: 8px;
      z-index: 100;
      border: 1px solid var(--border-color);
      opacity: 0; transform: translateY(-10px); pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .profile-dropdown.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
    .profile-dropdown a { display: block; padding: 10px 12px; color: var(--text-color) !important; text-decoration: none; border-radius: 8px; font-size: 0.9rem; }
    .profile-dropdown a:hover { background: var(--hover-bg); color: var(--primary-color) !important; }
    .profile-dropdown a i { margin-right: 10px; width: 16px; text-align: center; }
    .profile-dropdown .divider { height: 1px; background: var(--border-color); margin: 8px 0; }
  `;
  document.head.appendChild(profileMenuStyles);
})();

// ==========================================
// 9. MODAL DE CONFIRMACIÓN GLOBAL
// ==========================================
function showConfirmModal(title, message, onConfirm) {
  const existing = document.getElementById('customModal');
  if (existing) existing.remove();

  const modalHtml = `
    <div id="customModal" class="modal-backdrop" style="z-index: 99999; display: flex; align-items: center; justify-content: center; position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);">
      <div class="modal" style="background: var(--card-bg, #fff); padding: 30px; border-radius: 20px; text-align: center; max-width: 360px; width: 90%; box-shadow: 0 20px 50px rgba(0,0,0,0.3); animation: popIn 0.3s ease;">
        <div style="font-size: 3rem; margin-bottom: 15px; color: #f59e0b;"><i class="fa-solid fa-circle-question"></i></div>
        <h3 style="margin: 0 0 10px 0; font-size: 1.5rem; color: var(--text-color, #1e293b);">${title}</h3>
        <p style="margin: 0 0 20px 0; color: var(--text-muted, #64748b); line-height: 1.5;">${message}</p>
        <div style="display: flex; gap: 10px; justify-content: center;"><button id="cancelBtn" style="flex: 1; border: 1px solid var(--border-color, #ccc); cursor: pointer; padding: 12px; border-radius: 10px; font-weight: 600; background: transparent; color: var(--text-color, #333);">Cancelar</button><button id="confirmBtn" style="flex: 1; border: none; cursor: pointer; padding: 12px; border-radius: 10px; font-weight: 600; background: var(--primary-color, #0f3c78); color: white;">Confirmar</button></div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  document.getElementById('cancelBtn').onclick = () => document.getElementById('customModal').remove();
  document.getElementById('confirmBtn').onclick = () => { document.getElementById('customModal').remove(); onConfirm(); };
}

// ==========================================
// 10. MEJORA DEL FOOTER GLOBAL
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('footer');
  if (footer) {
    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-brand">
          <i class="fa-solid fa-gamepad"></i> APAticGames
        </div>
        <p class="footer-slogan">Aprende jugando, sin apatía.</p>
        <div class="footer-divider"></div>
        <p class="footer-text">&copy; 2025 APAticGames. Todos los derechos reservados.</p>
      </div>
    `;

    const fStyle = document.createElement('style');
    fStyle.innerHTML = `
      footer {
        background: var(--card-bg, #ffffff);
        padding: 40px 20px;
        margin-top: 60px;
        border-top: 1px solid var(--border-color, #e2e8f0);
        text-align: center;
        transition: background 0.3s, border 0.3s;
      }
      .footer-content {
        max-width: 600px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
      }
      .footer-brand {
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--primary-color, #0f3c78);
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .footer-slogan {
        margin: -5px 0 5px;
        font-size: 1rem;
        color: var(--text-muted, #64748b);
        font-style: italic;
      }
      .footer-divider {
        width: 50px;
        height: 3px;
        background: var(--primary-color, #0f3c78);
        border-radius: 2px;
        opacity: 0.3;
      }
      .footer-text {
        color: var(--text-muted, #64748b);
        font-size: 0.9rem;
        margin: 0;
      }
    `;
    document.head.appendChild(fStyle);
  }
});
