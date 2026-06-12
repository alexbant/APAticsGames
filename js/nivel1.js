// =========================
//  Nivel 1 – Fundamentos APA
// =========================

const questions = [
  {
    q: "¿Qué es una cita APA?",
    options: [
      "Un resumen del texto",
      "Una referencia dentro del texto",
      "Una opinión personal"
    ],
    answer: 1,
    explanation: "Según APA, una cita es una referencia breve dentro del texto que identifica la fuente original de una idea."
  },
  {
    q: "¿Para qué se utilizan las citas APA?",
    options: [
      "Decorar textos académicos",
      "Dar crédito a los autores",
      "Aumentar la extensión"
    ],
    answer: 1,
    explanation: "Las citas permiten reconocer el trabajo intelectual de otros autores y respaldar la información."
  },
  {
    q: "¿Cuándo se debe citar una fuente?",
    options: [
      "Cuando usas ideas propias",
      "Cuando usas ideas ajenas",
      "Nunca"
    ],
    answer: 1,
    explanation: "Siempre que utilices ideas, datos o palabras de otro autor, debes citarlos para evitar el plagio."
  },
  {
    q: "¿Qué evita una cita correcta?",
    options: [
      "Errores ortográficos",
      "Plagio académico",
      "Textos largos"
    ],
    answer: 1,
    explanation: "No citar correctamente puede considerarse plagio, una falta grave en el ámbito académico."
  },
  {
    q: "¿En qué tipo de textos se usan normas APA?",
    options: [
      "Redes sociales",
      "Textos académicos",
      "Mensajes personales"
    ],
    answer: 1,
    explanation: "Las normas APA se aplican en trabajos académicos, científicos y de investigación."
  },
  {
    q: "Una cita APA incluye principalmente:",
    options: [
      "Autor y año",
      "Color del texto",
      "Número de páginas del trabajo"
    ],
    answer: 0,
    explanation: "Las citas APA identifican al autor y el año de publicación dentro del texto."
  },
  {
    q: "Citar correctamente mejora:",
    options: [
      "La credibilidad académica",
      "El tamaño del archivo",
      "La decoración del texto"
    ],
    answer: 0,
    explanation: "Citar fuentes confiables fortalece la credibilidad y seriedad del trabajo académico."
  },
  {
    q: "¿Es obligatorio citar fuentes?",
    options: [
      "Sí",
      "No",
      "Solo a veces"
    ],
    answer: 0,
    explanation: "Citar no es opcional: es una obligación ética y académica."
  },
  {
    q: "APA es:",
    options: [
      "Una red social",
      "Una norma académica",
      "Un programa informático"
    ],
    answer: 1,
    explanation: "APA es un conjunto de normas utilizadas para la redacción académica."
  },
  {
    q: "No citar fuentes puede causar:",
    options: [
      "Plagio académico",
      "Mayor claridad",
      "Mejor calificación"
    ],
    answer: 0,
    explanation: "El plagio ocurre cuando se presenta el trabajo de otros como propio."
  }
];

// =========================
// Feedback
// =========================
const goodMessages = [
  "<i class='fa-solid fa-circle-check'></i> ¡Excelente!",
  "<i class='fa-solid fa-wand-magic-sparkles'></i> ¡Muy bien!",
  "<i class='fa-solid fa-book-open'></i> ¡Correcto!",
  "<i class='fa-solid fa-star'></i> ¡Buen trabajo!",
  "<i class='fa-solid fa-hands-clapping'></i> ¡Perfecto!"
];

const errorMessages = [
  "<i class='fa-solid fa-circle-xmark'></i> Respuesta incorrecta",
  "<i class='fa-solid fa-triangle-exclamation'></i> No es la opción correcta",
  "<i class='fa-solid fa-magnifying-glass'></i> Revisa el concepto",
  "<i class='fa-solid fa-xmark'></i> Casi, pero no",
  "<i class='fa-solid fa-rotate-right'></i> Intenta de nuevo"
];

let current = 0;
let score = 0;

// Inyectar estilos para feedback
const style = document.createElement('style');
style.innerHTML = `
  /* Estilos para opciones (Correcto/Incorrecto) */
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
  @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(style);

// =========================
// Elementos
// =========================
const intro = document.getElementById("intro");
const theory = document.getElementById("theory");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");

// FIX: Asegurar que existe el contenedor de feedback (si no está en el HTML, lo creamos)
let feedbackContainer = document.getElementById("feedback-container");
if (!feedbackContainer && optionsEl) {
  feedbackContainer = document.createElement("div");
  feedbackContainer.id = "feedback-container";
  optionsEl.parentNode.insertBefore(feedbackContainer, optionsEl.nextSibling);
}

// Estandarización de Introducción
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 1</span>
    <h1>Fundamentos de Citas</h1>
    <p class="intro-desc">Antes de escribir citas, es fundamental entender qué es una cita APA y por qué se utiliza para evitar el plagio.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-graduation-cap"></i> ¿Qué aprenderás?</h3>
      <ul style="list-style: none; padding: 0;">
        <li><i class="fa-solid fa-check"></i> <span>Qué es una cita y para qué sirve.</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Importancia de dar crédito al autor.</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Cómo las citas fortalecen tus textos.</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div><strong>Tu Misión:</strong> Responde correctamente a las preguntas sobre los conceptos básicos de las citas.</div>
    </div>
    <button onclick="startGame()" class="btn-primary">Comenzar Desafío</button>
  `;
}

// =========================
// Flujo
// =========================
function startGame() {
  intro.classList.add("hidden");
  theory.classList.remove("hidden");
}

function startQuestions() {
  theory.classList.add("hidden");
  quiz.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  progressEl.textContent = `Pregunta ${current + 1} de ${questions.length}`;
  questionEl.textContent = questions[current].q;
  optionsEl.innerHTML = "";
  if (feedbackContainer) {
    feedbackContainer.innerHTML = ""; // Limpiar feedback anterior
    feedbackContainer.classList.add("hidden"); // Ocultar contenedor
  }

  questions[current].options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => checkAnswer(div, i);
    optionsEl.appendChild(div);
  });
}

function checkAnswer(el, index) {
  // Bloquear todas las opciones para evitar múltiples clics
  const allOptions = optionsEl.querySelectorAll(".option");
  allOptions.forEach(opt => {
    opt.onclick = null; // Quitar el evento de clic
    opt.style.pointerEvents = "none"; // Desactivar interacción visualmente
  });

  const q = questions[current];

  const feedbackEl = document.createElement("div");
  feedbackEl.className = "feedback"; // Usar la clase de feedback global

  if (index === q.answer) {
    score++;
    el.classList.add("correct");
    if (window.playSound) window.playSound('correct');

    feedbackEl.classList.add("ok");
    feedbackEl.innerHTML = `<strong>${goodMessages[Math.floor(Math.random()*goodMessages.length)]}</strong><br>${q.explanation}`;
  } else {
    el.classList.add("wrong");
    if (window.playSound) window.playSound('wrong');

    feedbackEl.classList.add("error");
    feedbackEl.innerHTML = `<strong>${errorMessages[Math.floor(Math.random()*errorMessages.length)]}</strong><br>${q.explanation}`;
  }

  // Añadir el feedback al contenedor dedicado
  if (feedbackContainer) {
    feedbackContainer.appendChild(feedbackEl);
    feedbackContainer.classList.remove("hidden");
  }

  setTimeout(() => {
    current++;
    current < questions.length ? loadQuestion() : finishGame();
  }, 2000);
}

function finishGame() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;

  let mensaje = "";
  let icono = "";
  if (score === 10) {
    mensaje = "¡Perfección Absoluta! 🌟🏆";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-graduation-cap'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Muy Buen Trabajo! 👍✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-brain'></i></div>";
  } else {
    mensaje = "¡Puedes Mejorar! 💪📚";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-book-open'></i></div>";
  }

  // Mostrar puntuación y estrellas
  const scoreText = document.getElementById("scoreText");
  const stars = document.getElementById("stars");
  if (scoreText) {
    scoreText.innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Has obtenido: <strong>${score} de 10</strong> puntos</div>`;
  }
  if (stars) stars.innerHTML = '<i class="fa-solid fa-star"></i>'.repeat(estrellas);

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  progreso.citas.estrellas[1] = estrellas;
  if (progreso.citas.nivelActual < 2) progreso.citas.nivelActual = 2;

  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  // Verificar logro por puntuación perfecta
  if (score === questions.length) {
    unlockAchievement("Fundamentos APA");
    // Nuevo logro adicional por obtener todas las respuestas correctas
    setTimeout(() => unlockAchievement("Erudito de Fundamentos"), 4500);
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
