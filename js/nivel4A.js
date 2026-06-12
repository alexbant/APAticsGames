const challenges = [
  {
    correct: [
      "Pérez, J.",
      "(2021).",
      "Educación moderna.",
      "Revista Educativa."
    ]
  },
  {
    correct: [
      "Gómez, L.",
      "(2019).",
      "Aprender a investigar.",
      "Editorial Saber."
    ]
  },
  {
    correct: [
      "Ruiz, M.",
      "(2020).",
      "Metodología científica.",
      "Ciencia Hoy."
    ]
  },
  {
    correct: [
      "Torres, A.",
      "(2018).",
      "Educación digital.",
      "Revista Pedagógica."
    ]
  },
  {
    correct: [
      "López, C.",
      "(2022).",
      "APA paso a paso.",
      "Guía Académica."
    ]
  },
  {
    correct: [
      "Martínez, R.",
      "(2017).",
      "Investigación básica.",
      "Editorial Nova."
    ]
  },
  {
    correct: [
      "Fernández, P.",
      "(2021).",
      "Escritura académica.",
      "Red Académica."
    ]
  },
  {
    correct: [
      "Sánchez, D.",
      "(2023).",
      "Normas APA 7.",
      "Manual Universitario."
    ]
  },
  {
    correct: [
      "Castro, F.",
      "(2016).",
      "Redacción científica.",
      "Ciencia Global."
    ]
  },
  {
    correct: [
      "Vega, H.",
      "(2020).",
      "Cómo citar fuentes.",
      "Editorial Estudio."
    ]
  }
];

let current = 0;
let score = 0;
let answered = false;

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const list = document.getElementById("list");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");

// Inyectar estilos mejorados para la lista y botones
const style = document.createElement('style');
style.innerHTML = `
  .order-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--card-bg, #ffffff);
    padding: 15px 20px;
    margin-bottom: 12px;
    border-radius: 12px;
    border: 1px solid var(--border-color, #e2e8f0);
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    transition: all 0.2s ease;
    font-weight: 500;
  }
  .order-item:hover {
    transform: translateX(5px);
    border-color: var(--primary-color, #0f3c78);
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  }
  .controls {
    display: flex;
    gap: 8px;
  }
  .btn-move {
    background: var(--hover-bg, #f1f5f9);
    border: 1px solid var(--border-color, #cbd5e1);
    color: var(--primary-color, #0f3c78);
    width: 34px;
    height: 34px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    font-size: 14px;
  }
  .btn-move:hover {
    background: var(--primary-color, #0f3c78);
    color: white;
    border-color: var(--primary-color, #0f3c78);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  .btn-move:active {
    transform: translateY(0);
  }
  
  /* Dark Mode */
  body.dark .order-item {
    background: #1e293b;
    border-color: #334155;
    color: #f1f5f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  body.dark .btn-move {
    background: #334155;
    border-color: #475569;
    color: var(--primary-color);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  body.dark .btn-move:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
    box-shadow: 0 0 12px rgba(37, 99, 235, 0.6);
  }
`;
document.head.appendChild(style);

// Estandarización de Introducción (Diseño Nivel 1)
if (intro) {
  intro.innerHTML = `
    <h1>Nivel 4: El Orden Correcto</h1>
    <p class="intro-text">
      La estructura de una referencia no es aleatoria. Sigue una lógica estricta: <strong>¿Quién? ¿Cuándo? ¿Qué? ¿Dónde?</strong>
    </p>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div>
        <strong>Tu Misión:</strong><br>
        Ordena los bloques de la referencia en la secuencia correcta: Autor &rarr; Fecha &rarr; Título &rarr; Fuente.
      </div>
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
  answered = false;
  progress.textContent = `Desafío ${current + 1} de 10`;
  feedback.classList.add("hidden");
  nextBtn.classList.add("hidden");
  list.innerHTML = "";
  document.getElementById("checkBtn").disabled = false;

  const items = [...challenges[current].correct].sort(() => Math.random() - 0.5);

  items.forEach(text => {
    const li = document.createElement("li");
    li.className = "order-item";
    li.innerHTML = `
      <span>${text}</span>
      <div class="controls">
        <button onclick="moveUp(this)" class="btn-move" title="Subir">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg>
        </button>
        <button onclick="moveDown(this)" class="btn-move" title="Bajar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/></svg>
        </button>
      </div>
    `;
    list.appendChild(li);
  });
}

/* 🔧 CORRECCIÓN REAL */
function moveUp(btn) {
  const item = btn.closest("li");
  const prev = item.previousElementSibling;
  if (prev) list.insertBefore(item, prev);
}

function moveDown(btn) {
  const item = btn.closest("li");
  const next = item.nextElementSibling;
  if (next) list.insertBefore(next, item);
}

function checkAnswer() {
  answered = true;
  // Bloquear interacciones para evitar cambios post-verificación
  document.getElementById("checkBtn").disabled = true;
  document.querySelectorAll(".btn-move").forEach(b => b.disabled = true);

  const user = [...list.children].map(li => li.children[0].textContent);
  const correct = challenges[current].correct;

  feedback.classList.remove("hidden");

  if (JSON.stringify(user) === JSON.stringify(correct)) {
    score++;
    if (window.playSound) window.playSound('correct');
    feedback.className = "feedback ok";
    feedback.innerHTML =
      "<i class='fa-solid fa-circle-check'></i> Correcto. El orden de la referencia es el adecuado según APA 7.";
  } else {
    if (window.playSound) window.playSound('wrong');
    feedback.className = "feedback error";
    feedback.innerHTML = `
      <i class='fa-solid fa-circle-xmark'></i> Incorrecto.<br>
      <strong>Orden correcto:</strong><br>
      ${correct.join(" ")}
    `;
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
    mensaje = "¡Perfección Absoluta! 🌟🏆🎉";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-layer-group'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Muy Buen Trabajo! 👍✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-list-ol'></i></div>";
  } else {
    mensaje = "¡Puedes Mejorar! 💪📚";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-book'></i></div>";
  }

  if (scoreText) scoreText.innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Has obtenido: <strong>${score} de 10</strong> puntos</div>`;
  if (stars) stars.innerHTML = '<i class="fa-solid fa-star" style="color: #fbbf24; font-size: 2rem; margin: 0 5px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));"></i>'.repeat(estrellas);

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

progreso.referencias.estrellas[4] = estrellas;
if (progreso.referencias.nivelActual < 5) progreso.referencias.nivelActual = 5;


  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  if (score === challenges.length) {
    unlockAchievement("Bibliotecario APA");
    setTimeout(() => unlockAchievement("Bibliotecario Perfecto"), 4500);
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
