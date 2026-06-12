document.addEventListener('DOMContentLoaded', () => {
  const modoDev = localStorage.getItem("modoDev") === "true";
  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {};
  
  // 1. VERIFICAR REQUISITOS (Nivel > 5 en cada módulo)
  const citasOk = modoDev || (progreso.citas?.nivelActual || 1) > 5;
  const refOk = modoDev || (progreso.referencias?.nivelActual || 1) > 5;
  const formatoOk = modoDev || (progreso.formato?.nivelActual || 1) > 5;

  // Actualizar lista visual de requisitos
  if (citasOk) {
    const el = document.getElementById('reqCitas');
    if (el) el.classList.add('done');
  }
  if (refOk) {
    const el = document.getElementById('reqRef');
    if (el) el.classList.add('done');
  }
  if (formatoOk) {
    const el = document.getElementById('reqFormato');
    if (el) el.classList.add('done');
  }

  // Mostrar pantalla correcta
  if (citasOk && refOk && formatoOk) {
    const locked = document.getElementById('locked');
    const intro = document.getElementById('intro');
    if (intro) {
      intro.innerHTML = `
        <span class="level">Evaluación Integral</span>
        <h1>Desafío Final: Maestro APA</h1>
        <p class="intro-desc">Has llegado a la prueba definitiva. Este examen combina preguntas de Citas, Referencias y Formato para certificar tu conocimiento.</p>
        <div class="theory-box">
          <h3><i class="fa-solid fa-graduation-cap"></i> ¿Qué demostrarás?</h3>
          <ul style="list-style: none; padding: 0;">
            <li><i class="fa-solid fa-check"></i> <span>Dominio sobre citas textuales y parafraseo.</span></li>
            <li><i class="fa-solid fa-check"></i> <span>Habilidad para estructurar referencias.</span></li>
            <li><i class="fa-solid fa-check"></i> <span>Conocimiento del formato general del documento.</span></li>
          </ul>
        </div>
        <div class="intro-mission">
          <i class="fa-solid fa-graduation-cap"></i>
          <div><strong>Tu Misión:</strong> Supera un examen de 15 preguntas aleatorias con al menos un 80% de aciertos.</div>
        </div>
        <button onclick="startGame()" class="btn-primary">Comenzar Examen Final</button>
      `;
    }
    if (locked) locked.classList.add('hidden');
    if (intro) intro.classList.remove('hidden');
  } else {
    const locked = document.getElementById('locked');
    const intro = document.getElementById('intro');
    if (locked) locked.classList.remove('hidden');
    if (intro) intro.classList.add('hidden');
  }
});

// ==========================================
// BANCO DE PREGUNTAS MIXTO
// ==========================================
const questionsPool = [
  // CITAS
  { category: "Citas", q: "¿Qué elemento NO va en una cita parentética?", options: ["Apellido", "Año", "Nombre de pila"], answer: 2, explain: "En las citas solo se usa el apellido del autor." },
  { category: "Citas", q: "Cita de más de 40 palabras:", options: ["Entre comillas", "En bloque con sangría", "En cursiva"], answer: 1, explain: "Las citas largas van en bloque aparte sin comillas." },
  { category: "Citas", q: "Formato correcto de cita narrativa:", options: ["(Pérez, 2019)", "Pérez (2019)", "Pérez 2019"], answer: 1, explain: "En citas narrativas el año va entre paréntesis." },
  { category: "Citas", q: "Si no hay fecha, se usa:", options: ["(s.f.)", "(s/f)", "(no fecha)"], answer: 0, explain: "Se usa la abreviatura s.f. (sin fecha)." },
  { category: "Citas", q: "Cita de 3 o más autores:", options: ["Se ponen todos", "et al. desde la primera", "y otros"], answer: 1, explain: "Se usa 'et al.' desde la primera mención." },

  // REFERENCIAS
  { category: "Referencias", q: "Orden básico de referencia:", options: ["Título, Autor, Fecha", "Autor, Fecha, Título", "Fecha, Título, Autor"], answer: 1, explain: "Autor, (Fecha), Título, Fuente." },
  { category: "Referencias", q: "¿Qué va en cursiva en un libro?", options: ["Autor", "Título", "Editorial"], answer: 1, explain: "El título de la obra va en cursiva." },
  { category: "Referencias", q: "Referencias de revistas incluyen:", options: ["Volumen y número", "Ciudad de publicación", "Número de palabras"], answer: 0, explain: "Se debe incluir volumen y número de la revista." },
  { category: "Referencias", q: "Sangría en referencias:", options: ["Primera línea", "Sangría francesa", "Sin sangría"], answer: 1, explain: "Se usa sangría francesa (0.5 pulg. o 1.27 cm)." },
  { category: "Referencias", q: "¿Se incluye 'Recuperado de'?", options: ["Siempre", "Solo si es inestable", "Nunca"], answer: 1, explain: "Solo si la URL puede cambiar o es contenido temporal." },

  // FORMATO
  { category: "Formato", q: "Margen estándar APA 7:", options: ["2.54 cm", "3 cm", "2 cm"], answer: 0, explain: "1 pulgada (2.54 cm) en todos los lados." },
  { category: "Formato", q: "Alineación del texto:", options: ["Justificada", "Izquierda", "Centrada"], answer: 1, explain: "Alineado a la izquierda, borde derecho irregular." },
  { category: "Formato", q: "Interlineado general:", options: ["Sencillo", "1.5", "Doble"], answer: 2, explain: "Todo el documento debe tener doble espacio." },
  { category: "Formato", q: "Ubicación número de página:", options: ["Abajo centro", "Arriba derecha", "Arriba izquierda"], answer: 1, explain: "Esquina superior derecha." },
  { category: "Formato", q: "Fuente recomendada:", options: ["Comic Sans", "Times New Roman 12", "Arial 14"], answer: 1, explain: "Times New Roman 12 es una de las fuentes aceptadas." }
];

let current = 0;
let score = 0;
let gameQuestions = [];

function startGame() {
  // Mezclar y seleccionar preguntas
  gameQuestions = questionsPool.sort(() => 0.5 - Math.random()).slice(0, 15); // Tomamos 15 preguntas
  current = 0;
  score = 0;

  document.getElementById('intro').classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  loadQuestion();
}

function loadQuestion() {
  const q = gameQuestions[current];
  document.getElementById('progress').textContent = `${current + 1}/${gameQuestions.length}`;
  document.getElementById('categoryBadge').textContent = q.category;
  document.getElementById('questionText').textContent = q.q;
  
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  document.getElementById('feedback').classList.add('hidden');

  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, index);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(btn, index) {
  // Bloquear botones
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);

  const q = gameQuestions[current];
  const feedback = document.getElementById('feedback');
  feedback.classList.remove('hidden');
  feedback.className = 'feedback'; // Limpiar clases previas

  if (index === q.answer) {
    score++;
    btn.classList.add('correct');
    if (window.playSound) window.playSound('correct');
    feedback.classList.add('ok');
    feedback.innerHTML = `<i class="fa-solid fa-check"></i> ¡Correcto! ${q.explain}`;
  } else {
    btn.classList.add('wrong');
    if (window.playSound) window.playSound('wrong');
    feedback.classList.add('error');
    feedback.innerHTML = `<i class="fa-solid fa-xmark"></i> Incorrecto. ${q.explain}`;
  }

  setTimeout(() => {
    current++;
    if (current < gameQuestions.length) {
      loadQuestion();
    } else {
      finishGame();
    }
  }, 2500);
}

function finishGame() {
  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  const finalScore = document.getElementById('finalScore');
  const resultMessage = document.getElementById('resultMessage');
  const starsContainer = document.getElementById('stars');

  // Calcular porcentaje
  const percentage = Math.round((score / gameQuestions.length) * 100);
  finalScore.textContent = percentage;

  let stars = 0;
  if (percentage === 100) {
    resultMessage.textContent = "¡MAESTRO APA! Has dominado todos los temas.";
    stars = 3;
  } else if (percentage >= 80) {
    resultMessage.textContent = "¡Excelente trabajo! Estás listo para cualquier trabajo académico.";
    stars = 2;
  } else if (percentage >= 60) {
    resultMessage.textContent = "Aprobado, pero te recomendamos repasar algunos temas.";
    stars = 1;
  } else {
    resultMessage.textContent = "No alcanzaste el mínimo. ¡Vuelve a intentarlo!";
    stars = 0;
  }

  starsContainer.innerHTML = '<i class="fa-solid fa-star"></i>'.repeat(stars);

  // Guardar progreso si aprobó
  if (percentage >= 60) {
    const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {};
    progreso.avanzado = { completado: true, nota: percentage, estrellas: stars };
    
    if (!progreso.logros) progreso.logros = [];

    // Logro: Graduado APA (Por aprobar)
    if (!progreso.logros.includes("Graduado APA")) {
      progreso.logros.push("Graduado APA");
      showNotification("Graduado APA");
    }

    // Logro: Leyenda APA (Por 100%)
    if (percentage === 100 && !progreso.logros.includes("Leyenda APA")) {
      progreso.logros.push("Leyenda APA");
      // Pequeño delay para que no se solapen si salen juntos
      setTimeout(() => showNotification("Leyenda APA"), 4500);
    }

    localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));
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