const challenges = [
  { text:"Resultados", level:1, explain:"Nivel 1 va centrado y en negrita." },
  { text:"Método", level:1, explain:"Sección principal → Nivel 1." },
  { text:"Participantes", level:2, explain:"Subsección → alineado a la izquierda." },
  { text:"Instrumentos", level:2, explain:"Nivel 2 según APA." },
  { text:"Procedimiento", level:2, explain:"Subtítulo de sección." },
  { text:"Análisis estadístico", level:3, explain:"Nivel 3 usa negrita y cursiva." },
  { text:"Diseño del estudio.", level:4, explain:"Nivel 4 lleva sangría y punto." },
  { text:"Variables dependientes.", level:4, explain:"Nivel 4 correctamente aplicado." },
  { text:"Limitaciones del estudio.", level:5, explain:"Nivel 5 usa cursiva y sangría." },
  { text:"Implicaciones prácticas.", level:5, explain:"Formato correcto para Nivel 5." }
];

let index = 0;
let score = 0;
let answered = false;

const game = document.getElementById("game");

// Inyectar estilos para feedback visual en botones
const style = document.createElement('style');
style.innerHTML = `
  .game-options button.correct {
    background-color: #dcfce7 !important;
    border-color: #22c55e !important;
    color: #14532d !important;
  }
  .game-options button.wrong {
    background-color: #fee2e2 !important;
    border-color: #ef4444 !important;
    color: #7f1d1d !important;
  }
  body.dark .game-options button.correct {
    background-color: rgba(34, 197, 94, 0.2) !important;
    border-color: #4ade80 !important;
    color: #d1fae5 !important;
  }
  body.dark .game-options button.wrong {
    background-color: rgba(239, 68, 68, 0.2) !important;
    border-color: #f87171 !important;
    color: #fee2e2 !important;
  }
`;
document.head.appendChild(style);

// Estandarización de Introducción
const intro = document.getElementById("intro");
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 4</span>
    <h1>Jerarquía de Títulos</h1>
    <p class="intro-desc">Organiza tu texto con la jerarquía correcta.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-layer-group"></i> Estilos</h3>
      <ul style="list-style: none; padding: 0;">
        <li><strong>Nivel 1:</strong> Centrado + Negrita.</li>
        <li><strong>Nivel 2:</strong> Izquierda + Negrita.</li>
        <li><strong>Nivel 3:</strong> Izquierda + Negrita + <em>Cursiva</em>.</li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div><strong>Misión:</strong> Identifica el nivel (1, 2, 3...) según el formato del título.</div>
    </div>
    <button onclick="startGame()" class="btn-primary">Comenzar Desafío</button>
  `;
}

function startGame(){
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  loadChallenge();
}

function loadChallenge(){
  const c = challenges[index];
  document.getElementById("progress").textContent = `Desafío ${index+1} de 10`;
  document.getElementById("titleText").textContent = c.text;
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");
  answered = false;

  // Reactivar botones para el nuevo desafío
  const allBtns = document.querySelectorAll(".game-options button");
  allBtns.forEach(b => {
    b.disabled = false;
    b.classList.remove("correct", "wrong");
  });
}

function selectLevel(btn, level){
  if(answered) return;
  answered = true;

  // Bloquear todos los botones para que no sigan clicando
  const allBtns = document.querySelectorAll(".game-options button");
  allBtns.forEach(b => b.disabled = true);

  const c = challenges[index];
  const fb = document.getElementById("feedback");
  fb.classList.remove("hidden");

  if(level === c.level){
    score++;
    btn.classList.add("correct"); // Se pone verde
    if (window.playSound) window.playSound('correct');
    fb.className = "feedback ok";
    fb.innerHTML = "<i class='fa-solid fa-circle-check'></i> Correcto. Identificaste el nivel APA correctamente.";
  } else {
    btn.classList.add("wrong"); // Se pone rojo
    if (window.playSound) window.playSound('wrong');
    fb.className = "feedback error";
    fb.innerHTML = `
      <i class='fa-solid fa-circle-xmark'></i> Incorrecto.<br><br>
      <strong>Nivel correcto:</strong> Nivel ${c.level}<br>
      <em>${c.explain}</em>
    `;
  }

  document.getElementById("nextBtn").classList.remove("hidden");
}

function nextChallenge(){
  if (!answered) return;
  index++;
  if(index < challenges.length){
    loadChallenge();
  } else {
    finishGame();
  }
}
function finishGame() {
  game.classList.add("hidden");
  // Buscar 'result' o 'end' para asegurar compatibilidad
  const finalScreen = document.getElementById("result") || document.getElementById("end");
  if (finalScreen) finalScreen.classList.remove("hidden");
  
  let mensaje = "";
  let icono = "";
  if (score === 10) {
    mensaje = "¡Jerarquía Maestra! 🏛️✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-sitemap'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Buen Trabajo! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-layer-group'></i></div>";
  } else {
    mensaje = "¡Sigue Practicando! 💪";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-cubes'></i></div>";
  }

  document.getElementById("finalScore").innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Respuestas correctas: <strong>${score} de 10</strong></div>`;

  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

progreso.formato.estrellas[4] = estrellas;
if (progreso.formato.nivelActual < 5) progreso.formato.nivelActual = 5;


  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  if (score === challenges.length) {
    unlockAchievement("Estructurador de Textos");
    setTimeout(() => unlockAchievement("Arquitecto Estructural"), 4500);
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
