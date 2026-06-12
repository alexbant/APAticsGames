// =======================
// 10 DESAFÍOS – DESORDEN LEVE
// =======================
const challenges = [
  {
    sentence: "El aprendizaje significativo se fortalece con la práctica constante (Pérez, 2018).",
    shuffled: "Con la práctica constante se fortalece el aprendizaje significativo (Pérez, 2018).",
    pieces: [
      { text: "Pérez", type: "autor" },
      { text: "2018", type: "año" },
      { text: "El aprendizaje significativo se fortalece con la práctica constante", type: "texto" }
    ]
  },
  {
    sentence: "Según Gómez y Ruiz (2020), la motivación influye en el rendimiento académico.",
    shuffled: "La motivación influye en el rendimiento académico según Gómez y Ruiz (2020).",
    pieces: [
      { text: "Gómez y Ruiz", type: "autor" },
      { text: "2020", type: "año" },
      { text: "la motivación influye en el rendimiento académico", type: "texto" }
    ]
  },
  {
    sentence: "El uso de tecnologías mejora la enseñanza universitaria (López, 2019).",
    shuffled: "Mejora la enseñanza universitaria el uso de tecnologías (López, 2019).",
    pieces: [
      { text: "López", type: "autor" },
      { text: "2019", type: "año" },
      { text: "El uso de tecnologías mejora la enseñanza universitaria", type: "texto" }
    ]
  },
  {
    sentence: "La lectura crítica desarrolla el pensamiento analítico (Martínez, 2017).",
    shuffled: "Desarrolla el pensamiento analítico la lectura crítica (Martínez, 2017).",
    pieces: [
      { text: "Martínez", type: "autor" },
      { text: "2017", type: "año" },
      { text: "La lectura crítica desarrolla el pensamiento analítico", type: "texto" }
    ]
  },
  {
    sentence: "La evaluación continua mejora el aprendizaje (Sánchez, 2021).",
    shuffled: "El aprendizaje mejora mediante la evaluación continua (Sánchez, 2021).",
    pieces: [
      { text: "Sánchez", type: "autor" },
      { text: "2021", type: "año" },
      { text: "La evaluación continua mejora el aprendizaje", type: "texto" }
    ]
  },
  {
    sentence: "El pensamiento lógico se desarrolla con ejercicios constantes (Ramírez, 2020).",
    shuffled: "Con ejercicios constantes se desarrolla el pensamiento lógico (Ramírez, 2020).",
    pieces: [
      { text: "Ramírez", type: "autor" },
      { text: "2020", type: "año" },
      { text: "El pensamiento lógico se desarrolla con ejercicios constantes", type: "texto" }
    ]
  },
  {
    sentence: "La participación activa aumenta la comprensión en clase (Torres y Vega, 2016).",
    shuffled: "Aumenta la comprensión en clase la participación activa (Torres y Vega, 2016).",
    pieces: [
      { text: "Torres y Vega", type: "autor" },
      { text: "2016", type: "año" },
      { text: "La participación activa aumenta la comprensión en clase", type: "texto" }
    ]
  },
  {
    sentence: "El trabajo colaborativo mejora el rendimiento académico (Mendoza, 2019).",
    shuffled: "Mejora el rendimiento académico el trabajo colaborativo (Mendoza, 2019).",
    pieces: [
      { text: "Mendoza", type: "autor" },
      { text: "2019", type: "año" },
      { text: "El trabajo colaborativo mejora el rendimiento académico", type: "texto" }
    ]
  },
  {
    sentence: "La organización del tiempo reduce el estrés estudiantil (Fernández, 2022).",
    shuffled: "Reduce el estrés estudiantil la organización del tiempo (Fernández, 2022).",
    pieces: [
      { text: "Fernández", type: "autor" },
      { text: "2022", type: "año" },
      { text: "La organización del tiempo reduce el estrés estudiantil", type: "texto" }
    ]
  },
  {
    sentence: "Los buenos hábitos de estudio mejoran el aprendizaje (Silva, 2017).",
    shuffled: "Mejoran el aprendizaje los buenos hábitos de estudio (Silva, 2017).",
    pieces: [
      { text: "Silva", type: "autor" },
      { text: "2017", type: "año" },
      { text: "Los buenos hábitos de estudio mejoran el aprendizaje", type: "texto" }
    ]
  }
];

// =========================
// 10 FELICITACIONES ALEATORIAS
// =========================
const goodMessages = [
  "¡Excelente trabajo! <i class='fa-solid fa-bullhorn'></i>",
  "¡Muy bien! Sigue así <i class='fa-solid fa-fire'></i>",
  "¡Perfecto! Estás aprendiendo rápido <i class='fa-solid fa-bolt'></i>",
  "¡Correcto! Vas mejorando mucho <i class='fa-solid fa-book'></i>",
  "¡Increíble! Dominaste este desafío <i class='fa-solid fa-sunglasses'></i>",
  "¡Lo hiciste genial! <i class='fa-solid fa-thumbs-up'></i>",
  "¡Exacto! Muy buena comprensión <i class='fa-solid fa-brain'></i>",
  "¡Bien! Identificaste cada parte sin problemas <i class='fa-solid fa-star'></i>",
  "¡Felicidades! Gran avance <i class='fa-solid fa-rocket'></i>",
  "¡Bravo! Respuesta impecable <i class='fa-solid fa-trophy'></i>"
];

let current = 0;
let score = 0;
let dragged = null;
let answered = false;

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");

const sentenceEl = document.getElementById("sentence");
const piecesEl = document.getElementById("pieces");
const dropzones = document.querySelectorAll(".dropzone");
const progress = document.getElementById("progress");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

// Estandarización de Introducción
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 2</span>
    <h1>Anatomía de la Cita</h1>
    <p class="intro-desc">Una cita tiene 3 piezas clave. Aprende a identificarlas.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-puzzle-piece"></i> Piezas</h3>
      <ul style="list-style: none; padding: 0;">
        <li><i class="fa-solid fa-user"></i> <span><strong>Autor</strong> (Apellido)</span></li>
        <li><i class="fa-solid fa-calendar"></i> <span><strong>Año</strong> (Fecha)</span></li>
        <li><i class="fa-solid fa-quote-left"></i> <span><strong>Texto</strong> (La idea)</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div><strong>Misión:</strong> Arrastra cada pieza a su contenedor correspondiente.</div>
    </div>
    <button class="btn-primary" onclick="startGame()">Comenzar Desafío</button>
  `;
}

// ==========================
// INICIAR JUEGO
// ==========================
function startGame() {
  intro.classList.add("hidden");
  game.classList.remove("hidden");
  loadChallenge();
}

// ==========================
// CARGAR DESAFÍO
// ==========================
function loadChallenge() {
  dragged = null; // Reiniciar variable de arrastre para evitar errores
  answered = false;
  feedback.classList.add("hidden");
  nextBtn.classList.add("hidden");
  
  // Limpiar colores de zonas anteriores
  dropzones.forEach(z => z.classList.remove("correct", "wrong"));

  const ch = challenges[current];
  progress.textContent = `Desafío ${current + 1} de ${challenges.length}`;

  // La instrucción principal ahora está en la pantalla de introducción.
  sentenceEl.innerHTML = `<strong>Oración desordenada:</strong><br><em>${ch.shuffled}</em>`;

  piecesEl.innerHTML = "";

  dropzones.forEach(z => {
    z.textContent = "";
    z.className = "dropzone";
  });

  ch.pieces.sort(() => Math.random() - 0.5).forEach(p => {
    const div = document.createElement("div");
    div.className = "piece";
    div.textContent = p.text;
    div.dataset.type = p.type;
    div.draggable = true;
    div.style.touchAction = "none"; // Mejorar respuesta táctil

    div.addEventListener("dragstart", () => dragged = div);
    piecesEl.appendChild(div);

    // --- SOPORTE TÁCTIL (MÓVIL) ---
    div.addEventListener("touchstart", (e) => {
      if (answered) return;
      dragged = div;
      div.style.opacity = "0.5"; // Feedback visual
    }, {passive: false});

    div.addEventListener("touchend", (e) => {
      div.style.opacity = "1";
      if (!dragged || answered) return;
      
      // Detectar dónde se soltó el dedo
      const touch = e.changedTouches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      const zone = target ? target.closest('.dropzone') : null;
      const piecesContainer = target ? target.closest('#pieces') : null;

      if (zone) {
        zone.appendChild(dragged);
      } else if (piecesContainer) {
        piecesContainer.appendChild(dragged);
      }
      dragged = null;
    });

    div.addEventListener("touchmove", (e) => {
      if (answered) return;
      e.preventDefault(); // Evitar scroll mientras arrastra
    }, {passive: false});
  });

  // Habilitar botón verificar
  const verifyBtn = document.querySelector("button[onclick='checkAnswer()']");
  if(verifyBtn) {
    verifyBtn.disabled = false;
    verifyBtn.classList.remove("hidden");
  }
}

dropzones.forEach(zone => {
  zone.addEventListener("dragover", e => e.preventDefault());
  zone.addEventListener("drop", () => {
    if (dragged) zone.appendChild(dragged); // Protección contra errores si dragged es null
  });
});

// Permitir devolver piezas al contenedor original (Corrección para móviles)
piecesEl.addEventListener("dragover", e => e.preventDefault());
piecesEl.addEventListener("drop", () => {
  if (dragged) piecesEl.appendChild(dragged);
});

// ==========================
// VERIFICAR RESPUESTA
// ==========================
function checkAnswer() {
  // Validar que todas las zonas tengan una pieza
  const emptyZones = Array.from(dropzones).some(z => !z.querySelector(".piece"));
  if (emptyZones) {
    feedback.className = "feedback error";
    feedback.innerHTML = "<i class='fa-solid fa-hand'></i> ¡Espera! Debes colocar todas las piezas para continuar.";
    feedback.classList.remove("hidden");
    return;
  }

  answered = true;

  let ok = true;
  let errors = [];

  const ch = challenges[current];

  // Ocultar botón verificar para evitar superposición con "Siguiente"
  const verifyBtn = document.querySelector("button[onclick='checkAnswer()']");
  if(verifyBtn) verifyBtn.classList.add("hidden");
  
  // Bloquear piezas para que no se puedan mover más
  document.querySelectorAll('.piece').forEach(p => {
    p.draggable = false;
    p.style.cursor = 'default';
  });

  dropzones.forEach(zone => {
    const piece = zone.querySelector(".piece");
    
    // Limpiar estado previo
    zone.classList.remove("correct", "wrong");

    // Comparación robusta (insensible a mayúsculas/minúsculas)
    if (piece.dataset.type.toLowerCase() !== zone.dataset.type.toLowerCase()) {
      ok = false;
      zone.classList.add("wrong"); // Marcar error visual

      // Buscar el valor correcto ignorando mayúsculas/minúsculas
      const correctValue = ch.pieces.find(p => p.type.toLowerCase() === zone.dataset.type.toLowerCase()).text;

      errors.push(`
        <i class='fa-solid fa-circle-xmark'></i> En <strong>${zone.dataset.type}</strong> colocaste:  
        <span>${piece.textContent}</span><br>

        <i class='fa-solid fa-check'></i> Lo correcto era:  
        <strong>${correctValue}</strong>
      `);
    } else {
      zone.classList.add("correct"); // Marcar acierto visual
    }
  });

  if (ok) {
    score++;
    if (window.playSound) window.playSound('correct');
    const msg = goodMessages[Math.floor(Math.random() * goodMessages.length)];
    showFeedback(true, msg);
  } else {
    if (window.playSound) window.playSound('wrong');
    showFeedback(false, errors.join("<br><br>"));
  }
}

function showFeedback(success, msg) {
  feedback.className = "feedback " + (success ? "success" : "error");
  feedback.innerHTML = msg;
  feedback.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
}

// ==========================
// SIGUIENTE
// ==========================
function nextChallenge() {
  if (!answered) return;
  current++;

  if (current < challenges.length) {
    loadChallenge();
  } else {
    finishGame();
  }
}

// ==========================
// FINAL
// ==========================
function finishGame() {
  // Oculta el juego
  game.classList.add("hidden");

  // Muestra la pantalla final (YA EXISTE EN TU HTML)
  result.classList.remove("hidden");

  // ⭐ calcular estrellas usando la variable CORRECTA
  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;

  let mensaje = "";
  let icono = "";
  if (score === 10) {
    mensaje = "¡Orden Perfecto! 🧩✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-trophy'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Bien Hecho! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-puzzle-piece'></i></div>";
  } else {
    mensaje = "¡Sigue Practicando! 💪";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-book'></i></div>";
  }

  // Mostrar puntuación y estrellas
  const scoreText = document.getElementById("scoreText");
  const stars = document.getElementById("stars");
  if (scoreText) {
    scoreText.innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Has obtenido: <strong>${score} de 10</strong> puntos</div>`;
  }
  if (stars) stars.innerHTML = '<i class="fa-solid fa-star"></i>'.repeat(estrellas);

  // Obtener o crear progreso
  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  // Guardar progreso del nivel
  progreso.citas.estrellas[2] = estrellas;

  if (progreso.citas.nivelActual < 3) {
    progreso.citas.nivelActual = 3;
  }

  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  if (score === challenges.length) {
    unlockAchievement("Rompecabezas de Citas");
    // Nuevo logro adicional por obtener todas las respuestas correctas
    setTimeout(() => unlockAchievement("Mente Maestra del Orden"), 4500);
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
