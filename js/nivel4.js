let current = 0;
let score = 0;

// =======================
// FRASES POSITIVAS
// =======================
const frasesPositivas = [
  "<i class='fa-solid fa-magnifying-glass'></i> ¡Excelente observación!",
  "<i class='fa-solid fa-eye'></i> Muy bien detectado",
  "<i class='fa-solid fa-check-double'></i> Buen ojo para el detalle",
  "<i class='fa-solid fa-dumbbell'></i> Así se hace",
  "<i class='fa-solid fa-thumbs-up'></i> Correcto, vas muy bien",
  "<i class='fa-solid fa-hands-clapping'></i> Gran trabajo",
  "<i class='fa-solid fa-bullseye'></i> Respuesta acertada"
];

let frasesUsadas = [];

function obtenerFrasePositiva() {
  const disponibles = frasesPositivas.filter(f => !frasesUsadas.includes(f));
  const frase = disponibles.length
    ? disponibles[Math.floor(Math.random() * disponibles.length)]
    : frasesPositivas[Math.floor(Math.random() * frasesPositivas.length)];

  frasesUsadas.push(frase);
  return frase;
}

// =======================
// DESAFÍOS
// =======================
const citas = [
  {
    pista: "Pista: revisa el signo que acompaña al año.",
    referencia: [
      { text: "Según López ", ok: false, explain: "El autor está correctamente citado." },
      { text: "(2018):", ok: true, explain: "En APA no se usa ':' después del año." },
      { text: "\nEl desarrollo cognitivo se fortalece...", ok: false, explain: "El contenido es correcto." },
      { text: "(p. 67).", ok: false, explain: "La página está bien indicada." }
    ],
    explicacion: "El año no debe llevar dos puntos después.",
    correccion: "Según López (2018)"
  },

  {
    pista: "Pista: analiza si el formato coincide con una cita extensa.",
    referencia: [
      { text: "Pérez (2020) afirma que:", ok: false, explain: "La introducción es correcta." },
      { text: " «La motivación del estudiante se incrementa…» ", ok: true, explain: "Las citas largas no llevan comillas." },
      { text: "(p. 14).", ok: false, explain: "La referencia de página es correcta." }
    ],
    explicacion: "Las citas largas no usan comillas.",
    correccion: "La motivación del estudiante se incrementa…"
  },

  {
    pista: "Pista: observa la abreviatura usada en la página.",
    referencia: [
      { text: "García (2019) explica:", ok: false, explain: "La cita del autor es correcta." },
      { text: " La educación debe fomentar el pensamiento crítico. ", ok: false, explain: "El contenido es correcto." },
      { text: "(p 45).", ok: true, explain: "Falta el punto después de 'p'." }
    ],
    explicacion: "La abreviatura correcta es 'p.'.",
    correccion: "(p. 45)"
  },

  {
    pista: "Pista: piensa en la presentación visual de una cita larga.",
    referencia: [
      { text: "Según Torres (2021),", ok: false, explain: "La introducción es correcta." },
      { text: "Esta parte debería tener sangría real.", ok: true, explain: "Las citas largas deben llevar sangría." },
      { text: "(p. 10).", ok: false, explain: "La página está bien indicada." }
    ],
    explicacion: "Las citas largas deben llevar sangría de 1.27 cm.",
    correccion: "        Esta parte debería tener sangría adecuada."
  },

  {
    pista: "Pista: revisa la ubicación del punto final.",
    referencia: [
      { text: "Ramírez (2020) menciona:", ok: false, explain: "La introducción es correcta." },
      { text: "\nLos estudiantes aprenden mejor en ambientes dinámicos\n", ok: false, explain: "El contenido es correcto." },
      { text: "(p. 55).", ok: false, explain: "La referencia está bien escrita." },
      { text: ".", ok: true, explain: "El punto no debe ir después de la referencia." }
    ],
    explicacion: "El punto debe colocarse antes de la referencia.",
    correccion: "Los estudiantes... . (p. 55)"
  },

  {
    pista: "Pista: observa si hay elementos propios de citas cortas.",
    referencia: [
      { text: "Mendoza (2022) sostiene:", ok: false, explain: "La introducción es correcta." },
      { text: " \"El aprendizaje activo fomenta...\" ", ok: true, explain: "Las comillas no se usan en citas largas." },
      { text: "(p. 80).", ok: false, explain: "La página está bien indicada." }
    ],
    explicacion: "Las citas largas no llevan comillas.",
    correccion: "El aprendizaje activo fomenta..."
  },

  {
    pista: "Pista: revisa cuidadosamente el año.",
    referencia: [
      { text: "Castillo (202A) afirma:", ok: true, explain: "El año está mal escrito." },
      { text: "\nLa metodología activa mejora la retención.\n", ok: false, explain: "El contenido es correcto." },
      { text: "(p. 20).", ok: false, explain: "La página está bien indicada." }
    ],
    explicacion: "El año debe ser numérico y válido.",
    correccion: "Castillo (2021) afirma:"
  },

  {
    pista: "Pista: analiza el uso de signos alrededor del texto.",
    referencia: [
      { text: "Luna (2019) indica:", ok: false, explain: "La introducción es correcta." },
      { text: " (“El alumno aprende cuando…”) ", ok: true, explain: "No deben usarse comillas ni paréntesis." },
      { text: "(p. 12).", ok: false, explain: "La página está bien indicada." }
    ],
    explicacion: "Las citas largas no llevan comillas ni paréntesis.",
    correccion: "El alumno aprende cuando…"
  },

  {
    pista: "Pista: observa el orden de los elementos finales.",
    referencia: [
      { text: "Ortega (2023) afirma:", ok: false, explain: "La introducción es correcta." },
      { text: "\nLa lectura crítica es fundamental\n", ok: false, explain: "El contenido es correcto." },
      { text: ". ", ok: true, explain: "El punto está mal ubicado." },
      { text: "(p. 33).", ok: false, explain: "La referencia está bien escrita." }
    ],
    explicacion: "El punto debe ir antes de la referencia.",
    correccion: "La lectura crítica es fundamental. (p. 33)"
  },

  {
    pista: "Pista: revisa la abreviatura usada para la página.",
    referencia: [
      { text: "Vega (2020) expone:", ok: false, explain: "La introducción es correcta." },
      { text: "\nEl análisis profundo... \n", ok: false, explain: "El contenido es correcto." },
      { text: "(pg. 90).", ok: true, explain: "La abreviatura correcta es 'p.'." }
    ],
    explicacion: "Debe usarse 'p.' y no 'pg.'.",
    correccion: "(p. 90)"
  }
];

let answered = false;

// Inyectar estilos para corregir visualización de bloques de texto (Citas Largas)
const style = document.createElement('style');
style.innerHTML = `
  #reference {
    font-family: 'Times New Roman', serif;
    font-size: 1.15rem;
    line-height: 1.6;
    background: var(--card-bg, #fff);
    padding: 25px;
    border: 1px solid var(--border-color, #ccc);
    border-radius: 12px;
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.05);
    white-space: pre-wrap; /* Clave para respetar saltos de línea en citas largas */
    text-align: left;
    margin-bottom: 20px;
  }
  .ref-part {
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
    display: inline;
  }
  .ref-part:hover {
    background-color: rgba(15, 60, 120, 0.1);
    outline: 1px dashed var(--primary-color);
  }
  .ref-part.correct {
    background-color: rgba(34, 197, 94, 0.2);
    color: #15803d;
    font-weight: bold;
    border-bottom: 2px solid #22c55e;
  }
  .ref-part.incorrect {
    background-color: rgba(239, 68, 68, 0.2);
    color: #b91c1c;
    text-decoration: line-through;
  }
  body.dark #reference {
    background: #1e293b;
    border-color: #475569;
    color: #e2e8f0;
  }
  
  /* Ocultar botones residuales (El "botón azul" sin función) */
  #game button { display: none !important; }

  /* Estilos MEJORADOS para el feedback (Tarjeta limpia) */
  .feedback {
    margin-top: 25px;
    padding: 20px;
    border-radius: 12px;
    text-align: left;
    font-size: 1rem;
    line-height: 1.5;
    animation: slideUp 0.4s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    background: var(--card-bg, #ffffff);
    border-left: 6px solid #ccc;
  }
  .feedback.ok {
    border-left-color: #22c55e;
    background-color: #f0fdf4;
    color: #166534;
  }
  .feedback.error {
    border-left-color: #ef4444;
    background-color: #fef2f2;
    color: #991b1b;
  }
  /* Dark Mode Feedback */
  body.dark .feedback.ok {
    background-color: rgba(34, 197, 94, 0.15);
    color: #86efac;
    border-left-color: #4ade80;
  }
  body.dark .feedback.error {
    background-color: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
    border-left-color: #f87171;
  }
  @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(style);

// Estandarización de Introducción
const intro = document.getElementById("intro");
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 4</span>
    <h1>Citas Textuales Largas</h1>
    <p class="intro-desc">Las citas con más de 40 palabras tienen reglas especiales: van en un bloque independiente, sin comillas y con sangría.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-graduation-cap"></i> ¿Qué aprenderás?</h3>
      <ul style="list-style: none; padding: 0;">
        <li><i class="fa-solid fa-check"></i> <span>Formato de bloque con sangría.</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Ausencia de comillas en citas largas.</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Ubicación del punto final antes del paréntesis.</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-magnifying-glass"></i>
      <div><strong>Tu Misión:</strong> Encuentra y haz clic en la parte de la cita que contiene el error de formato.</div>
    </div>
    <button class="btn-primary" onclick="startGame()">Comenzar Desafío</button>
  `;
}

// =======================
// INICIO
// =======================
function startGame() {
  current = 0;
  score = 0;
  frasesUsadas = [];

  if (intro) intro.classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  mostrarPregunta();
}

function mostrarPregunta() {
  const data = citas[current];

  document.getElementById("progress").textContent =
    `Desafío ${current + 1} de ${citas.length}`;

  document.getElementById("instruction").textContent = data.pista;

  const refBox = document.getElementById("reference");
  refBox.innerHTML = "";
  answered = false;

  data.referencia.forEach((frag, idx) => {
    const span = document.createElement("span");
    span.textContent = frag.text;
    span.className = "ref-part";
    span.onclick = () => evaluar(idx);
    refBox.appendChild(span);
  });

  document.getElementById("feedback").innerHTML = "";
  document.getElementById("feedback").classList.add("hidden");
}

function evaluar(index) {
  if (answered) return;
  answered = true;

  const data = citas[current];
  const frag = data.referencia[index];
  const feedback = document.getElementById("feedback");
  
  // Obtener el elemento visual clicado
  const span = document.getElementById("reference").children[index];

  document.querySelectorAll(".ref-part").forEach(p => p.style.pointerEvents = "none");

  if (frag.ok) {
    score++;
    span.classList.add("correct"); // Feedback visual en el texto
    if (window.playSound) window.playSound('correct');
    feedback.className = "feedback ok";
    feedback.innerHTML = `
      ${obtenerFrasePositiva()}<br><br>
      <i class='fa-solid fa-check'></i> ${data.explicacion}<br><br>
      <strong>Forma correcta:</strong> ${data.correccion}
    `;
    feedback.classList.remove("hidden");
  } else {
    span.classList.add("incorrect"); // Feedback visual en el texto
    if (window.playSound) window.playSound('wrong');
    feedback.className = "feedback error";
    feedback.innerHTML = `
      <i class='fa-solid fa-xmark'></i> ${frag.explain}<br><br>
      <strong>Forma correcta:</strong> ${data.correccion}
    `;
    feedback.classList.remove("hidden");
  }

  setTimeout(() => {
    current++;
    current < citas.length ? mostrarPregunta() : finishGame();
  }, 3000);
}

// =======================
// FINAL (ARREGLADO)
// =======================
function finishGame() {
  document.getElementById("game").classList.add("hidden");

  const result = document.getElementById("result");
  result.classList.remove("hidden");

  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;

  // Mostrar puntuación y estrellas
  const scoreText = document.getElementById("scoreText");
  const stars = document.getElementById("stars");
  
  let mensaje = "";
  let icono = "";
  if (score === 10) {
    mensaje = "¡Perfección Absoluta! 🌟";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-eye'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Muy Buen Trabajo! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-check-double'></i></div>";
  } else {
    mensaje = "¡Sigue Practicando! 💪";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-glasses'></i></div>";
  }

  if (scoreText) {
    scoreText.innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Has obtenido: <strong>${score} de 10</strong> puntos</div>`;
  }
  if (stars) {
    stars.innerHTML = '<i class="fa-solid fa-star" style="color: #fbbf24; font-size: 2rem; margin: 0 5px;"></i>'.repeat(estrellas);
  }

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  progreso.citas.estrellas[4] = estrellas;
  if (progreso.citas.nivelActual < 5) progreso.citas.nivelActual = 5;

  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  // Verificar logro
  if (score === citas.length) {
    unlockAchievement("Detective de Citas");
    setTimeout(() => unlockAchievement("Sherlock APA"), 4500);
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
