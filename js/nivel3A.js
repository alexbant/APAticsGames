const challenges = [
  {
    correct: "Pérez, J. (2021). Educación moderna. <i>Revista Educativa</i>, <i>15</i>(2), 45–60.",
    wrong: "Pérez J, 2021. Educación moderna, Revista Educativa."
  },
  {
    correct: "Gómez, L. (2019). <i>Aprender a investigar</i>. Editorial Saber.",
    wrong: "Gómez (2019) Aprender a investigar Editorial Saber"
  },
  {
    correct: "Ruiz, M. (2020). Metodología científica. <i>Ciencia Hoy</i>, <i>8</i>(1), 22–30.",
    wrong: "Ruiz, M. Metodología científica (2020)."
  },
  {
    correct: "Torres, A. (2018). Educación digital. <i>Revista Pedagógica</i>.",
    wrong: "Torres A. Educación digital, Revista Pedagógica, 2018."
  },
  {
    correct: "López, C. (2022). <i>APA paso a paso</i>. Guía Académica.",
    wrong: "López, C APA paso a paso (2022)"
  },
  {
    correct: "Martínez, R. (2017). <i>Investigación básica</i>. Editorial Nova.",
    wrong: "Martínez R Investigación básica Editorial Nova"
  },
  {
    correct: "Fernández, P. (2021). <i>Escritura académica</i>. Red Académica.",
    wrong: "Fernández (2021). Escritura académica"
  },
  {
    correct: "Sánchez, D. (2023). <i>Normas APA 7</i>. Manual Universitario.",
    wrong: "Sánchez D, Normas APA 7, 2023."
  },
  {
    correct: "Castro, F. (2016). <i>Redacción científica</i>. Ciencia Global.",
    wrong: "Castro F Redacción científica Ciencia Global 2016"
  },
  {
    correct: "Vega, H. (2020). <i>Cómo citar fuentes</i>. Editorial Estudio.",
    wrong: "Vega, H (2020) Cómo citar fuentes"
  }
];

let current = 0;
let score = 0;
let correctOption = "";
let answered = false;

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const progress = document.getElementById("progress");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

// Inyectar estilos para feedback visual en opciones
const style = document.createElement('style');
style.innerHTML = `
  .choice.correct {
    background-color: #dcfce7 !important;
    border-color: #22c55e !important;
    color: #14532d !important;
  }
  .choice.wrong {
    background-color: #fee2e2 !important;
    border-color: #ef4444 !important;
    color: #7f1d1d !important;
  }
  body.dark .choice.correct {
    background-color: rgba(34, 197, 94, 0.2) !important;
    border-color: #4ade80 !important;
    color: #d1fae5 !important;
  }
  body.dark .choice.wrong {
    background-color: rgba(239, 68, 68, 0.2) !important;
    border-color: #f87171 !important;
    color: #fee2e2 !important;
  }
`;
document.head.appendChild(style);

// Estandarización de Introducción (Diseño Nivel 1)
if (intro) {
  intro.innerHTML = `
    <h1>Nivel 3: Ojo Crítico APA</h1>
    <p class="intro-text">
      En las referencias APA, cada punto, cursiva y paréntesis cuenta. Un pequeño error puede cambiar el significado o la validez de la fuente.
    </p>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div>
        <strong>Tu Misión:</strong><br>
        Compara dos opciones y selecciona la referencia que cumple perfectamente con las normas de puntuación y formato APA 7.
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
  progress.textContent = `Desafío ${current + 1} de 10`;
  feedback.classList.add("hidden");
  nextBtn.classList.add("hidden");
  answered = false;

  const c = challenges[current];
  const mix = Math.random() > 0.5;

  if (mix) {
    optionA.innerHTML = c.correct;
    optionB.innerHTML = c.wrong;
    correctOption = "A";
  } else {
    optionA.innerHTML = c.wrong;
    optionB.innerHTML = c.correct;
    correctOption = "B";
  }

  optionA.className = "choice";
  optionB.className = "choice";
}

function selectOption(opt) {
  if (answered) return;
  answered = true;

  feedback.classList.remove("hidden");

  if (opt === correctOption) {
    score++;
    document.getElementById("option" + opt).classList.add("correct");
    if (window.playSound) window.playSound('correct');
    feedback.className = "feedback ok";
    feedback.innerHTML = "<i class='fa-solid fa-circle-check'></i> Correcto. Esta referencia cumple con el orden, puntuación y formato APA 7.";
  } else {
    document.getElementById("option" + opt).classList.add("wrong");
    document.getElementById("option" + correctOption).classList.add("correct");
    if (window.playSound) window.playSound('wrong');
    feedback.className = "feedback error";
    feedback.innerHTML =
      "<i class='fa-solid fa-circle-xmark'></i> Incorrecto. La referencia correcta es la resaltada en verde, porque respeta el orden, los paréntesis y la puntuación APA.";
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
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-check-double'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Muy Buen Trabajo! 👍✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-eye'></i></div>";
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

  progreso.referencias.estrellas[3] = estrellas;
  if (progreso.referencias.nivelActual < 4) progreso.referencias.nivelActual = 4;


  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  if (score === challenges.length) {
    unlockAchievement("Ojo Crítico");
    setTimeout(() => unlockAchievement("Visión Perfecta"), 4500);
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
