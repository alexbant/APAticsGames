/**
 * Muestra una notificación de logro desbloqueado.
 * @param {string} name - El nombre del logro.
 */
function showAchievementNotification(name) {
  if (localStorage.getItem('apaticgames_notif_v1') === 'off') return;

  if (window.playSound) window.playSound('achievement');

  const notif = document.createElement("div");
  notif.className = "achievement-notification";
  notif.innerHTML = `<div class="icon"><i class="fa-solid fa-trophy"></i></div><div class="text"><strong>¡Logro Desbloqueado!</strong><span>${name}</span></div>`;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.classList.add("hide");
    setTimeout(() => notif.remove(), 500);
  }, 4000);
}

/**
 * Desbloquea un logro y lo guarda en el progreso.
 * @param {string} name - El nombre del logro a desbloquear.
 */
function unlockAchievement(name) {
  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {};
  if (!progreso.logros) progreso.logros = [];

  if (!progreso.logros.includes(name)) {
    progreso.logros.push(name);
    localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));
    showAchievementNotification(name);
  }
}

/**
 * Guarda el progreso de un módulo específico.
 * @param {string} module - 'citas', 'referencias', o 'formato'.
 * @param {number} levelId - El ID del nivel completado (e.g., 1, 2, 3).
 * @param {number} stars - El número de estrellas obtenidas (1, 2, o 3).
 */
function saveProgress(module, levelId, stars) {
  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  if (!progreso[module]) {
    console.error(`Módulo "${module}" no válido.`);
    return;
  }

  // Guardar estrellas
  progreso[module].estrellas[levelId] = Math.max(progreso[module].estrellas[levelId] || 0, stars);

  // Desbloquear siguiente nivel
  const nextLevel = levelId + 1;
  if (progreso[module].nivelActual < nextLevel) {
    progreso[module].nivelActual = nextLevel;
  }

  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));
}