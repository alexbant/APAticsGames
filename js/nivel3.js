const challenges = [
  {
    instruction: "Ordena correctamente la cita textual corta con comillas.",
    correct: ["Martínez (2022)", "indica que", "“el aprendizaje es continuo”."],
    explanation: "Las citas textuales cortas van entre comillas y se integran al párrafo."
  },
  {
    instruction: "Construye la cita respetando el uso correcto de comillas.",
    correct: ["Torres (2018)", "explica que", "“la práctica fortalece el conocimiento”."],
    explanation: "El texto citado debe ser literal y llevar comillas."
  },
  {
    instruction: "Ordena la cita corta según APA 7.",
    correct: ["López (2020)", "afirma que", "“la educación transforma vidas”."],
    explanation: "El autor y el año se colocan antes del texto citado."
  },
  {
    instruction: "Completa correctamente la cita textual corta.",
    correct: ["Navarro (2021)", "señala que", "“el pensamiento crítico es esencial”."],
    explanation: "Las comillas son obligatorias en las citas textuales cortas."
  },
  {
    instruction: "Construye la cita integrándola al párrafo.",
    correct: ["Gómez (2019)", "menciona que", "“la motivación es clave”."],
    explanation: "La cita corta forma parte del texto, no va en bloque."
  },
  {
    instruction: "Ordena correctamente la cita.",
    correct: ["Pacheco (2020)", "destaca que", "“la lectura fortalece la comprensión”."],
    explanation: "El punto final se coloca después de las comillas."
  },
  {
    instruction: "Construye la cita textual corta.",
    correct: ["Vargas (2019)", "sostiene que", "“la evaluación guía el aprendizaje”."],
    explanation: "Las comillas indican que el texto es literal."
  },
  {
    instruction: "Ordena la cita respetando APA 7.",
    correct: ["Ramírez (2023)", "afirma que", "“la educación digital avanza rápidamente”."],
    explanation: "La cita debe tener coherencia gramatical."
  },
  {
    instruction: "Completa la cita correctamente.",
    correct: ["Luna (2017)", "indica que", "“el aprendizaje es social”."],
    explanation: "Las citas cortas no se presentan en bloque."
  },
  {
    instruction: "Construye la cita corta de forma correcta.",
    correct: ["Martínez (2022)", "explica que", "“el aprendizaje es continuo”."],
    explanation: "APA 7 exige fidelidad al texto original y uso correcto de comillas."
  }
];

let current = 0;
let score = 0;
let locked = false;

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const dropZone = document.getElementById("dropZone");
const piecesEl = document.getElementById("pieces");
const progressEl = document.getElementById("progress");
const instructionEl = document.getElementById("instruction");
const feedbackEl = document.getElementById("feedback");

// Estandarización de Introducción
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 3</span>
    <h1>Nivel 3: Citas Textuales Cortas</h1>
    <p class="intro-desc">Menos de 40 palabras = Cita Corta. Va dentro del texto.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-quote-right"></i> Reglas de Oro</h3>
      <ul>
        <li><i class="fa-solid fa-check"></i> <span>Usa <strong>comillas</strong> "".</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Punto <strong>después</strong> del paréntesis ( ).</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Se integra en tu párrafo.</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div><strong>Misión:</strong> Ordena los fragmentos para formar una cita corta perfecta.</div>
    </div>
    <button class="btn-primary" onclick="startGame()">Comenzar desafío</button>
  `;
}

function startGame() {
  intro.classList.add("hidden");
  game.classList.remove("hidden");
  loadChallenge();
}

function loadChallenge() {
  locked = false;

  const ch = challenges[current];
  progressEl.textContent = `Desafío ${current + 1} de 10`;
  instructionEl.textContent = ch.instruction;

  dropZone.innerHTML = "";
  piecesEl.innerHTML = "";
  feedbackEl.classList.add("hidden");

  const shuffled = [...ch.correct].sort(() => Math.random() - 0.5);

  shuffled.forEach(text => {
    const piece = createPiece(text);
    piecesEl.appendChild(piece);
  });
}

function createPiece(text) {
  const piece = document.createElement("div");
  piece.className = "piece";
  piece.textContent = text;
  piece.draggable = true;
  piece.style.touchAction = "none"; // Mejorar respuesta táctil

  piece.addEventListener("dragstart", () => {
    if (locked) return;
    piece.classList.add("dragging");
  });

  piece.addEventListener("dragend", () => {
    piece.classList.remove("dragging");
  });

  // Soporte para dispositivos táctiles (Móvil/Tablet)
  piece.addEventListener("touchstart", (e) => {
    if (locked) return;
    piece.classList.add("dragging");
  }, {passive: false});

  piece.addEventListener("touchend", () => {
    piece.classList.remove("dragging");
  });

  piece.addEventListener("touchmove", (e) => {
    if (locked) return;
    e.preventDefault(); // Evitar scroll
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    const container = target ? (target.closest('#dropZone') || target.closest('#pieces')) : null;
    
    if (container) {
      const after = getAfterElement(container, touch.clientX, touch.clientY);
      if (after) {
        container.insertBefore(piece, after);
      } else {
        container.appendChild(piece);
      }
    }
  }, {passive: false});

  return piece;
}

function getAfterElement(container, x, y) {
  const elements = [...container.querySelectorAll(".piece:not(.dragging)")];

  // Buscar el primer elemento que esté "después" del cursor (visualmente)
  for (const element of elements) {
    const box = element.getBoundingClientRect();
    // Si el cursor está claramente arriba de este elemento (fila anterior), insertamos aquí
    if (y < box.top) return element;
    // Si el cursor está en la misma fila y a la izquierda del centro del elemento
    if (y >= box.top && y <= box.bottom && x < box.left + box.width / 2) {
      return element;
    }
  }
  return null;
}

// DropZone: permite ordenar
dropZone.addEventListener("dragover", e => {
  e.preventDefault();
  if (locked) return;

  const dragging = document.querySelector(".dragging");
  if (!dragging) return;

  const after = getAfterElement(dropZone, e.clientX, e.clientY);
  after ? dropZone.insertBefore(dragging, after) : dropZone.appendChild(dragging);
});

// Pieces: permite regresar piezas
piecesEl.addEventListener("dragover", e => {
  e.preventDefault();
  if (locked) return;

  const dragging = document.querySelector(".dragging");
  if (dragging) piecesEl.appendChild(dragging);
});

function checkAnswer() {
  if (locked) return;
  locked = true;

  const userOrder = [...dropZone.children].map(p => p.textContent);
  const correctOrder = challenges[current].correct;

  feedbackEl.classList.remove("hidden");

  if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
    score++;
    if (window.playSound) window.playSound('correct');
    feedbackEl.className = "feedback ok";
    feedbackEl.innerHTML = "<i class='fa-solid fa-circle-check'></i> Correcto. Uso adecuado de comillas.";
  } else {
    if (window.playSound) window.playSound('wrong');
    feedbackEl.className = "feedback error";
    feedbackEl.innerHTML = `
      <i class='fa-solid fa-circle-xmark'></i> Incorrecto.<br>
      <strong>Explicación:</strong> ${challenges[current].explanation}<br>
      <strong>Forma correcta:</strong> ${correctOrder.join(" ")}
    `;
  }

  setTimeout(() => {
    current++;
    current < challenges.length ? loadChallenge() : finishGame();
  }, 3500);
}

function finishGame() {
  // Ocultar juego
  game.classList.add("hidden");

  // ⭐ Calcular estrellas
  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;

  // Mostrar pantalla final (EXISTE)
  result.classList.remove("hidden");

  let mensaje = "";
  let icono = "";
  if (score === 10) {
    mensaje = "¡Citas Maestras! 🌟";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-graduation-cap'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Buen Trabajo! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-pen-to-square'></i></div>";
  } else {
    mensaje = "¡A Repasar! 📚";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-book-open'></i></div>";
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
  progreso.citas.estrellas[3] = estrellas;

  if (progreso.citas.nivelActual < 4) {
    progreso.citas.nivelActual = 4;
  }

  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  // Verificar logro
  if (score === challenges.length) {
    unlockAchievement("Experto en Citas");
    // Nuevo logro adicional por obtener todas las respuestas correctas
    setTimeout(() => unlockAchievement("Citas Impecables"), 4500);
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
