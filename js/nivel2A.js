const challenges = [
  { autor: "Pérez, J.", año: "(2021)", título: "Educación moderna", fuente: "Revista Educativa" },
  { autor: "Gómez, L.", año: "(2019)", título: "Aprender a investigar", fuente: "Editorial Saber" },
  { autor: "Ruiz, M.", año: "(2020)", título: "Metodología científica", fuente: "Ciencia Hoy" },
  { autor: "Torres, A.", año: "(2018)", título: "Educación digital", fuente: "Revista Pedagógica" },
  { autor: "López, C.", año: "(2022)", título: "APA paso a paso", fuente: "Guía Académica" },
  { autor: "Martínez, R.", año: "(2017)", título: "Investigación básica", fuente: "Editorial Nova" },
  { autor: "Fernández, P.", año: "(2021)", título: "Escritura académica", fuente: "Red Académica" },
  { autor: "Sánchez, D.", año: "(2023)", título: "Normas APA 7", fuente: "Manual Universitario" },
  { autor: "Castro, F.", año: "(2016)", título: "Redacción científica", fuente: "Ciencia Global" },
  { autor: "Vega, H.", año: "(2020)", título: "Cómo citar fuentes", fuente: "Editorial Estudio" }
];

let current = 0;
let score = 0;
let answered = false;
let currentDragData = null; // Para soporte táctil

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const parts = document.getElementById("parts");
const zones = document.querySelectorAll(".zone");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const checkBtn = document.getElementById("checkBtn");
const nextBtn = document.getElementById("nextBtn");

// Estandarización de Introducción
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 2</span>
    <h1>Nivel 2: Estructura de Referencias</h1>
    <p class="intro-desc">El ADN de una referencia tiene 4 preguntas clave.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-cubes"></i> Los 4 Elementos</h3>
      <ul style="list-style: none; padding: 0;">
        <li><i class="fa-solid fa-user"></i> <span><strong>¿Quién?</strong> (Autor)</span></li>
        <li><i class="fa-solid fa-calendar"></i> <span><strong>¿Cuándo?</strong> (Fecha)</span></li>
        <li><i class="fa-solid fa-book"></i> <span><strong>¿Qué?</strong> (Título)</span></li>
        <li><i class="fa-solid fa-location-dot"></i> <span><strong>¿Dónde?</strong> (Fuente)</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div><strong>Misión:</strong> Clasifica cada fragmento en su categoría correcta.</div>
    </div>
    <button class="btn-primary" onclick="startGame()">Comenzar desafío</button>
  `;
}

function startGame() {
  intro.classList.add("hidden");
  game.classList.remove("hidden");
  loadChallenge();
}

// Inyectar estilos para el resaltado al arrastrar
const style = document.createElement('style');
style.innerHTML = `
  .zone.drag-over {
    border-style: dashed;
    border-color: var(--primary-color, #0f3c78);
    background-color: rgba(15, 60, 120, 0.05);
  }`;
document.head.appendChild(style);

function loadChallenge() {
  progress.textContent = `Desafío ${current + 1} de 10`;
  parts.innerHTML = "";
  feedback.classList.add("hidden");
  checkBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  answered = false;

  zones.forEach(z => {
    // Mostrar siempre con mayúscula inicial para que se vea bien (ej: "autor" -> "Autor")
    const label = z.dataset.type.charAt(0).toUpperCase() + z.dataset.type.slice(1);
    z.innerHTML = label;
    z.style.pointerEvents = "auto"; // Reactivar interacción
    z.dataset.filled = "";
    z.dataset.text = "";
  });

  const entries = Object.entries(challenges[current]).sort(() => Math.random() - 0.5);

  entries.forEach(([type, text]) => {
    const div = document.createElement("div");
    div.className = "part";
    div.textContent = text;
    div.draggable = true;
    div.dataset.type = type;
    div.style.touchAction = "none"; // Mejorar respuesta táctil

    div.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", text);
      e.dataTransfer.setData("type", type);
    });

    // --- SOPORTE TÁCTIL (MÓVIL) ---
    div.addEventListener("touchstart", (e) => {
      if (answered) return;
      currentDragData = { text, type };
      div.style.opacity = "0.5";
    }, {passive: false});

    div.addEventListener("touchend", (e) => {
      div.style.opacity = "1";
      if (!currentDragData || answered) return;

      const touch = e.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const zone = target ? target.closest('.zone') : null;

      if (zone) {
        // Simular la lógica del evento 'drop'
        handleDrop(zone, currentDragData.text, currentDragData.type);
      }
      currentDragData = null;
    });

    div.addEventListener("touchmove", (e) => {
      if (answered) return;
      e.preventDefault();
    }, {passive: false});

    parts.appendChild(div);
  });

  zones.forEach(zone => {
    // --- Mejora de UX: Resaltado al arrastrar sobre la zona ---
    zone.ondragenter = () => zone.classList.add("drag-over");
    zone.ondragleave = () => zone.classList.remove("drag-over");
    zone.ondragover = e => e.preventDefault();

    zone.ondrop = e => {
      e.preventDefault();
      zone.classList.remove("drag-over");

      handleDrop(zone, e.dataTransfer.getData("text"), e.dataTransfer.getData("type"));
    };

    // Permitir limpiar la zona al hacer clic/touch (Corrección para móviles)
    zone.onclick = () => {
      if (zone.dataset.filled) {
        // Restaurar etiqueta original
        const label = zone.dataset.type.charAt(0).toUpperCase() + zone.dataset.type.slice(1);
        zone.innerHTML = label;
        zone.dataset.filled = "";
        zone.dataset.text = "";
      }
    };
  });
}

// Función auxiliar para manejar el soltado (reutilizable mouse/touch)
function handleDrop(zone, text, type) {
  const label = zone.dataset.type.charAt(0).toUpperCase() + zone.dataset.type.slice(1);
  zone.innerHTML = `<strong>${label}:</strong>&nbsp;${text}`;
  zone.dataset.filled = type;
  zone.dataset.text = text;
  checkBtn.classList.remove("hidden");
}

function checkAnswer() {
  // Validar que todas las zonas estén llenas
  const emptyZones = Array.from(zones).some(z => !z.dataset.filled);
  if (emptyZones) {
    feedback.className = "feedback error";
    feedback.innerHTML = "<i class='fa-solid fa-hand'></i> ¡Espera! Arrastra todas las partes a su lugar para continuar.";
    feedback.classList.remove("hidden");
    return;
  }

  answered = true;

  let errors = [];
  
  // Bloquear interacción con las zonas
  zones.forEach(z => z.style.pointerEvents = "none");

  zones.forEach(zone => {
    // Comparación robusta (insensible a mayúsculas/minúsculas)
    if ((zone.dataset.filled || "").toLowerCase() !== zone.dataset.type.toLowerCase()) {
      // Buscar la respuesta correcta ignorando mayúsculas en la clave
      const correctKey = Object.keys(challenges[current]).find(k => k.toLowerCase() === zone.dataset.type.toLowerCase());
      
      errors.push({
        zona: zone.dataset.type,
        puesto: zone.dataset.text,
        correcto: challenges[current][correctKey] // Usar la clave encontrada
      });
    }
  });

  feedback.classList.remove("hidden");

  if (errors.length === 0) {
    score++;
    if (window.playSound) window.playSound('correct');
    feedback.className = "feedback ok";
    feedback.innerHTML = "<i class='fa-solid fa-circle-check'></i> ¡Excelente! Todas las partes están correctamente identificadas.";
  } else {
    if (window.playSound) window.playSound('wrong');
    feedback.className = "feedback error";

    let msg = "<i class='fa-solid fa-circle-xmark'></i> Revisa lo siguiente:<br><br>";

    errors.forEach(err => {
      const puestoText = err.puesto ? `"${err.puesto}"` : "Nada";
      msg += `• <strong>${puestoText}</strong> no corresponde a ${err.zona}.<br>`;
      msg += `  <i class='fa-solid fa-check'></i> La respuesta correcta es: "<strong>${err.correcto}</strong>".<br><br>`;
    });

    msg += "<i class='fa-solid fa-lightbulb'></i> Recuerda identificar cada parte según su función en la referencia APA.";

    feedback.innerHTML = msg;
  }

  nextBtn.classList.remove("hidden");
  checkBtn.classList.add("hidden");
}

function nextChallenge() {
  if (!answered) return;
  current++;
  current < challenges.length ? loadChallenge() : finishGame();
}

function finishGame() {
  game.classList.add("hidden");
  result.classList.remove("hidden"); // ✅

  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;

  // Mostrar puntuación y estrellas
  const scoreText = document.getElementById("scoreText");
  const stars = document.getElementById("stars");

  let mensaje = "";
  let icono = "";
  if (score === 10) {
    mensaje = "¡Perfección Absoluta! 🌟🏆🎉";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-dna'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Muy Buen Trabajo! 👍✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-microscope'></i></div>";
  } else {
    mensaje = "¡Puedes Mejorar! 💪📚";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-flask'></i></div>";
  }

  if (scoreText) {
    scoreText.innerHTML = `
    <div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Has obtenido: <strong>${score} de 10</strong> puntos</div>`;
  }
  if (stars) {
    stars.innerHTML = '<i class="fa-solid fa-star" style="color: #fbbf24; font-size: 2rem; margin: 0 5px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));"></i>'.repeat(estrellas);
  }

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  progreso.referencias.estrellas[2] = estrellas;
  if (progreso.referencias.nivelActual < 3) {
    progreso.referencias.nivelActual = 3;
  }

  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  if (score === challenges.length) {
    unlockAchievement("Anatomía de la Referencia");
    setTimeout(() => unlockAchievement("Cirujano de Fuentes"), 4500);
  }
}

function unlockAchievement(name) {
  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {};
  if (!progreso.logros) progreso.logros = [];

  if (!progreso.logros.includes(name)) {
    progreso.logros.push(name);
    localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));
    showNotification(name);
  }
}

function showNotification(name) {
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
