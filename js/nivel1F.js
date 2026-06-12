const challenges = [
  {
    text: "El título del libro aparece SUBRAYADO.",
    options: [
      "Uso incorrecto de mayúsculas",
      "Uso incorrecto de subrayado",
      "Error en el año"
    ],
    correct: 1,
    explain: "En formato APA no se utiliza subrayado. Los títulos deben ir en cursiva."
  },
  {
    text: "TODO el título está escrito en MAYÚSCULAS.",
    options: [
      "Error en uso de mayúsculas",
      "Error en cursiva",
      "Error en sangría"
    ],
    correct: 0,
    explain: "APA indica que solo la primera palabra del título lleva mayúscula."
  },
  {
    text: "El título del libro no está en cursiva.",
    options: [
      "Error en cursiva",
      "Error en sangría",
      "Error en puntuación"
    ],
    correct: 0,
    explain: "Los títulos de libros deben escribirse en cursiva según APA."
  },
  {
    text: "El texto está completamente subrayado.",
    options: [
      "Uso incorrecto de subrayado",
      "Uso incorrecto de mayúsculas",
      "Error en orden"
    ],
    correct: 0,
    explain: "APA no permite subrayar textos."
  },
  {
    text: "El título mezcla MAYÚSCULAS y minúsculas sin criterio.",
    options: [
      "Error en mayúsculas",
      "Error en cursiva",
      "Error en sangría"
    ],
    correct: 0,
    explain: "APA usa mayúscula solo al inicio del título y nombres propios."
  },
  {
    text: "El título está entre comillas.",
    options: [
      "Uso incorrecto de comillas",
      "Error en cursiva",
      "No hay error"
    ],
    correct: 0,
    explain: "En APA los títulos no van entre comillas."
  },
  {
    text: "El título está en negrita.",
    options: [
      "Uso incorrecto de negrita",
      "Error en cursiva",
      "Error en orden"
    ],
    correct: 0,
    explain: "APA no utiliza negrita para títulos de libros."
  },
  {
    text: "El título está todo en minúsculas.",
    options: [
      "Error en mayúsculas",
      "Error en cursiva",
      "No hay error"
    ],
    correct: 0,
    explain: "La primera palabra del título debe iniciar con mayúscula."
  },
  {
    text: "El título está subrayado y en mayúsculas.",
    options: [
      "Dos errores de formato",
      "Un solo error",
      "No hay error"
    ],
    correct: 0,
    explain: "APA no permite subrayado ni uso excesivo de mayúsculas."
  },
  {
    text: "El título está correctamente en cursiva y sin subrayado.",
    options: [
      "Formato correcto",
      "Error en cursiva",
      "Error en mayúsculas"
    ],
    correct: 0,
    explain: "Correcto. Cumple con las normas APA."
  }
];

let current = 0;
let score = 0;
let answered = false;

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const progress = document.getElementById("progress");
const instruction = document.getElementById("instruction");
const optionsDiv = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

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
    <h1>Errores Comunes de Formato</h1>
    <p class="intro-desc">Evita los errores de principiante en la presentación.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-ban"></i> Lo prohibido</h3>
      <ul style="list-style: none; padding: 0;">
        <li><i class="fa-solid fa-underline"></i> <span><strong>NO</strong> subrayar.</span></li>
        <li><i class="fa-solid fa-font"></i> <span><strong>NO</strong> usar MAYÚSCULAS SOSTENIDAS.</span></li>
        <li><i class="fa-solid fa-quote-right"></i> <span><strong>NO</strong> usar comillas en títulos.</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div><strong>Misión:</strong> Lee el error descrito y selecciona la opción correcta.</div>
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
  const c = challenges[current];
  progress.textContent = `Desafío ${current + 1} de 10`;
  instruction.textContent = c.text;
  instruction.style.marginBottom = "20px";
  optionsDiv.innerHTML = "";
  feedback.classList.add("hidden");
  nextBtn.classList.add("hidden");
  answered = false;

  c.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option"; // Clase para estilos visuales
    btn.onclick = () => checkAnswer(btn, i);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(btn, i) {
  if (answered) return;
  answered = true;

  // Bloquear botones
  const btns = optionsDiv.querySelectorAll("button");
  btns.forEach(b => {
    b.onclick = null;
    b.style.pointerEvents = "none"; // Desactivar clicks sin ponerlo gris (disabled)
  });

  feedback.classList.remove("hidden");

  if (i === challenges[current].correct) {
    score++;
    btn.classList.add("correct");
    if (window.playSound) window.playSound('correct');
    feedback.className = "feedback ok";
    feedback.innerHTML = "<i class='fa-solid fa-circle-check'></i> Correcto. Buen análisis del formato APA.";
  } else {
    btn.classList.add("wrong");
    if (window.playSound) window.playSound('wrong');
    feedback.className = "feedback error";
    feedback.innerHTML = `<i class='fa-solid fa-circle-xmark'></i> Incorrecto.<br>${challenges[current].explain}`;
  }

  nextBtn.classList.remove("hidden");
}

function nextChallenge() {
  if (!answered) return;
  current++;
  current < challenges.length ? loadChallenge() : finishGame();
}

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
    mensaje = "¡Formato Impecable! 📏✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-trophy'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Buen Trabajo! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-circle-check'></i></div>";
  } else {
    mensaje = "¡Sigue Practicando! 💪";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-ruler'></i></div>";
  }
  
  scoreText.innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Has obtenido: <strong>${score} de 10</strong> puntos</div>`;
  stars.innerHTML = '<i class="fa-solid fa-star"></i>'.repeat(estrellas);

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  progreso.formato.estrellas[1] = estrellas;
  if (progreso.formato.nivelActual < 2) {
    progreso.formato.nivelActual = 2;
  }

  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  // Verificar logro (Puntuación perfecta)
  if (score === challenges.length) {
    unlockAchievement("Maestro del Formato");
    setTimeout(() => unlockAchievement("Estilista de Títulos"), 4500);
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
