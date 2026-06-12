const challenges = [
  { h:"TÍTULO DEL TRABAJO", p:"1", ok:true,
    text: "El aprendizaje académico requiere el uso adecuado de normas de presentación para garantizar claridad y uniformidad en los documentos científicos.",
    explain:"Encabezado con título y número arriba a la derecha." },

  { h:"", p:"1", ok:false,
    text: "La investigación cualitativa permite comprender fenómenos complejos a través de la recolección de datos narrativos y observacionales.",
    explain:"Falta el encabezado, aunque el número esté correcto." },

  { h:"TÍTULO DEL TRABAJO", p:"", ok:false,
    text: "Los resultados estadísticos mostraron una diferencia significativa entre el grupo experimental y el grupo de control.",
    explain:"Falta el número de página." },

  { h:"", p:"", ok:false,
    text: "Es crucial mantener la integridad académica citando correctamente todas las fuentes consultadas durante la investigación.",
    explain:"No hay encabezado ni numeración." },

  { h:"TÍTULO DEL TRABAJO", p:"2", ok:true,
    text: "El estilo APA proporciona una estructura estándar que facilita la lectura y comprensión de los trabajos científicos.",
    explain:"Cumple encabezado y numeración APA." },

  { h:"TÍTULO DEL TRABAJO", p:"5", ok:true,
    text: "La discusión de los resultados debe interpretar los hallazgos en el contexto de la literatura existente y las hipótesis planteadas.",
    explain:"Encabezado y número correctos en páginas internas." },

  { h:"", p:"3", ok:false,
    text: "Las referencias bibliográficas deben listarse al final del documento en orden alfabético por el apellido del primer autor.",
    explain:"El encabezado debe aparecer en todas las páginas." },

  { h:"TÍTULO DEL TRABAJO", p:"", ok:false,
    text: "El resumen debe ser un párrafo único que sintetice el propósito, métodos, resultados y conclusiones principales.",
    explain:"APA exige numeración continua." },

  { h:"", p:"7", ok:false,
    text: "Cada tabla debe ser mencionada en el texto y colocada lo más cerca posible de su primera mención o en un apéndice.",
    explain:"Número sin encabezado no cumple APA." },

  { h:"TÍTULO DEL TRABAJO", p:"10", ok:true,
    text: "La redacción debe ser clara, concisa y libre de sesgos, utilizando un lenguaje inclusivo y profesional.",
    explain:"Formato correcto según APA 7." }
];

let index = 0;
let score = 0;
let answered = false;

const game = document.getElementById("game");

// Inyectar estilos para feedback en modo oscuro
const style = document.createElement('style');
style.innerHTML = `
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
const intro = document.getElementById("intro");
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 3</span>
    <h1>Encabezado y Paginación</h1>
    <p class="intro-desc">El encabezado y la numeración son la carta de presentación de cada página. Aprende a evaluar si un documento cumple con las normas APA 7 en esta área.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-graduation-cap"></i> ¿Qué aprenderás?</h3>
      <ul style="list-style: none; padding: 0;">
        <li><i class="fa-solid fa-check"></i> <span>Ubicación correcta del número de página.</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Formato del título corto (si aplica).</span></li>
        <li><i class="fa-solid fa-check"></i> <span>Reglas de encabezado de APA 7.</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-check-to-slot"></i>
      <div><strong>Tu Misión:</strong> Evalúa si el encabezado y la numeración que se muestran son correctos según las normas APA.</div>
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
  answered = false;
  document.getElementById("progress").textContent = `Desafío ${index+1} de 10`;
  document.getElementById("headerText").textContent = c.h;
  document.getElementById("pageNumber").textContent = c.p;
  
  const bodyP = document.querySelector(".doc-body p");
  if(bodyP) bodyP.textContent = c.text;

  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");

  document.getElementById("qHeader").value = "";
  document.getElementById("qPage").value = "";
  document.getElementById("qAPA").value = "";

  // Reactivar selects
  document.querySelectorAll(".questions select").forEach(s => s.disabled = false);

  // Habilitar botón
  const verifyBtn = document.querySelector("button[onclick='checkAnswer()']");
  if(verifyBtn) {
    verifyBtn.disabled = false;
    verifyBtn.classList.remove("hidden");
  }
}

function checkAnswer(){
  const h = document.getElementById("qHeader").value;
  const p = document.getElementById("qPage").value;
  const a = document.getElementById("qAPA").value;

  if(!h || !p || !a) return;
  answered = true;

  // Ocultar botón para evitar superposición
  const verifyBtn = document.querySelector("button[onclick='checkAnswer()']");
  if(verifyBtn) verifyBtn.classList.add("hidden");

  // Bloquear selects
  document.querySelectorAll(".questions select").forEach(s => s.disabled = true);

  const c = challenges[index];
  const correct = (c.ok && a==="si") || (!c.ok && a==="no");

  const fb = document.getElementById("feedback");
  fb.classList.remove("hidden");

  if(correct){
    score++;
    if (window.playSound) window.playSound('correct');
    fb.className = "feedback ok";
    fb.innerHTML = "<i class='fa-solid fa-circle-check'></i> Análisis correcto según APA 7.";
  } else {
    if (window.playSound) window.playSound('wrong');
    fb.className = "feedback error";
    fb.innerHTML = `<i class='fa-solid fa-circle-xmark'></i> Incorrecto.<br><br><strong>Explicación:</strong> ${c.explain}`;
  }

  document.getElementById("nextBtn").classList.remove("hidden");
}

function nextChallenge(){
  if (!answered) return;
  index++;
  if(index < 10){
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
    mensaje = "¡Encabezado Perfecto! 🔝✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-heading'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Buen Trabajo! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-file-lines'></i></div>";
  } else {
    mensaje = "¡Sigue Practicando! 💪";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-file'></i></div>";
  }

  document.getElementById("finalScore").innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Respuestas correctas: <strong>${score} de 10</strong></div>`;

  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

progreso.formato.estrellas[3] = estrellas;
if (progreso.formato.nivelActual < 4) progreso.formato.nivelActual = 4;


  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  if (score === challenges.length) {
    unlockAchievement("Maestro de Encabezados");
    setTimeout(() => unlockAchievement("Encabezado de Oro"), 4500);
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
