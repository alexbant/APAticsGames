// ==========================================
// ESTADO GLOBAL DEL JUEGO
// ==========================================
let currentPhase = 0;
let score = 0;
let currentChallengeIndex = 0;
let isProcessing = false;

// Estandarización de Introducción
const intro = document.getElementById("intro");
if (intro) {
  intro.innerHTML = `
    <span class="level">Reto Especial</span>
    <h1>Maestro de la Jerarquía</h1>
    <div class="intro-compact">
        <p class="intro-description">
            Domina la estructura de los documentos académicos a través de 3 fases intensivas. Aprende a identificar, formatear y organizar los encabezados según APA 7.
        </p>
        <ul>
            <li><strong>Fase 1:</strong> Clasificarás los 5 niveles de títulos.</li>
            <li><strong>Fase 2:</strong> Corregirás encabezados con errores de formato.</li>
            <li><strong>Fase 3:</strong> Construirás una estructura jerárquica lógica.</li>
        </ul>
        <div class="mission">
            <i class="fa-solid fa-sitemap"></i> <strong>Tu Misión:</strong> Supera las 3 fases para demostrar tu maestría en la organización de documentos.
        </div>
    </div>
    <button onclick="startPhase(1)" class="btn-primary">Comenzar Aventura</button>
  `;
}

// Estado de selección del usuario para las fases 1 y 2
let userSelection = {
  level: null,
  format: { bold: false, italic: false, center: false, left: true, indent: false, dot: false }
};  

// ==========================================
// DATOS DE LOS DESAFÍOS
// ==========================================

const phase1Challenges = [
  { text: "Metodología", level: 1, format: { bold: true, center: true, left: false, italic: false, indent: false, dot: false }, hint: "Nivel 1: Centrado y en Negrita." },
  { text: "Marco Teórico", level: 2, format: { bold: true, left: true, center: false, italic: false, indent: false, dot: false }, hint: "Nivel 2: Alineado a la izquierda y en Negrita." },
  { text: "Participantes", level: 3, format: { bold: true, left: true, center: false, italic: true, indent: false, dot: false }, hint: "Nivel 3: Alineado a la izquierda, Negrita y Cursiva." },
  { text: "Análisis de datos", level: 4, format: { bold: true, indent: true, dot: true, left: true, center: false, italic: false }, hint: "Nivel 4: Con Sangría, Negrita y Punto final." },
  { text: "Limitaciones del estudio", level: 5, format: { bold: true, indent: true, dot: true, left: true, center: false, italic: true }, hint: "Nivel 5: Con Sangría, Negrita, Cursiva y Punto final." }
];

const phase2Challenges = [
  { text: "Resultados", level: 1, initial: { italic: true, left: true }, target: { bold: true, center: true, left: false, italic: false }, hint: "El Nivel 1 debe estar Centrado y en Negrita." },
  { text: "Discusión", level: 2, initial: { center: true, dot: true }, target: { bold: true, left: true, center: false, dot: false }, hint: "El Nivel 2 va a la Izquierda y en Negrita." },
  { text: "Conclusiones", level: 3, initial: { bold: true }, target: { bold: true, italic: true, left: true, center: false }, hint: "El Nivel 3 requiere Negrita y Cursiva." }
];

const phase3Items = [
  { id: "p3-1", text: "Introducción (Nivel 1)", order: 1 },
  { id: "p3-2", text: "Método (Nivel 1)", order: 2 },
  { id: "p3-3", text: "Participantes (Nivel 2)", order: 3 },
  { id: "p3-4", text: "Instrumentos (Nivel 2)", order: 4 },
  { id: "p3-5", text: "Análisis de Datos (Nivel 3)", order: 5 },
  { id: "p3-6", text: "Resultados (Nivel 1)", order: 6 },
  { id: "p3-7", text: "Discusión (Nivel 1)", order: 7 }
];

// ==========================================
// CONTROL DE FASES Y FLUJO DEL JUEGO
// ==========================================
function startPhase(phase) {
  document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('game-hud').classList.remove('hidden');
  
  if (phase === 1) score = 0; // Reiniciar puntaje al comenzar
  currentPhase = phase;
  currentChallengeIndex = 0; // Reset index for new phase
  updateHUD();

  const phaseElement = document.getElementById(`phase${phase}`);
  if (phaseElement) {
    phaseElement.classList.remove('hidden');
    if (phase === 1) loadPhase1Challenge();
    if (phase === 2) loadPhase2Challenge();
    if (phase === 3) loadPhase3();
  } else {
    finishGame();
  }
}

function updateHUD() {
  document.getElementById("current-score").textContent = score;
  // Progreso basado en el puntaje acumulado (estrellas)
  const maxScore = 100;
  const progress = Math.min((score / maxScore) * 100, 100);
  document.getElementById("overall-progress-fill").style.width = `${progress}%`;
  
  document.querySelectorAll(".phase-item").forEach(el => el.classList.remove("active"));
  const activePreview = document.getElementById(`preview-p${currentPhase}`);
  if (activePreview) activePreview.classList.add("active");
}

function showFeedback(phase, isSuccess, message) {
    const feedbackEl = document.getElementById(`p${phase}-feedback`);
    // Corrección: Usar 'success' en lugar de 'ok' para coincidir con CSS
    feedbackEl.className = `feedback ${isSuccess ? 'success' : 'error'}`;
    const icon = isSuccess ? 'fa-solid fa-check-circle' : 'fa-solid fa-times-circle';
    feedbackEl.innerHTML = `<i class="${icon}"></i> <div>${message}</div>`;
    feedbackEl.classList.remove('hidden');
}

// ==========================================
// LÓGICA FASE 1: CLASIFICACIÓN
// ==========================================
function loadPhase1Challenge() {
  isProcessing = false;
  const challenge = phase1Challenges[currentChallengeIndex];
  document.getElementById("p1-progress").textContent = `Desafío ${currentChallengeIndex + 1}/${phase1Challenges.length}`;
  document.getElementById("p1-context").textContent = `Clasifica y formatea el encabezado: "${challenge.text}"`;
  document.getElementById("p1-heading").textContent = challenge.text;
  
  userSelection = { level: null, format: { bold: false, italic: false, center: false, left: true, indent: false, dot: false } };
  
  updatePreview("p1-heading");
  updateButtons();
  document.getElementById("p1-feedback").classList.add("hidden");
}

function selectLevel(lvl) {
  userSelection.level = lvl;
  updateButtons();
}

function toggleFormat(fmt) {
  if (fmt === 'center') {
    userSelection.format.center = !userSelection.format.center;
    if (userSelection.format.center) userSelection.format.left = false;
  } else if (fmt === 'left') {
    userSelection.format.left = !userSelection.format.left;
    if (userSelection.format.left) userSelection.format.center = false;
  } else {
    userSelection.format[fmt] = !userSelection.format[fmt];
  }
  updatePreview("p1-heading");
  updateButtons();
}

function updateButtons() {
  document.querySelectorAll(".level-buttons button").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.textContent) === userSelection.level);
  });
  Object.keys(userSelection.format).forEach(key => {
    const btn1 = document.getElementById(`btn-${key}`);
    if (btn1) btn1.classList.toggle("active", userSelection.format[key]);
    const btn2 = document.getElementById(`btn-p2-${key}`);
    if (btn2) btn2.classList.toggle("active", userSelection.format[key]);
  });
}

function updatePreview(elementId) {
  const el = document.getElementById(elementId);
  const fmt = userSelection.format;
  el.style.fontWeight = fmt.bold ? "bold" : "normal";
  el.style.fontStyle = fmt.italic ? "italic" : "normal";
  el.style.textAlign = fmt.center ? "center" : "left";
  el.style.textIndent = fmt.indent ? "2.54cm" : "0";
  
  let text = el.textContent.replace(/\.$/, '');
  el.textContent = fmt.dot ? text + "." : text;
}

function checkPhase1() {
  if (isProcessing) return;
  const challenge = phase1Challenges[currentChallengeIndex];
  if (userSelection.level !== challenge.level) {
    score = Math.max(0, score - 2);
    updateHUD();
    showFeedback(1, false, `<strong>Nivel incorrecto.</strong> ${challenge.hint}`);
    if (window.playSound) window.playSound('wrong');
    return;
  }

  // Generar mensajes de error específicos
  let issues = [];
  const f = challenge.format;
  const u = userSelection.format;

  if (f.bold !== u.bold) issues.push(f.bold ? "Falta Negrita" : "Sobra Negrita");
  if (f.italic !== u.italic) issues.push(f.italic ? "Falta Cursiva" : "Sobra Cursiva");
  if (f.indent !== u.indent) issues.push(f.indent ? "Falta Sangría" : "Sobra Sangría");
  if (f.dot !== u.dot) issues.push(f.dot ? "Falta Punto final" : "Sobra Punto final");
  if (f.center !== u.center || f.left !== u.left) {
     if (f.center) issues.push("Debe ir Centrado");
     else if (f.left) issues.push("Debe ir a la Izquierda");
  }
  
  if (issues.length > 0) {
    score = Math.max(0, score - 2);
    updateHUD();
    showFeedback(1, false, `<strong>Formato incorrecto.</strong> ${issues.join(", ")}.`);
    if (window.playSound) window.playSound('wrong');
  } else {
    isProcessing = true;
    score += 5;
    updateHUD();
    showFeedback(1, true, `<strong>¡Correcto!</strong> Has configurado bien el Nivel ${challenge.level}.`);
    if (window.playSound) window.playSound('correct');
    
    setTimeout(() => {
      currentChallengeIndex++;
      if (currentChallengeIndex < phase1Challenges.length) {
        loadPhase1Challenge();
      } else {
        startPhase(2);
      }
    }, 2000);
  }
}

// ==========================================
// LÓGICA FASE 2: CORRECCIÓN
// ==========================================
function loadPhase2Challenge() {
    isProcessing = false;
    const challenge = phase2Challenges[currentChallengeIndex];
    document.getElementById("p2-progress").textContent = `Desafío ${currentChallengeIndex + 1}/${phase2Challenges.length}`;
    document.getElementById("p2-preview").textContent = challenge.text;
    
    userSelection.format = { ...{ bold: false, italic: false, center: false, left: true, indent: false, dot: false }, ...challenge.initial };
    updatePreview("p2-preview");
    updateButtons();
    document.getElementById("p2-feedback").classList.add("hidden");
}

function fixFormat(fmt) {
    toggleFormat(fmt); // Reutilizamos la lógica
    updatePreview("p2-preview");
}

function checkPhase2() {
    if (isProcessing) return;
    const challenge = phase2Challenges[currentChallengeIndex];
    
    // Generar mensajes de error específicos para Fase 2
    let issues = [];
    const t = challenge.target;
    const u = userSelection.format;

    // Verificar solo las propiedades definidas en target
    Object.keys(t).forEach(key => {
        if (t[key] !== u[key]) {
            if (key === 'center' && t.center) issues.push("Debe ir Centrado");
            else if (key === 'left' && t.left) issues.push("Debe ir a la Izquierda");
            else if (key === 'bold' && t.bold) issues.push("Falta Negrita");
            else if (key === 'italic' && t.italic) issues.push("Falta Cursiva");
            else if (key === 'dot' && !t.dot && u.dot) issues.push("Sobra Punto final");
        }
    });

    const isCorrect = issues.length === 0;

    if (isCorrect) {
        isProcessing = true;
        score += 10;
        updateHUD();
        showFeedback(2, true, "<strong>¡Corregido!</strong> Formato APA aplicado correctamente.");
        if (window.playSound) window.playSound('correct');
        setTimeout(() => {
            currentChallengeIndex++;
            if (currentChallengeIndex < phase2Challenges.length) {
                loadPhase2Challenge();
            } else {
                startPhase(3);
            }
        }, 2000);
    } else {
        score = Math.max(0, score - 5);
        updateHUD();
        showFeedback(2, false, `<strong>Aún no es correcto.</strong> ${issues.join(", ")}.`);
        if (window.playSound) window.playSound('wrong');
    }
}

// ==========================================
// LÓGICA FASE 3: CONSTRUCCIÓN (DRAG & DROP)
// ==========================================
function loadPhase3() {
  isProcessing = false;
  const source = document.getElementById("sourceZone");
  const target = document.getElementById("targetZone");
  
  source.innerHTML = "";
  target.innerHTML = '<div class="tower-base">Estructura del Documento</div>';
  document.getElementById("p3-feedback").classList.add("hidden");
  
  const shuffled = [...phase3Items].sort(() => Math.random() - 0.5);
  
  shuffled.forEach(item => {
    const el = document.createElement("div");
    // Corrección: Usar 'tower-block' para coincidir con CSS
    el.className = "tower-block";
    el.draggable = true;
    el.textContent = item.text;
    el.dataset.id = item.id;
    el.dataset.order = item.order;
    source.appendChild(el);
  });

  document.querySelectorAll('.tower-block').forEach(item => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
  });

  [source, target].forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", drop);
  });
}

function dragStart(e) {
  e.target.classList.add("dragging");
}

function dragEnd(e) {
  e.target.classList.remove("dragging");
}

function dragOver(e) {
  e.preventDefault();
  const container = e.currentTarget;
  const afterElement = getDragAfterElement(container, e.clientY);
  const draggable = document.querySelector(".dragging");
  if (draggable) {
      if (afterElement == null) {
        container.appendChild(draggable);
      } else {
        container.insertBefore(draggable, afterElement);
      }
  }
}

function drop(e) {
  e.preventDefault();
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.tower-block:not(.dragging)')];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function checkPhase3() {
  if (isProcessing) return;
  const target = document.getElementById("targetZone");
  const items = [...target.querySelectorAll(".tower-block")];

  if (items.length !== phase3Items.length) {
    showFeedback(3, false, "<strong>Incompleto.</strong> Debes arrastrar todos los bloques a la zona de estructura.");
    if (window.playSound) window.playSound('wrong');
    return;
  }

  const isCorrect = items.every((item, index) => parseInt(item.dataset.order) === index + 1);

  if (isCorrect) {
    isProcessing = true;
    score += 45;
    updateHUD();
    showFeedback(3, true, "<strong>¡Estructura Perfecta!</strong> Has dominado la jerarquía de un documento APA.");
    if (window.playSound) window.playSound('correct');
    setTimeout(finishGame, 2500);
  } else {
    score = Math.max(0, score - 10);
    updateHUD();
    showFeedback(3, false, "<strong>Orden incorrecto.</strong> La secuencia no es lógica. Revisa la estructura estándar de un trabajo académico.");
    if (window.playSound) window.playSound('wrong');
  }
}

// ==========================================
// FINAL DEL JUEGO
// ==========================================
function finishGame() {
  document.getElementById("phase3").classList.add("hidden");
  document.getElementById("game-hud").classList.add("hidden");
  const resultSection = document.getElementById("result");
  resultSection.classList.remove("hidden");
  
  let message = "¡Buen intento! Sigue practicando.";
  let icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-cubes'></i></div>";
  
  if (score >= 90) {
    message = "¡Arquitecto APA! 🏛️✨";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-crown'></i></div>";
  } else if (score >= 60) {
    message = "¡Estructura Sólida! 👍";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-building'></i></div>";
  }
  
  document.getElementById("finalScore").innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${message}</h3><div style="text-align: left;">Puntuación Final: <strong>${score}</strong></div>`;
  document.getElementById("finalMessage").style.display = "none"; // Ocultar mensaje antiguo si existe
  
  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {};
  progreso.jerarquia = { completado: true, score: score };
  localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

  // Verificar logros
  if (score >= 60) {
    unlockAchievement("Arquitecto de Títulos");
  }
  if (score >= 90) {
    setTimeout(() => unlockAchievement("Maestro de la Estructura"), 4500);
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
