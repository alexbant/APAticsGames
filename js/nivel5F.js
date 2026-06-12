const challenges = [
  {
    instruction: "Revisa la alineación del texto",
    doc: "El texto está alineado a la izquierda y mantiene interlineado doble.",
    correct: true,
    explain: "APA exige alineación a la izquierda e interlineado doble."
  },
  {
    instruction: "Revisa el interlineado",
    doc: "El documento presenta interlineado simple en todo el texto.",
    correct: false,
    explain: "APA solo permite interlineado doble."
  },
  {
    instruction: "Revisa la fuente",
    doc: "El documento usa Times New Roman, tamaño 12.",
    correct: true,
    explain: "Es una fuente y tamaño aceptados por APA."
  },
  {
    instruction: "Revisa los márgenes",
    doc: "El documento tiene márgenes de 3 cm.",
    correct: false,
    explain: "APA exige márgenes de 2.54 cm."
  },
  {
    instruction: "Revisa la numeración",
    doc: "Las páginas están numeradas en la esquina superior derecha.",
    correct: true,
    explain: "La paginación es correcta según APA."
  },
  {
    instruction: "Revisa los títulos",
    doc: "El título principal está centrado y en negrita.",
    correct: true,
    explain: "Formato correcto para un título de Nivel 1."
  },
  {
    instruction: "Revisa la justificación",
    doc: "El texto del documento está justificado.",
    correct: false,
    explain: "APA no utiliza texto justificado."
  },
  {
    instruction: "Revisa la consistencia",
    doc: "Todo el documento mantiene el mismo formato.",
    correct: true,
    explain: "La consistencia es obligatoria en APA."
  },
  {
    instruction: "Revisa el espaciado",
    doc: "Algunas secciones usan interlineado 1.5.",
    correct: false,
    explain: "Todo el documento debe mantener interlineado doble."
  },
  {
    instruction: "Revisión final del documento",
    doc: "El documento cumple todas las reglas básicas de formato APA 7.",
    correct: true,
    explain: "El documento está correctamente formateado."
  }
];

let index = 0;
let score = 0;
let answered = false;

const game = document.getElementById("game");

// Estandarización de Introducción
const intro = document.getElementById("intro");
if (intro) {
  intro.innerHTML = `
    <span class="level">Nivel 5</span>
    <h1>Auditoría de Formato</h1>
    <p class="intro-desc">Revisión general del documento antes de entregar.</p>
    <div class="theory-box">
      <h3><i class="fa-solid fa-clipboard-check"></i> Checklist</h3>
      <ul style="list-style: none; padding: 0;">
        <li><i class="fa-solid fa-ruler-combined"></i> <span><strong>Márgenes:</strong> 2.54 cm (1 pulgada).</span></li>
        <li><i class="fa-solid fa-font"></i> <span><strong>Fuente:</strong> Legible y consistente.</span></li>
        <li><i class="fa-solid fa-indent"></i> <span><strong>Sangría:</strong> Primera línea de cada párrafo.</span></li>
      </ul>
    </div>
    <div class="intro-mission">
      <i class="fa-solid fa-bullseye"></i>
      <div><strong>Misión:</strong> Decide si la afirmación sobre el formato es Verdadera o Falsa.</div>
    </div>
    <button onclick="startGame()" class="btn-primary">Comenzar Desafío</button>
  `;
}

function startGame() {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  loadChallenge();
}

function loadChallenge() {
  const c = challenges[index];
  document.getElementById("progress").textContent = `Desafío ${index + 1} de 10`;
  document.getElementById("reviewInstruction").textContent = c.instruction;
  document.getElementById("docPreview").textContent = c.doc;
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");
  answered = false;

  // Reactivar botones
  const buttons = document.querySelectorAll('.options button');
  buttons.forEach(b => {
    b.disabled = false;
    b.classList.remove('disabled', 'selected');
  });
}

function checkAnswer(btn, choice) {
  if (answered) return;
  answered = true;

  // Bloquear botones y resaltar el seleccionado
  const buttons = document.querySelectorAll('.options button');
  buttons.forEach(b => {
    b.disabled = true;
    b.classList.add('disabled'); // Clase para bajar opacidad
  });
  btn.classList.remove('disabled');
  btn.classList.add('selected'); // Clase para resaltar selección

  const c = challenges[index];
  const fb = document.getElementById("feedback");
  fb.classList.remove("hidden");

  if (choice === c.correct) {
    score++;
    if (window.playSound) window.playSound('correct');
    fb.className = "feedback ok";
    fb.innerHTML = "<i class='fa-solid fa-circle-check'></i> Correcto. Evaluación adecuada según APA.";
  } else {
    if (window.playSound) window.playSound('wrong');
    fb.className = "feedback error";
    fb.innerHTML = `
      <i class='fa-solid fa-circle-xmark'></i> Incorrecto.<br><br>
      <strong>Explicación:</strong><br>
      ${c.explain}
    `;
  }

  document.getElementById("nextBtn").classList.remove("hidden");
}

function nextChallenge() {
  if (!answered) return;
  index++;
  if (index < challenges.length) {
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
    mensaje = "¡Auditoría Aprobada! ✅✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-clipboard-check'></i></div>";
  } else if (score >= 7) {
    mensaje = "¡Buen Trabajo! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-pen-to-square'></i></div>";
  } else {
    mensaje = "¡Revisa los Detalles! 🔍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-magnifying-glass'></i></div>";
  }

  document.getElementById("finalScore").innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: left;">Respuestas correctas: <strong>${score} de 10</strong></div>`;

  const estrellas = score === 10 ? 3 : score >= 7 ? 2 : 1;

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  progreso.formato.estrellas[5] = estrellas;
  if (progreso.formato.nivelActual < 6) progreso.formato.nivelActual = 6;


  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  if (score === challenges.length) {
    unlockAchievement("Auditor de Calidad");
    setTimeout(() => unlockAchievement("Auditor Implacable"), 4500);
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
