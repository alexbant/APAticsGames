const challenges = [
  {
    text: "Este es un párrafo de ejemplo para analizar el formato APA.",
    align: "center",
    line: "single",
    answer: "izquierda, doble",
    explain: "El texto estaba centrado y pegado. Corrección: Alineación izquierda y espacio doble.",
    hint: "Observa la posición del texto y el espacio entre líneas. Ambos necesitan ajuste."
  },
  {
    text: "La investigación académica requiere claridad y coherencia.",
    align: "left",
    line: "single",
    answer: "doble",
    explain: "La alineación estaba bien, pero faltaba espacio. Corrección: Interlineado doble.",
    hint: "La alineación es correcta, pero las líneas están demasiado juntas."
  },
  {
    text: "El formato correcto facilita la lectura del documento.",
    align: "justify",
    line: "double",
    answer: "izquierda",
    explain: "El texto justificado (recto a ambos lados) no se usa. Corrección: Alinear a la izquierda.",
    hint: "El texto forma un bloque perfecto a ambos lados. APA prefiere un borde derecho irregular."
  },
  {
    text: "APA establece reglas claras para la presentación escrita.",
    align: "center",
    line: "double",
    answer: "izquierda",
    explain: "El texto centrado solo es para títulos. Corrección: Alinear a la izquierda.",
    hint: "El texto está alineado al centro. Recuerda que los párrafos deben alinearse hacia un lado específico."
  },
  {
    text: "La estructura del texto influye en la comprensión.",
    align: "left",
    line: "single",
    answer: "doble",
    explain: "Faltaba espacio vertical. Corrección: Interlineado doble.",
    hint: "El espacio vertical entre renglones es insuficiente para la norma APA."
  },
  {
    text: "Un documento bien presentado mejora la evaluación.",
    align: "justify",
    line: "single",
    answer: "izquierda, doble",
    explain: "Estaba justificado y pegado. Corrección: Izquierda y doble.",
    hint: "Revisa si el texto está forzado a ambos márgenes y si las líneas tienen suficiente separación."
  },
  {
    text: "El estilo APA es utilizado en trabajos académicos.",
    align: "center",
    line: "single",
    answer: "izquierda, doble",
    explain: "Centrado y simple es incorrecto. Corrección: Izquierda y doble.",
    hint: "El texto no debe estar centrado y necesita mayor separación entre líneas."
  },
  {
    text: "Los márgenes y el interlineado son esenciales.",
    align: "justify",
    line: "double",
    answer: "izquierda",
    explain: "No justifiques el texto. Corrección: Alinear a la izquierda.",
    hint: "Evita que el texto quede recto en el margen derecho (justificado)."
  },
  {
    text: "La alineación influye en la presentación visual.",
    align: "center",
    line: "double",
    answer: "izquierda",
    explain: "No centres el cuerpo del texto. Corrección: Alinear a la izquierda.",
    hint: "Solo los títulos van centrados. El cuerpo del texto debe ir hacia el margen izquierdo."
  },
  {
    text: "Todo el texto debe tener coherencia visual.",
    align: "left",
    line: "single",
    answer: "doble",
    explain: "El espacio es muy reducido. Corrección: Interlineado doble.",
    hint: "Aumenta el espaciado vertical para cumplir con la norma de 2.0."
  }
];

let index = 0;
let score = 0;
let answered = false;

const intro = document.getElementById("intro");
const game = document.getElementById("game");
const end = document.getElementById("end");

const doc = document.getElementById("doc");
const answer = document.getElementById("answer");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const nextBtn = document.getElementById("nextBtn");
const finalScore = document.getElementById("finalScore");

// Estilos para la pista
const style = document.createElement('style');
style.innerHTML = `
  .hint-box {
    background-color: #fffbeb;
    border-left: 5px solid #f59e0b;
    color: #92400e;
    padding: 15px;
    border-radius: 8px;
    margin-top: 15px;
    font-size: 0.95rem;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  /* Dark Mode para la pista */
  body.dark .hint-box {
    background-color: #451a03;
    color: #fcd34d;
    border-left: 5px solid #f59e0b;
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
`;
document.head.appendChild(style);

// Estandarización de Introducción
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 2</span>
    <h1>Alineación e Interlineado</h1>
    <p class="intro-desc">La legibilidad es clave en APA. Aprende a reconocer visualmente si un texto cumple con las reglas de interlineado doble y alineación a la izquierda.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-graduation-cap"></i> ¿Qué aprenderás?</h3>
      <ul style="list-style: none; padding: 0;">
        <li><i class="fa-solid fa-check"></i> <span>Alineación a la izquierda (sin justificar).</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Interlineado doble (2.0).</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Consistencia visual de párrafos.</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-keyboard"></i>
      <div><strong>Tu Misión:</strong> Detecta el error y escribe la corrección: <strong>"izquierda"</strong>, <strong>"doble"</strong> o <strong>"izquierda, doble"</strong>.</div>
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
  const c = challenges[index];

  answered = false;
  progress.textContent = `Desafío ${index + 1} de 10`;
  doc.className = `doc-box ${c.align} ${c.line}`;
  doc.textContent = c.text;

  answer.value = "";
  answer.disabled = false; // Reactivar input
  feedback.classList.add("hidden");
  nextBtn.classList.add("hidden");
  
  // Resetear pista
  const hintEl = document.getElementById("hintText");
  hintEl.textContent = "";
  hintEl.className = "hidden";
  
  // Habilitar botón de verificar si existe
  const verifyBtn = document.querySelector("button[onclick='checkAnswer()']");
  if(verifyBtn) {
    verifyBtn.disabled = false;
    verifyBtn.classList.remove("hidden");
  }
}

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

// Función para calcular distancia entre textos (tolerancia a errores)
function levenshtein(a, b) {
  const tmp = [];
  let i, j, alen = a.length, blen = b.length, cost;
  if (alen === 0) { return blen; }
  if (blen === 0) { return alen; }
  for (i = 0; i <= alen; i++) { tmp[i] = [i]; }
  for (j = 0; j <= blen; j++) { tmp[0][j] = j; }
  for (i = 1; i <= alen; i++) {
    for (j = 1; j <= blen; j++) {
      cost = (a[i - 1] === b[j - 1]) ? 0 : 1;
      tmp[i][j] = Math.min(tmp[i - 1][j] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j - 1] + cost);
    }
  }
  return tmp[alen][blen];
}

function checkAnswer() {
  if (answer.value.trim() === "") {
    feedback.className = "feedback error";
    feedback.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Escribe una corrección antes de verificar.";
    feedback.classList.remove("hidden");
    return;
  }

  answered = true;
  // Ocultar botón para evitar superposición
  const verifyBtn = document.querySelector("button[onclick='checkAnswer()']");
  if(verifyBtn) verifyBtn.classList.add("hidden");
  answer.disabled = true; // Bloquear input

  // Normalizar y permitir "y" como separador para hacerlo más amigable
  const user = normalize(answer.value).replace(/\by\b/g, ",");
  const correct = normalize(challenges[index].answer);

  feedback.classList.remove("hidden");
  nextBtn.classList.remove("hidden");

  // 1. Cálculo de distancia (typos) - Tolerancia aprox 25%
  const dist = levenshtein(user, correct);
  const threshold = Math.max(2, Math.floor(correct.length * 0.25));

  // 2. Verificación de orden (separa por comas y ordena alfabéticamente para comparar)
  const userParts = user.split(',').map(p => p.trim()).sort().join(',');
  const correctParts = correct.split(',').map(p => p.trim()).sort().join(',');
  const distOrder = levenshtein(userParts, correctParts);

  if (user === correct || dist <= threshold) {
    // CASO: Correcto (Exacto o con pequeños errores de dedo)
    score++;
    if (window.playSound) window.playSound('correct');
    feedback.className = "feedback ok";
    let msg = "<i class='fa-solid fa-circle-check'></i> Correcto. Aplicaste el formato APA correctamente.";
    if (dist > 0) msg += " <small>(Aceptado con pequeños errores de escritura).</small>";
    feedback.innerHTML = msg;
  } else if (distOrder <= threshold) {
    // CASO: Orden incorrecto (conceptos bien, orden mal) -> ACEPTADO COMO CORRECTO
    score++;
    if (window.playSound) window.playSound('correct');
    feedback.className = "feedback ok";
    feedback.innerHTML = `
      <i class='fa-solid fa-circle-check'></i> Correcto.<br><br>
      <strong>Observación:</strong> Tienes los conceptos correctos. El orden sugerido es: ${challenges[index].answer}
    `;
  } else {
    // CASO: Incorrecto total
    feedback.className = "feedback error";
    if (window.playSound) window.playSound('wrong');
    feedback.innerHTML = `
      <i class='fa-solid fa-circle-xmark'></i> Incorrecto.<br><br>
      <strong>Corrección correcta:</strong><br>
      ${challenges[index].answer}<br><br>
      <em>${challenges[index].explain}</em>
    `;
  }
}

function nextChallenge() {
  if (!answered) return;
  index++;
  index < challenges.length ? loadChallenge() : finishGame();
}

function finishGame() {
  game.classList.add("hidden");
  // Buscar 'result' o 'end' para asegurar compatibilidad
  const finalScreen = document.getElementById("result") || document.getElementById("end");
  if (finalScreen) finalScreen.classList.remove("hidden");
  
  let mensaje = "";
  let icono = "";
  if (score === 10) {
    mensaje = "¡Alineación Perfecta! 📐✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-bullseye'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Buen Trabajo! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-ruler-horizontal'></i></div>";
  } else {
    mensaje = "¡Sigue Practicando! 💪";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-pen-to-square'></i></div>";
  }

  finalScore.innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Has obtenido: <strong>${score} de 10</strong> puntos</div>`;

  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

progreso.formato.estrellas[2] = estrellas;
if (progreso.formato.nivelActual < 3) progreso.formato.nivelActual = 3;


  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  // Verificar logro
  if (score === challenges.length) {
    unlockAchievement("Ojo de Águila APA");
    setTimeout(() => unlockAchievement("Alineación Perfecta"), 4500);
  }
}

function showHint() {
  const c = challenges[index];
  const hintEl = document.getElementById("hintText");
  hintEl.className = "hint-box";
  hintEl.innerHTML = "<i class='fa-solid fa-lightbulb'></i> <div><strong>Pista:</strong> " + c.hint + "</div>";
  hintEl.classList.remove("hidden");
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
