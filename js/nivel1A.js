const challenges = [
  {
    question: "¿Qué es una referencia APA?",
    correct: "Información completa de la fuente utilizada",
    options: [
      "Un resumen del texto",
      "Información completa de la fuente utilizada",
      "Una opinión personal"
    ]
  },
  {
    question: "¿Para qué sirven las referencias?",
    correct: "Dar crédito a los autores",
    options: [
      "Decorar el trabajo",
      "Dar crédito a los autores",
      "Reducir páginas"
    ]
  },
  {
    question: "¿Qué norma se utiliza?",
    correct: "APA 7",
    options: ["ISO", "APA 7", "MLA"]
  },
  {
    question: "¿Las referencias ayudan a evitar…?",
    correct: "El plagio",
    options: ["Errores", "El plagio", "Introducciones largas"]
  },
  {
    question: "¿Dónde van las referencias?",
    correct: "Al final del documento",
    options: ["Portada", "Introducción", "Al final del documento"]
  },
  {
    question: "¿Una referencia identifica…?",
    correct: "La fuente original",
    options: ["El resumen", "La fuente original", "La opinión"]
  },
  {
    question: "¿Incluyen autor?",
    correct: "Sí",
    options: ["No", "Sí", "A veces"]
  },
  {
    question: "¿Incluyen año?",
    correct: "Sí",
    options: ["No", "Sí", "Solo libros"]
  },
  {
    question: "¿Son obligatorias?",
    correct: "Sí, en trabajos académicos",
    options: ["No", "Sí, en trabajos académicos", "Solo tesis"]
  },
  {
    question: "¿Aumentan la credibilidad?",
    correct: "Sí",
    options: ["No", "Sí", "Depende"]
  }
];

let current = 0;
let score = 0;
let selected = null;

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const feedbackEl = document.getElementById("feedback");
const verifyBtn = document.getElementById("verifyBtn");

// Inyectar estilos para feedback visual en opciones
const style = document.createElement('style');
style.innerHTML = `
  .option.correct {
    background-color: #dcfce7 !important;
    border-color: #22c55e !important;
    color: #14532d !important;
  }
  .option.wrong {
    background-color: #fee2e2 !important;
    border-color: #ef4444 !important;
    color: #7f1d1d !important;
  }
  body.dark .option.correct {
    background-color: rgba(34, 197, 94, 0.2) !important;
    border-color: #4ade80 !important;
    color: #d1fae5 !important;
  }
  body.dark .option.wrong {
    background-color: rgba(239, 68, 68, 0.2) !important;
    border-color: #f87171 !important;
    color: #fee2e2 !important;
  }
`;
document.head.appendChild(style);

// Estandarización de Introducción
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 1</span>
    <h1>Fundamentos de Referencias</h1>
    <p class="intro-desc">La lista de referencias permite al lector encontrar tus fuentes.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-list"></i> ¿Para qué sirven?</h3>
      <ul style="list-style: none; padding: 0;">
        <li><i class="fa-solid fa-magnifying-glass"></i> <span><strong>Localizar:</strong> Llevan a la fuente original.</span></li>
        <li><i class="fa-solid fa-star"></i> <span><strong>Crédito:</strong> Reconocen al autor.</span></li>
        <li><i class="fa-solid fa-check"></i> <span><strong>Validez:</strong> Demuestran investigación.</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div><strong>Misión:</strong> Responde preguntas básicas sobre la lista de referencias.</div>
    </div>
    <button onclick="startGame()" class="btn-primary">Comenzar Desafío</button>
  `;
}

function startGame() {
  intro.classList.add("hidden");
  game.classList.remove("hidden");
  loadChallenge();
}

function loadChallenge() {
  progressEl.textContent = `Desafío ${current + 1} de 10`;
  questionEl.textContent = challenges[current].question;
  optionsEl.innerHTML = "";
  feedbackEl.innerHTML = ""; // Limpiar contenido
  feedbackEl.className = "feedback hidden"; // Ocultar y resetear clases
  verifyBtn.classList.add("hidden");
  verifyBtn.disabled = false;
  selected = null;

  challenges[current].options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => selectOption(div);
    optionsEl.appendChild(div);
  });
}

function selectOption(el) {
  document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
  selected = el;
  verifyBtn.classList.remove("hidden");
}

verifyBtn.onclick = () => {
  if (verifyBtn.disabled) return;
  verifyBtn.disabled = true;

  // Bloquear opciones para evitar cambios visuales
  document.querySelectorAll(".option").forEach(o => o.style.pointerEvents = "none");

  const correct = challenges[current].correct;

  if (selected.textContent === correct) {
    selected.classList.add("correct");
    feedbackEl.className = "feedback ok";
    feedbackEl.innerHTML = "<i class='fa-solid fa-circle-check'></i> ¡Correcto! Excelente comprensión del concepto.";
    if (window.playSound) window.playSound('correct');
    score++;
  } else {
    selected.classList.add("wrong");
    if (window.playSound) window.playSound('wrong');
    feedbackEl.className = "feedback error";
    feedbackEl.innerHTML = `<i class='fa-solid fa-circle-xmark'></i> Incorrecto. La respuesta correcta es: "${correct}".`;
  }

  setTimeout(() => {
    current++;
    current < challenges.length ? loadChallenge() : finishGame();
  }, 1200);
};

function finishGame() {
  game.classList.add("hidden");
  result.classList.remove("hidden");

  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;
  
  // Mostrar puntuación y estrellas
  const scoreText = document.getElementById("scoreText");
  const stars = document.getElementById("stars");

  let mensaje = "";
  let icono = "";

  if (score === 10) {
    mensaje = "¡Perfección Absoluta! 🌟🏆🎉";
    icono = "<div style='font-size: 3rem; margin-bottom: 15px; color: var(--primary-color);'><i class='fa-solid fa-graduation-cap'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Muy Buen Trabajo! 👍✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 15px; color: var(--primary-color);'><i class='fa-solid fa-brain'></i></div>";
  } else {
    mensaje = "¡Puedes Mejorar! 💪📚";
    icono = "<div style='font-size: 3rem; margin-bottom: 15px; color: var(--primary-color);'><i class='fa-solid fa-book-open'></i></div>";
  }
  
  scoreText.innerHTML = `
    <div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Has obtenido: <strong>${score} de 10</strong> puntos</div>
  `;
  stars.innerHTML = '<i class="fa-solid fa-star" style="color: #fbbf24; font-size: 2rem; margin: 0 5px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));"></i>'.repeat(estrellas);

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  progreso.referencias.estrellas[1] = estrellas;
  if (progreso.referencias.nivelActual < 2) progreso.referencias.nivelActual = 2;

  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  if (score === challenges.length) {
    unlockAchievement("Fundamentos de Referencia");
    setTimeout(() => unlockAchievement("Teórico de Referencias"), 4500);
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
