const challenges = [
  {
    text: "Texto original: “El aprendizaje mejora con la práctica constante.”<br><br>Selecciona el parafraseo correcto:",
    answer: "El aprendizaje se fortalece cuando se practica de forma continua.",
    options: [
      "El aprendizaje mejora con la práctica constante.",
      "El aprendizaje se fortalece cuando se practica de forma continua.",
      "La práctica constante es aprendizaje."
    ],
    explanation: "Parafrasear implica cambiar la redacción sin copiar el texto original literalmente."
  },
  {
    text: "Texto original: “La educación influye en el desarrollo social.”<br><br>Selecciona el parafraseo correcto:",
    answer: "La educación tiene un impacto directo en el desarrollo de la sociedad.",
    options: [
      "La educación influye en el desarrollo social.",
      "La educación tiene un impacto directo en el desarrollo de la sociedad.",
      "El desarrollo social educa."
    ],
    explanation: "Una paráfrasis correcta mantiene la idea, pero utiliza palabras distintas."
  },
  {
    text: "Texto original: “El pensamiento crítico es esencial en el aprendizaje.”",
    answer: "El aprendizaje requiere del pensamiento crítico para desarrollarse.",
    options: [
      "El pensamiento crítico es esencial en el aprendizaje.",
      "El aprendizaje requiere del pensamiento crítico para desarrollarse.",
      "El pensamiento aprende críticamente."
    ],
    explanation: "No se deben repetir estructuras ni frases exactas del texto original."
  },
  {
    text: "Texto original: “La motivación incrementa el rendimiento académico.”",
    answer: "El rendimiento académico aumenta cuando existe motivación.",
    options: [
      "La motivación incrementa el rendimiento académico.",
      "El rendimiento académico aumenta cuando existe motivación.",
      "La motivación es académica."
    ],
    explanation: "El parafraseo correcto expresa la misma idea con una construcción distinta."
  },
  {
    text: "Texto original: “El uso de tecnología mejora la enseñanza.”",
    answer: "La enseñanza se ve beneficiada por el uso de la tecnología.",
    options: [
      "El uso de tecnología mejora la enseñanza.",
      "La enseñanza se ve beneficiada por el uso de la tecnología.",
      "La tecnología enseña mejor."
    ],
    explanation: "Cambiar el orden y vocabulario evita el plagio."
  },
  {
    text: "Texto original: “La lectura desarrolla habilidades cognitivas.”",
    answer: "Las habilidades cognitivas se fortalecen mediante la lectura.",
    options: [
      "La lectura desarrolla habilidades cognitivas.",
      "Las habilidades cognitivas se fortalecen mediante la lectura.",
      "Leer es cognitivo."
    ],
    explanation: "Una paráfrasis válida reformula la oración conservando el significado."
  },
  {
    text: "Texto original: “La evaluación guía el proceso educativo.”",
    answer: "El proceso educativo se orienta a través de la evaluación.",
    options: [
      "La evaluación guía el proceso educativo.",
      "El proceso educativo se orienta a través de la evaluación.",
      "Evaluar es educar."
    ],
    explanation: "El texto original no debe copiarse literalmente."
  },
  {
    text: "Texto original: “El aprendizaje colaborativo favorece la participación.”",
    answer: "La participación aumenta cuando se aplica el aprendizaje colaborativo.",
    options: [
      "El aprendizaje colaborativo favorece la participación.",
      "La participación aumenta cuando se aplica el aprendizaje colaborativo.",
      "Colaborar es participar."
    ],
    explanation: "La paráfrasis correcta amplía o reorganiza la idea original."
  },
  {
    text: "Texto original: “La educación virtual amplía el acceso al conocimiento.”",
    answer: "El acceso al conocimiento se amplía mediante la educación virtual.",
    options: [
      "La educación virtual amplía el acceso al conocimiento.",
      "El acceso al conocimiento se amplía mediante la educación virtual.",
      "La virtualidad educa."
    ],
    explanation: "El significado debe mantenerse, pero la redacción debe ser propia."
  },
  {
    text: "Texto original: “El docente actúa como guía del aprendizaje.”",
    answer: "El rol del docente consiste en orientar el aprendizaje.",
    options: [
      "El docente actúa como guía del aprendizaje.",
      "El rol del docente consiste en orientar el aprendizaje.",
      "El docente guía."
    ],
    explanation: "Parafrasear correctamente demuestra comprensión del texto."
  }
];

const successMessages = [
  "<i class='fa-solid fa-circle-check'></i> ¡Excelente! Has parafraseado correctamente.",
  "<i class='fa-solid fa-wand-magic-sparkles'></i> ¡Muy bien! Esa opción evita el plagio.",
  "<i class='fa-solid fa-star'></i> Correcto. Mantienes la idea sin copiar el texto.",
  "<i class='fa-solid fa-hands-clapping'></i> ¡Buen trabajo! Parafraseo bien aplicado."
];

let current = 0;
let score = 0;

// Inyectar estilos para feedback
const style = document.createElement('style');
style.innerHTML = `
  .feedback-msg {
    padding: 15px;
    border-radius: 8px;
    margin-top: 10px;
    border: 1px solid transparent;
    animation: fadeIn 0.3s ease;
  }
  .feedback-msg.correct {
    background-color: #f0fdf4;
    color: #166534;
    border-color: #bbf7d0;
  }
  .feedback-msg.wrong {
    background-color: #fef2f2;
    color: #991b1b;
    border-color: #fecaca;
  }
  /* Dark Mode */
  body.dark .feedback-msg.correct {
    background-color: rgba(34, 197, 94, 0.15);
    color: #86efac;
    border-color: rgba(34, 197, 94, 0.3);
  }
  body.dark .feedback-msg.wrong {
    background-color: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
    border-color: rgba(239, 68, 68, 0.3);
  }
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

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const result = document.getElementById("result");
const referenceEl = document.getElementById("reference");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");

// Estandarización de Introducción
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 5</span>
    <h1>Parafraseo Correcto</h1>
    <p class="intro-desc">Parafrasear es expresar la idea de otro autor con tus propias palabras, manteniendo el significado original y dando crédito.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-graduation-cap"></i> ¿Qué aprenderás?</h3>
      <ul style="list-style: none; padding: 0;">
        <li><i class="fa-solid fa-check"></i> <span>Reescribir ideas sin copiar literalmente.</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Mantener el sentido original del autor.</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Importancia de citar la fuente al parafrasear.</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-pen-nib"></i>
      <div><strong>Tu Misión:</strong> Lee el texto original y elige la opción que lo parafrasea correctamente sin plagiar.</div>
    </div>
    <button class="btn-primary" onclick="startGame()">Comenzar Desafío</button>
  `;
}

// ==========================
// INICIO
// ==========================
function startGame() {
  intro.classList.add("hidden");
  game.classList.remove("hidden");
  loadChallenge();
}

function loadChallenge() {
  progressEl.textContent = `Desafío ${current + 1} de ${challenges.length}`;
  const c = challenges[current];

  referenceEl.innerHTML = c.text;
  optionsEl.innerHTML = "";

  c.options.forEach(opt => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => checkAnswer(div, opt, c);
    optionsEl.appendChild(div);
  });
}

function checkAnswer(el, selected, challenge) {
  // Bloquear todas las opciones
  const allOptions = optionsEl.querySelectorAll(".option");
  allOptions.forEach(o => {
    o.onclick = null;
    o.style.pointerEvents = "none";
  });

  const feedback = document.createElement("div");
  feedback.className = "feedback-msg";

  if (selected === challenge.answer) {
    el.classList.add("correct");
    score++;
    if (window.playSound) window.playSound('correct');

    feedback.classList.add("correct");
    feedback.innerHTML =
      successMessages[Math.floor(Math.random() * successMessages.length)];
  } else {
    el.classList.add("wrong");
    if (window.playSound) window.playSound('wrong');

    feedback.classList.add("wrong");
    feedback.innerHTML = `
      <i class='fa-solid fa-circle-xmark'></i> Incorrecto.<br>
      <strong>Explicación:</strong> ${challenge.explanation}<br>
      <strong>Parafraseo correcto:</strong> ${challenge.answer}
    `;
  }

  optionsEl.appendChild(feedback);

  setTimeout(() => {
    current++;
    current < challenges.length ? loadChallenge() : finishGame();
  }, 2600);
}

// ==========================
// FINAL (ARREGLADO)
// ==========================
function finishGame() {
  game.classList.add("hidden");

  // ESTRELLAS
  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;

  // MOSTRAR RESULTADO
  result.classList.remove("hidden");

  let mensaje = "";
  let icono = "";
  if (score === 10) {
    mensaje = "¡Experto en Parafraseo! ✍️✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-pen-nib'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Buena Redacción! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-pen-to-square'></i></div>";
  } else {
    mensaje = "¡Sigue Intentando! 💪";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-book-open'></i></div>";
  }

  // Mostrar puntuación y estrellas
  const scoreText = document.getElementById("scoreText");
  const stars = document.getElementById("stars");
  if (scoreText) {
    scoreText.innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Has obtenido: <strong>${score} de 10</strong> puntos</div>`;
  }
  if (stars) stars.innerHTML = '<i class="fa-solid fa-star"></i>'.repeat(estrellas);

  // BOTÓN REGRESAR
  const backBtn = document.getElementById("backBtn");
  if (backBtn) {
    backBtn.classList.remove("hidden");
    backBtn.onclick = () => {
      window.location.href = "citas.html";
    };
  }

  // PROGRESO
  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  progreso.citas.estrellas[5] = estrellas;
  if (progreso.citas.nivelActual < 6) progreso.citas.nivelActual = 6;

  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  // Verificar logro
  if (score === challenges.length) {
    unlockAchievement("Pluma de Oro");
    setTimeout(() => unlockAchievement("Parafraseador Supremo"), 4500);
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
