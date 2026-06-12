// =========================
//  Configuración de Retos Diarios
// =========================

// Lista de todos los posibles desafíos diarios
const allChallenges = [
  { type: "Citas", topic: "Fundamentos", questions: [
    {
    q: "¿Qué es una cita?",
    options: [
      "Un resumen del texto",
      "Una referencia dentro del texto",
      "Una opinión personal"
    ],
    answer: 1,
    explanation: "Una cita APA es una referencia breve dentro del texto que identifica la fuente original de una idea."
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
    explanation: "Siempre que se utilicen ideas, datos o palabras de otro autor, se deben citar."
  },
  {
    q: "¿Qué evita una cita correcta?",
    options: [
      "Errores ortográficos",
      "Plagio académico",
      "Textos largos"
    ],
    answer: 1,
    explanation: "Citar correctamente evita el plagio académico."
  },
  {
    q: "¿En qué tipo de textos se usan normas APA?",
    options: [
      "Redes sociales",
      "Textos académicos",
      "Mensajes personales"
    ],
    answer: 1,
    explanation: "Las normas APA se aplican en trabajos académicos y científicos."
  }
  ]},
  { type: "Referencias", topic: "Elementos Clave", questions: [
    { q: "¿Qué elemento va primero en una referencia?", options: ["Título", "Autor", "Fecha"], answer: 1, explanation: "El autor es el primer elemento de una referencia estándar." },
    { q: "¿Cómo se escribe la fecha?", options: ["(2023)", "2023", "[2023]"], answer: 0, explanation: "La fecha se coloca entre paréntesis después del autor." },
    { q: "¿Qué título va en cursiva?", options: ["Artículo", "Nombre de la revista", "Capítulo"], answer: 1, explanation: "El nombre de la fuente mayor (revista, libro) va en cursiva." },
    { q: "¿Qué significa s.f.?", options: ["Sin formato", "Sin fecha", "Sin fuente"], answer: 1, explanation: "Se usa s.f. cuando la obra no tiene fecha conocida." },
    { q: "¿Dónde van las referencias?", options: ["Al inicio", "A pie de página", "Al final"], answer: 2, explanation: "La lista de referencias va al final del documento." }
  ]},
  { type: "Formato", topic: "Reglas de Estilo", questions: [
    { q: "¿Cuál es el margen estándar?", options: ["2.0 cm", "2.54 cm", "3.0 cm"], answer: 1, explanation: "El margen debe ser de 1 pulgada (2.54 cm) en todos los lados." },
    { q: "¿Qué interlineado se usa?", options: ["Sencillo", "1.5", "Doble"], answer: 2, explanation: "APA requiere interlineado doble en todo el texto." },
    { q: "¿Cómo es la alineación?", options: ["Justificada", "A la izquierda", "Centrada"], answer: 1, explanation: "El texto debe estar alineado a la izquierda, sin justificar." },
    { q: "¿Cuánto mide la sangría?", options: ["0.5 cm", "1.27 cm", "2.54 cm"], answer: 1, explanation: "La sangría de primera línea es de 0.5 pulgadas (1.27 cm)." },
    { q: "¿Qué fuente es válida?", options: ["Comic Sans", "Times New Roman", "Impact"], answer: 1, explanation: "Times New Roman 12 es una de las fuentes aceptadas." }
  ]},
  { type: "Citas", topic: "Citas Avanzadas", questions: [
    { q: "¿Cita textual < 40 palabras?", options: ["Bloque aparte", "Entre comillas", "Sin formato"], answer: 1, explanation: "Las citas cortas van integradas en el texto entre comillas." },
    { q: "¿Cita textual > 40 palabras?", options: ["Bloque con sangría", "Entre comillas", "En cursiva"], answer: 0, explanation: "Las citas largas van en bloque aparte, sin comillas." },
    { q: "¿Cuándo usar 'et al.'?", options: ["1 autor", "2 autores", "3 o más autores"], answer: 2, explanation: "Se usa 'et al.' desde la primera cita para 3 o más autores." },
    { q: "¿Qué es parafrasear?", options: ["Copiar y pegar", "Explicar con tus palabras", "Traducir"], answer: 1, explanation: "Parafrasear es reescribir una idea ajena con tus propias palabras." },
    { q: "¿Cita narrativa?", options: ["(Autor, Año)", "Autor (Año)", "Título (Año)"], answer: 1, explanation: "En la cita narrativa, el autor es parte de la oración." }
  ]},
  { type: "Referencias", topic: "Casos Especiales", questions: [
    { q: "¿Qué es el DOI?", options: ["Fecha de publicación", "Identificador digital", "Editor"], answer: 1, explanation: "DOI es el Identificador de Objeto Digital único." },
    { q: "¿Orden de referencias?", options: ["Cronológico", "Alfabético", "Por importancia"], answer: 1, explanation: "La lista se ordena alfabéticamente por apellido del autor." },
    { q: "¿Qué sangría usan las referencias?", options: ["Primera línea", "Francesa", "Ninguna"], answer: 1, explanation: "Las referencias llevan sangría francesa (colgante)." },
    { q: "¿Se pueden citar redes sociales?", options: ["Sí", "No", "Solo Twitter"], answer: 0, explanation: "APA 7 permite citar redes sociales si son la fuente original." },
    { q: "¿Wikipedia es fuente académica?", options: ["Sí, siempre", "No recomendable", "Es la mejor"], answer: 1, explanation: "No se recomienda citar Wikipedia en trabajos académicos formales." }
  ]}
  ,
  { type: "Formato", topic: "Tablas y Figuras", questions: [
    { q: "¿Dónde va el número y título de una tabla?", options: ["Debajo", "Encima", "Al lado"], answer: 1, explanation: "El número y título de la tabla se colocan encima de la tabla." },
    { q: "¿Dónde va la leyenda de una figura?", options: ["Debajo", "Encima", "No lleva"], answer: 0, explanation: "El número y leyenda de una figura se colocan debajo de la figura." },
    { q: "El título de una tabla va en...", options: ["Negrita", "Cursiva y negrita", "Cursiva"], answer: 2, explanation: "El título de la tabla (la descripción) va en cursiva." },
    { q: "La palabra 'Figura 1' va en...", options: ["Negrita", "Cursiva", "Normal"], answer: 0, explanation: "La etiqueta 'Figura 1' se escribe en negrita." },
    { q: "¿Se usan bordes verticales en las tablas APA?", options: ["Sí, siempre", "No, nunca", "A veces"], answer: 1, explanation: "Las tablas APA 7 no usan bordes verticales, solo horizontales." }
  ]},
  { type: "Referencias", topic: "Fuentes Online", questions: [
    { q: "Si una fuente tiene DOI, ¿se incluye la URL?", options: ["Sí, ambos", "No, solo el DOI", "Solo si la URL es corta"], answer: 1, explanation: "Si existe un DOI, se debe usar en lugar de la URL." },
    { q: "¿Cómo se formatea un DOI?", options: ["doi:10.xxxx", "https://doi.org/10.xxxx", "DOI: 10.xxxx"], answer: 1, explanation: "El formato correcto para un DOI es una URL completa: https://doi.org/..." },
    { q: "Al citar una página web, ¿qué fecha se usa?", options: ["La fecha de acceso", "La fecha de publicación", "Cualquiera de las dos"], answer: 1, explanation: "Se debe usar la fecha de publicación del contenido, si está disponible." },
    { q: "El título de una página web en una referencia va en...", options: ["Cursiva", "Negrita", "Normal"], answer: 0, explanation: "El título de la página web específica va en cursiva." },
    { q: "El nombre del sitio web en una referencia va en...", options: ["Cursiva", "Normal", "Negrita"], answer: 1, explanation: "El nombre del sitio web (la fuente mayor) va en texto normal, después del título de la página." }
  ]}
];

// Función para barajar un array (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Barajar las preguntas internas (orden de días fijo)
allChallenges.forEach(challenge => {
  shuffleArray(challenge.questions);
});

// --- LÓGICA DE ROTACIÓN PARA QUE HOY SEA EL ÚLTIMO DÍA ---
// Obtener día de la semana: 0=Domingo, 1=Lunes, ..., 6=Sábado.
const dayOfWeek = new Date().getDay();
// Ajustar para que el array comience en Lunes (índice 0) y termine en Domingo (índice 6).
const todayArrayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

// Rotar el array para que el reto de hoy quede al final.
const rotatedChallenges = allChallenges.slice(todayArrayIndex + 1).concat(allChallenges.slice(0, todayArrayIndex + 1));

// Asignar los días a los desafíos YA ROTADOS
const challenges = rotatedChallenges.map((challenge, index) => ({
  ...challenge,
  day: index + 1
}));

let currentQuestions = [];

// =========================
// Mensajes
// =========================
const goodMessages = [
  "¡Excelente! <i class='fa-solid fa-circle-check'></i>",
  "¡Muy bien! <i class='fa-solid fa-wand-magic-sparkles'></i>",
  "¡Correcto! <i class='fa-solid fa-book'></i>",
  "¡Buen trabajo! <i class='fa-solid fa-star'></i>"
];

const errorMessages = [
  "Respuesta incorrecta <i class='fa-solid fa-circle-xmark'></i>",
  "No es la opción correcta",
  "Revisa el concepto",
  "Casi, pero no"
];

// =========================
// Estado
// =========================
let current = 0;
let score = 0;

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
const scoreText = document.getElementById("scoreText");
const starsText = document.getElementById("stars");

// Estandarización de Introducción
if (intro) {
  intro.innerHTML = `
    <span class="level">Calendario Semanal</span>
    <h1>Retos Diarios APA</h1>
    <div class="intro-compact">
        <p class="intro-description">
            Completa un desafío diferente cada día para mantener tu racha. Los temas varían entre Citas, Referencias y Formato.
        </p>
        <ul>
            <li>5 preguntas rápidas por día.</li>
            <li>Temas rotativos para un repaso integral.</li>
            <li>Gana estrellas exclusivas del calendario.</li>
        </ul>
    </div>
    <button class="btn-primary" onclick="showCalendar()">Ver Calendario</button>
  `;
}

// =========================
// Flujo del juego
// =========================
function showCalendar() {
  // Limpiar intro para mostrar calendario
  intro.innerHTML = `
    <h1>Calendario de Retos</h1>
    <p class="subtitle">Selecciona el reto del día de hoy para comenzar.</p>
    <div class="calendar-grid" id="calendarGrid"></div>
    <button class="btn-secondary" onclick="location.reload()" style="margin-top:20px">Volver</button>
  `;

  const grid = document.getElementById("calendarGrid");
  
  // Como el array de retos ya está rotado, el día de hoy es siempre el último (el 7).
  const todayIndex = 7;

  challenges.forEach(challenge => {
    const isToday = challenge.day === todayIndex;
    const card = document.createElement("div");
    card.className = `day-card ${isToday ? 'today' : ''}`;
    
    let icon = "fa-star";
    if(challenge.type === "Citas") icon = "fa-quote-right";
    if(challenge.type === "Referencias") icon = "fa-book";
    if(challenge.type === "Formato") icon = "fa-ruler-combined";

    card.innerHTML = `
      <div class="day-number">Día ${challenge.day}</div>
      <div class="day-icon"><i class="fa-solid ${icon}"></i></div>
      <h3>${challenge.type}</h3>
      <span>${challenge.topic}</span>
    `;

    // Solo permitir jugar el día actual (o todos si es demo, aquí priorizamos la UX solicitada)
    // Para demo permitiremos click en todos, pero visualmente destacamos "HOY"
    card.onclick = () => startDailyChallenge(challenge);
    
    grid.appendChild(card);
  });
}

function startDailyChallenge(challenge) {
  currentQuestions = challenge.questions;
  current = 0;
  score = 0;
  
  // Reconstruir UI de juego si fue borrada por el calendario
  intro.innerHTML = ""; // Limpiar calendario
  intro.classList.add("hidden"); // Ocultar contenedor intro
  theory.classList.remove("hidden");
  
  // Actualizar texto de teoría/instrucciones antes de empezar
  theory.innerHTML = `
    <div class="theory-box">
        <h3><i class="fa-solid fa-bolt"></i> Reto: ${challenge.type} - ${challenge.topic}</h3>
        <p>Responde las 5 preguntas correctamente. ¡Tú puedes!</p>
    </div>
    <button class="btn-primary" onclick="startQuestions()">¡Estoy listo!</button>
  `;
}

function startQuestions() {
  theory.classList.add("hidden");
  quiz.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  progressEl.textContent = `Pregunta ${current + 1} de ${currentQuestions.length}`;
  questionEl.textContent = currentQuestions[current].q;
  optionsEl.innerHTML = "";

  currentQuestions[current].options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => checkAnswer(div, i);
    optionsEl.appendChild(div);
  });
}

// =========================
// Respuesta + retroalimentación
// =========================
function checkAnswer(el, index) {
  const q = currentQuestions[current];

  document.querySelectorAll(".option").forEach(o => {
    o.onclick = null;
    o.style.pointerEvents = "none";
  });

  const feedback = document.createElement("div");
  feedback.classList.add("feedback");

  if (index === q.answer) {
    score++;
    el.classList.add("correct");
    if (window.playSound) window.playSound('correct');
    feedback.classList.add("success");
    feedback.innerHTML = `
      <strong>${goodMessages[Math.floor(Math.random() * goodMessages.length)]}</strong><br>
      ${q.explanation}
    `;
  } else {
    el.classList.add("wrong");
    if (window.playSound) window.playSound('wrong');
    feedback.classList.add("error");
    feedback.innerHTML = `
      <strong>${errorMessages[Math.floor(Math.random() * errorMessages.length)]}</strong><br>
      ${q.explanation}
    `;
  }

  quiz.appendChild(feedback);

  setTimeout(() => {
    feedback.remove();
    current++;
    current < currentQuestions.length ? loadQuestion() : finishGame();
  }, 2200);
}

// =========================
// Final del nivel
// =========================
function finishGame() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  let mensaje = "";
  let icono = "";
  if (score === currentQuestions.length) {
    mensaje = "¡Racha Perfecta! 🔥";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-fire'></i></div>";
  } else if (score >= 3) {
    mensaje = "¡Bien Jugado! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-star'></i></div>";
  } else {
    mensaje = "¡Vuelve Mañana! 💪";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-calendar-day'></i></div>";
  }

  scoreText.innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Respondiste correctamente <strong>${score} de ${currentQuestions.length}</strong> preguntas.</div>`;

  let estrellas = 1;
  if (score === 5) estrellas = 3;
  else if (score >= 3) estrellas = 2;

  if (starsText) starsText.innerHTML = '<i class="fa-solid fa-star"></i>'.repeat(estrellas);

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  // Guardar en una sección separada para no afectar el progreso de Citas Nivel 1
  progreso.retos = progreso.retos || {};
  progreso.retos.diario = estrellas;

  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  if (score === currentQuestions.length) {
    unlockAchievement("Erudito Diario");
    setTimeout(() => unlockAchievement("Sabio del Día"), 4500);
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
