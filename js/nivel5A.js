const challenges = [
  {
    parts: ["Pérez, J.", "2021.", "<i>Educación moderna</i>.", "Revista Educativa."],
    errorIndex: 1,
    explanation: "El año debe ir entre paréntesis: (2021)."
  },
  {
    parts: ["Gómez, L.", "(2019).", "Aprender a investigar.", "editorial Saber."],
    errorIndex: 3,
    explanation: "El nombre de la editorial debe iniciar con mayúscula."
  },
  {
    parts: ["Ruiz, M.", "(2020).", "<i>Metodología científica</i>", "Ciencia Hoy."],
    errorIndex: 2,
    explanation: "El título del libro debe terminar con punto."
  },
  {
    parts: ["Torres, A.", "(2018)", "Educación digital.", "Revista Pedagógica."],
    errorIndex: 1,
    explanation: "El año debe ir entre paréntesis y seguido de punto."
  },
  {
    parts: ["López, C.", "(2022).", "APA paso a paso.", "guía Académica."],
    errorIndex: 3,
    explanation: "Los nombres propios deben respetar mayúsculas."
  },
  {
    parts: ["Martínez, R.", "(2017).", "Investigación básica.", "Editorial Nova"],
    errorIndex: 3,
    explanation: "La fuente debe finalizar con punto."
  },
  {
    parts: ["Fernández, P.", "(2021).", "Escritura académica.", "Red académica."],
    errorIndex: 3,
    explanation: "Los nombres propios deben escribirse con mayúscula inicial."
  },
  {
    parts: ["Sánchez, D.", "2023.", "Normas APA 7.", "Manual Universitario."],
    errorIndex: 1,
    explanation: "El año debe escribirse entre paréntesis."
  },
  {
    parts: ["Castro, F.", "(2016).", "Redacción científica", "Ciencia Global."],
    errorIndex: 2,
    explanation: "El título debe finalizar con punto."
  },
  {
    parts: ["Vega, H.", "(2020).", "Cómo citar fuentes.", "editorial Estudio."],
    errorIndex: 3,
    explanation: "El nombre de la editorial debe iniciar con mayúscula."
  }
];

let current = 0;
let score = 0;
let selected = null;
let answered = false;

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const referenceEl = document.getElementById("reference");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");

// Inyectar estilos para separar visualmente las partes (Chips/Tarjetas)
const style = document.createElement('style');
style.innerHTML = `
  #reference {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    margin: 30px 0;
  }
  .ref-part {
    background: var(--card-bg, #ffffff);
    border: 2px solid var(--border-color, #e2e8f0);
    padding: 15px 25px;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 1.05rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    user-select: none;
    display: inline-block;
  }
  .ref-part:hover {
    transform: translateY(-4px);
    border-color: var(--primary-color, #0f3c78);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
  .ref-part.selected {
    background: var(--primary-color, #0f3c78);
    color: white;
    border-color: var(--primary-color, #0f3c78);
    box-shadow: 0 4px 15px rgba(15, 60, 120, 0.3);
  }
  
  /* Dark Mode */
  body.dark .ref-part {
    background: #1e293b;
    border-color: #334155;
    color: #e5e7eb;
  }
  body.dark .ref-part:hover {
    border-color: var(--primary-color);
    background: #1f2937;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }
  body.dark .ref-part.selected {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
    box-shadow: 0 0 15px rgba(37, 99, 235, 0.4);
  }
`;
document.head.appendChild(style);

// Estandarización de Introducción (Diseño Nivel 1)
if (intro) {
  intro.innerHTML = `
    <h1>Nivel 5: Editor de Referencias</h1>
    <p class="intro-text">
      Incluso los expertos cometen errores. La capacidad de revisar y corregir es lo que distingue a un maestro de las normas APA.
    </p>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div>
        <strong>Tu Misión:</strong><br>
        Analiza la referencia y haz clic sobre la parte que contiene un error de formato (mayúsculas, cursivas o puntuación).
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
  selected = null;
  referenceEl.innerHTML = "";

  // Habilitar botón
  const verifyBtn = document.querySelector("button[onclick='checkAnswer()']");
  if(verifyBtn) {
    verifyBtn.disabled = false;
    verifyBtn.classList.add("hidden"); // Ocultar hasta que seleccione
  }

  challenges[current].parts.forEach((text, index) => {
    const span = document.createElement("span");
    span.className = "ref-part";
    span.innerHTML = text;
    span.onclick = () => selectPart(span, index);
    referenceEl.appendChild(span);
  });
}

function selectPart(span, index) {
  document.querySelectorAll(".ref-part").forEach(s => s.classList.remove("selected"));
  span.classList.add("selected");
  selected = index;
  
  // Mostrar botón al seleccionar
  const verifyBtn = document.querySelector("button[onclick='checkAnswer()']");
  if(verifyBtn) verifyBtn.classList.remove("hidden");
}

function checkAnswer() {
  answered = true;
  // Ocultar botón para evitar superposición
  const verifyBtn = document.querySelector("button[onclick='checkAnswer()']");
  if(verifyBtn) verifyBtn.classList.add("hidden");
  
  // Bloquear interacción con las partes
  document.querySelectorAll(".ref-part").forEach(p => p.style.pointerEvents = "none");

  feedback.classList.remove("hidden");

  const correct = challenges[current].errorIndex;

  if (selected === correct) {
    score++;
    if (window.playSound) window.playSound('correct');
    feedback.className = "feedback ok";
    feedback.innerHTML = "<i class='fa-solid fa-circle-check'></i> Correcto. Has identificado el error correctamente.";
  } else {
    if (window.playSound) window.playSound('wrong');
    feedback.className = "feedback error";
    feedback.innerHTML = `
      <i class='fa-solid fa-circle-xmark'></i> Incorrecto.<br>
      <strong>Error real:</strong> ${challenges[current].parts[correct]}<br>
      <strong>Explicación:</strong> ${challenges[current].explanation}
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
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-gem'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Muy Buen Trabajo! 👍✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-magnifying-glass'></i></div>";
  } else {
    mensaje = "¡Puedes Mejorar! 💪📚";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-glasses'></i></div>";
  }

  if (scoreText) scoreText.innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Has obtenido: <strong>${score} de 10</strong> puntos</div>`;
  if (stars) stars.innerHTML = '<i class="fa-solid fa-star" style="color: #fbbf24; font-size: 2rem; margin: 0 5px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));"></i>'.repeat(estrellas);

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  progreso.referencias.estrellas[5] = estrellas;
  if (progreso.referencias.nivelActual < 6) progreso.referencias.nivelActual = 6;


  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  if (score === challenges.length) {
    unlockAchievement("Editor de Referencias");
    setTimeout(() => unlockAchievement("Editor Sin Fallos"), 4500);
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
