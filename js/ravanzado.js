// =========================
// Reto Avanzado: EL DUELO
// =========================
const locked = document.getElementById("locked");
const intro = document.getElementById("intro");

// Verificación de desbloqueo
intro.classList.remove("hidden");
if (locked) locked.classList.add("hidden");

// =========================
// SISTEMA DE MÚSICA
// =========================
const bgAudio = new Audio();
bgAudio.loop = true;
let musicEnabled = true;

function playMusic(track) {
  const path = `/music/${track}`;
  // Evitar reiniciar si ya está sonando la misma pista
  if (bgAudio.src.includes(path) && !bgAudio.paused) return;
  
  bgAudio.src = path;
  if (musicEnabled) {
    bgAudio.play().catch(e => console.log("Interacción requerida para reproducir música"));
  }
}

function toggleMusic() {
  musicEnabled = !musicEnabled;
  const btn = document.getElementById('musicToggle');
  
  if (musicEnabled) {
    bgAudio.play();
    if(btn) btn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Música: ON';
  } else {
    bgAudio.pause();
    if(btn) btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> Música: OFF';
  }
}

// =========================
// Configuración de Niveles y Jefes
// =========================
const levels = [
  { id: 1, name: "El Guardián", icon: "fa-user-shield", boss: "Guardián de Citas", bossIcon: "fa-user-shield", hp: 100, mechanic: "quiz", desc: "Selecciona la opción correcta.", music: "dragon.mp3" },
  { id: 2, name: "La Sombra", icon: "fa-ghost", boss: "Sombra del Plagio", bossIcon: "fa-ghost", hp: 120, mechanic: "drag", desc: "Arrastra la respuesta al ataque.", music: "fantasma.mp3" },
  { id: 3, name: "Los Gemelos", icon: "fa-masks-theater", boss: "Gemelos Confusos", bossIcon: "fa-masks-theater", hp: 140, mechanic: "truefalse", desc: "¿Verdadero o Falso?", music: "gemelos.mp3" },
  { id: 4, name: "El Fragmentado", icon: "fa-puzzle-piece", boss: "Espíritu Roto", bossIcon: "fa-puzzle-piece", hp: 160, mechanic: "fill", desc: "Completa la frase.", music: "fragmentado.mp3" },
  { id: 5, name: "El Cronos", icon: "fa-hourglass-half", boss: "Señor del Tiempo", bossIcon: "fa-hourglass-half", hp: 200, mechanic: "order", desc: "Ordena los elementos.", music: "cronos.mp3" }
];

// Banco de Preguntas por Nivel
const levelData = {
  1: [ // Quiz
    { t: "¿Qué es una cita APA?", opts: ["Resumen", "Referencia en texto", "Opinión"], a: 1, exp: "Es una referencia breve dentro del texto." },
    { t: "¿Qué va en cursiva en un libro?", opts: ["Autor", "Título", "Editorial"], a: 1, exp: "El título de la obra va en cursiva." },
    { t: "Margen estándar:", opts: ["2.54 cm", "3 cm", "1.5 cm"], a: 0, exp: "1 pulgada (2.54 cm) por todos lados." },
    { t: "Alineación correcta:", opts: ["Justificada", "Izquierda", "Centrada"], a: 1, exp: "Alineación a la izquierda." },
    { t: "Cita narrativa:", opts: ["(Autor, Año)", "Autor (Año)"], a: 1, exp: "El autor es parte de la oración." }
  ],
  2: [ // Drag & Drop
    { t: "Arrastra el elemento que indica 'Sin Fecha'", opts: ["(s.f.)", "(no date)", "(s/f)"], a: 0, exp: "s.f. es la abreviatura correcta." },
    { t: "Arrastra el formato de cita parentética", opts: ["(Autor, Año)", "Autor (Año)", "Autor, Año"], a: 0, exp: "Va todo entre paréntesis." },
    { t: "Arrastra lo que va en cursiva en una revista", opts: ["Título Artículo", "Nombre Revista", "Volumen"], a: 1, exp: "El nombre de la revista va en cursiva." },
    { t: "Arrastra la sangría correcta", opts: ["Primera línea", "Francesa", "Ninguna"], a: 1, exp: "Referencias usan sangría francesa." },
    { t: "Arrastra el formato de DOI", opts: ["doi:10...", "https://doi.org/...", "DOI: 10..."], a: 1, exp: "Se usa el formato de URL segura." },
    { t: "Arrastra el orden de autores", opts: ["Nombre Apellido", "Apellido, Inicial.", "Inicial. Apellido"], a: 1, exp: "Apellido seguido de iniciales." },
    { t: "Arrastra la cita narrativa", opts: ["(Pérez, 2020)", "Pérez (2020)", "Pérez, 2020"], a: 1, exp: "El autor va fuera del paréntesis." }
  ],
  3: [ // True/False
    { t: "El interlineado debe ser sencillo.", opts: ["Verdadero", "Falso"], a: 1, exp: "Debe ser doble espacio." },
    { t: "Se usa 'et al.' para 3 o más autores.", opts: ["Verdadero", "Falso"], a: 0, exp: "Correcto, desde la primera cita." },
    { t: "La lista de referencias se ordena por fecha.", opts: ["Verdadero", "Falso"], a: 1, exp: "Se ordena alfabéticamente." },
    { t: "Las citas largas llevan comillas.", opts: ["Verdadero", "Falso"], a: 1, exp: "Van en bloque sin comillas." },
    { t: "El título 'Referencias' va en negrita.", opts: ["Verdadero", "Falso"], a: 0, exp: "Va centrado y en negrita." },
    { t: "Se debe justificar el texto a la derecha.", opts: ["Verdadero", "Falso"], a: 1, exp: "Alineación a la izquierda (bandera)." },
    { t: "El número de página va abajo al centro.", opts: ["Verdadero", "Falso"], a: 1, exp: "Esquina superior derecha." },
    { t: "Las tablas no llevan líneas verticales.", opts: ["Verdadero", "Falso"], a: 0, exp: "Solo líneas horizontales." }
  ],
  4: [ // Fill Blank
    { t: "La lista de referencias va al ___ del documento.", opts: ["final", "inicio", "medio"], a: 0, exp: "Siempre al final." },
    { t: "El número de página va en la esquina ___ derecha.", opts: ["inferior", "superior"], a: 1, exp: "Encabezado superior derecho." },
    { t: "Para parafrasear ___ se usan comillas.", opts: ["no", "sí"], a: 0, exp: "El parafraseo no lleva comillas." },
    { t: "Las tablas no llevan líneas ___.", opts: ["horizontales", "verticales"], a: 1, exp: "Solo líneas horizontales." },
    { t: "La fuente recomendada es Times New Roman ___.", opts: ["10", "12", "14"], a: 1, exp: "Tamaño 12 puntos." },
    { t: "El margen debe ser de ___ pulgadas.", opts: ["0.5", "1", "1.5"], a: 1, exp: "1 pulgada (2.54 cm)." },
    { t: "La sangría de párrafo es de ___ cm.", opts: ["1.27", "2.54", "0.5"], a: 0, exp: "0.5 pulgadas o 1.27 cm." },
    { t: "Los títulos de nivel 1 van ___.", opts: ["centrados", "izquierda", "derecha"], a: 0, exp: "Centrados y en negrita." }
  ],
  5: [ // Order (Click en orden)
    { t: "Ordena la referencia de Libro:", parts: ["Apellido,", "N.", "(Año).", "Título.", "Editorial."], order: [0, 1, 2, 3, 4], exp: "Autor, Fecha, Título, Fuente." },
    { t: "Ordena la cita parentética:", parts: ["(", "Autor,", "Año,", "p.", "num", ")"], order: [0, 1, 2, 3, 4, 5], exp: "(Autor, Año, p. num)" },
    { t: "Ordena la referencia de Web:", parts: ["Autor.", "(Fecha).", "Título.", "Sitio Web.", "URL"], order: [0, 1, 2, 3, 4], exp: "Autor, Fecha, Título, Sitio, URL." },
    { t: "Ordena la cita narrativa:", parts: ["Apellido", "(Año)", "afirma", "que", "...", "(p. #)."], order: [0, 1, 2, 3, 4, 5], exp: "Autor (Año) ... (pág)." },
    { t: "Ordena referencia de Revista:", parts: ["Autor.", "(Fecha).", "Título Art.", "Revista,", "Vol(Num)."], order: [0, 1, 2, 3, 4], exp: "Autor, Fecha, Título, Fuente." },
    { t: "Ordena formato de página:", parts: ["Margen", "1 pulg", "Fuente", "Times", "12 pt"], order: [0, 1, 2, 3, 4], exp: "Márgenes y Fuente." },
    { t: "Ordena elementos portada:", parts: ["Título", "Autor", "Afiliación", "Curso", "Profesor", "Fecha"], order: [0, 1, 2, 3, 4, 5], exp: "Orden estándar de portada estudiantil." },
    { t: "Ordena cita corporativa:", parts: ["(Nombre", "Organización,", "Año,", "p.", "10)"], order: [0, 1, 2, 3, 4], exp: "(Organización, Año, p. 10)" }
  ]
};

// Estado del Juego
let currentLevel = null;
let playerHP = 100;
let bossHP = 100;
let currentQ = null;
let turnTimer = null;
let timeLeft = 10;
let answered = false;
let questionsQueue = [];

// Elementos
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const texto = document.getElementById("texto");
const progress = document.getElementById("progress");
const scoreText = document.getElementById("scoreText");
const starsText = document.getElementById("stars");

// Estandarización de Introducción
if (intro) {
  intro.innerHTML = `
    <span class="level">Reto Avanzado</span>
    <h1>El Duelo Final</h1>
    <div class="intro-compact">
        <p class="intro-description">Enfréntate a los 5 Guardianes de la Norma APA. Cada uno tiene una mecánica de combate diferente.</p>
        <ul>
            <li><i class="fa-solid fa-skull" style="color:#ef4444"></i> <strong>5 Jefes:</strong> Diferentes estilos de batalla.</li>
            <li><i class="fa-solid fa-hand-fist" style="color:#f59e0b"></i> <strong>Mecánicas:</strong> Quiz, Arrastrar, Ordenar...</li>
            <li><i class="fa-solid fa-heart" style="color:#22c55e"></i> <strong>Supervivencia:</strong> Tu vida no se regenera en combate.</li>
        </ul>
    </div>
    <button class="btn-primary" onclick="showLevelSelection()">Seleccionar Nivel</button>
  `;
}

// =========================
// Flujo
// =========================
function showLevelSelection() {
  intro.classList.remove("hidden");
  quiz.classList.add("hidden");
  result.classList.add("hidden");

  intro.innerHTML = `
    <h1>Mapa de Batalla</h1>
    <p class="subtitle">Elige a tu oponente.</p>
    <button id="musicToggle" class="btn-secondary" onclick="toggleMusic()" style="margin-bottom: 15px; padding: 8px 16px; font-size: 0.9rem;">
      ${musicEnabled ? '<i class="fa-solid fa-volume-high"></i> Música: ON' : '<i class="fa-solid fa-volume-xmark"></i> Música: OFF'}
    </button>
    <div class="level-grid" id="levelGrid"></div>
    <button class="btn-secondary" onclick="window.location.href='retos.html'" style="margin-top:0; width:100%">Volver a Retos</button>
  `;

  const grid = document.getElementById("levelGrid");
  levels.forEach(lvl => {
    const card = document.createElement("div");
    card.className = "level-select-card";
    card.innerHTML = `
      <div style="font-size: 2rem; color: var(--primary-color);"><i class="fa-solid ${lvl.icon}"></i></div>
      <h3 style="margin:0; font-size:1rem;">${lvl.name}</h3>
      <span style="font-size:0.8rem; color:var(--text-muted);">${lvl.desc}</span>
    `;
    card.onclick = () => startLevel(lvl);
    grid.appendChild(card);
  });

  playMusic('waiting-music.mp3');
}

function startLevel(level) {
  currentLevel = level;
  playerHP = 100;
  bossHP = level.hp;
  questionsQueue = [...levelData[level.id]].sort(() => Math.random() - 0.5);
  
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  
  playMusic(level.music);

  // Reconstruir Arena
  const existingArena = document.querySelector('.battle-arena');
  if (existingArena) existingArena.remove();

  const arena = document.createElement('div');
  arena.className = 'battle-arena';
  arena.innerHTML = `
    <div class="fighter player">
      <div class="avatar player-avatar"><i class="fa-solid fa-user-graduate"></i></div>
      <div class="health-bar"><div class="hp-fill player-hp" id="playerHPBar"></div></div>
      <div class="hp-text">TÚ</div>
    </div>
    <div style="font-size:1.5rem; color:#94a3b8;">VS</div>
    <div class="fighter boss">
      <div class="avatar boss-avatar"><i class="fa-solid ${level.bossIcon}"></i></div>
      <div class="health-bar"><div class="hp-fill boss-hp" id="bossHPBar"></div></div>
      <div class="hp-text">${level.boss.toUpperCase()}</div>
    </div>
  `;
  quiz.insertBefore(arena, quiz.firstChild);
  
  updateHealthUI();
  loadReto();
}

function updateHealthUI() {
  document.getElementById('playerHPBar').style.width = `${Math.max(0, playerHP)}%`;
  // Boss HP relativo a su máximo
  const bossMax = currentLevel ? currentLevel.hp : 100;
  const bossPercent = (bossHP / bossMax) * 100;
  document.getElementById('bossHPBar').style.width = `${Math.max(0, bossPercent)}%`;
}

function loadReto() {
  if (playerHP <= 0 || bossHP <= 0) {
    finishGame();
    return;
  }

  if (questionsQueue.length === 0) {
    questionsQueue = [...levelData[currentLevel.id]].sort(() => Math.random() - 0.5);
  }

  currentQ = questionsQueue.pop();
  answered = false;
  timeLeft = 10;

  // UI Pregunta
  progress.textContent = `Turno de Batalla`;
  texto.innerHTML = currentQ.t;
  
  // UI Opciones
  const optsContainer = document.querySelector('.options');
  optsContainer.innerHTML = '';
  
  renderMechanic(optsContainer);

  // Timer visual
  let timerBar = document.getElementById('turnTimer');
  if (!timerBar) {
    timerBar = document.createElement('div');
    timerBar.id = 'turnTimer';
    timerBar.className = 'turn-timer';
    quiz.insertBefore(timerBar, optsContainer);
  }
  timerBar.style.width = '100%';
  
  // Iniciar Timer Lógico
  clearInterval(turnTimer);
  turnTimer = setInterval(() => {
    timeLeft--;
    timerBar.style.width = `${(timeLeft/10)*100}%`;
    if (timeLeft <= 0) {
      clearInterval(turnTimer);
      checkAnswer(-1); // Tiempo agotado
    }
  }, 1000);
}

function renderMechanic(container) {
  const mech = currentLevel.mechanic;

  if (mech === 'quiz' || mech === 'truefalse') {
    currentQ.opts.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'battle-option'; // Clase corregida
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(idx);
      container.appendChild(btn);
    });
  } 
  else if (mech === 'drag') {
    // Zona de Drop
    const dropZone = document.createElement('div');
    dropZone.className = 'battle-drop-zone';
    dropZone.innerHTML = '<i class="fa-solid fa-crosshairs"></i> Arrastra aquí para atacar';
    dropZone.ondragover = e => e.preventDefault();
    dropZone.ondrop = (e) => {
      e.preventDefault();
      const idx = e.dataTransfer.getData('text');
      checkAnswer(parseInt(idx));
    };
    container.appendChild(dropZone);

    // Draggables
    const dragContainer = document.createElement('div');
    currentQ.opts.forEach((opt, idx) => {
      const drag = document.createElement('div');
      drag.className = 'battle-draggable';
      drag.textContent = opt;
      drag.draggable = true;
      drag.ondragstart = (e) => e.dataTransfer.setData('text', idx);
      dragContainer.appendChild(drag);
    });
    container.appendChild(dragContainer);
  }
  else if (mech === 'fill') {
    const sentence = document.createElement('div');
    sentence.className = 'fill-sentence';
    sentence.innerHTML = currentQ.t.replace('___', '<span class="fill-slot">?</span>');
    container.appendChild(sentence);

    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex'; btnContainer.style.gap = '10px'; btnContainer.style.justifyContent = 'center';
    currentQ.opts.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'battle-option';
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(idx);
      btnContainer.appendChild(btn);
    });
    container.appendChild(btnContainer);
  }
  else if (mech === 'order') {
    // Simplificación para batalla rápida: Click en el PRIMER elemento correcto
    // Para mantener el ritmo de 10s, cambiamos la mecánica de "ordenar todo" a "selecciona el primero"
    // O implementamos orden rápido. Vamos a hacer orden rápido.
    let sequence = [];
    const slots = document.createElement('div');
    slots.className = 'order-container';
    
    // Crear índices y desordenarlos para mostrar botones mezclados
    const indices = currentQ.parts.map((_, i) => i);
    indices.sort(() => Math.random() - 0.5);

    indices.forEach(idx => { // idx es el índice real en el array original
      const btn = document.createElement('button');
      btn.className = 'battle-option';
      btn.textContent = currentQ.parts[idx];
      btn.onclick = () => {
        sequence.push(idx);
        btn.disabled = true;
        btn.style.opacity = 0.5;
        if (sequence.length === currentQ.order.length) {
          // Verificar orden
          const isCorrect = JSON.stringify(sequence) === JSON.stringify(currentQ.order);
          checkAnswer(isCorrect ? 1 : 0, true); // true flag para indicar que ya validamos
        }
      };
      slots.appendChild(btn);
    });
    container.appendChild(slots);
  }
}

function checkAnswer(idx, isPreValidated = false) {
  if (answered) return;
  answered = false;
  answered = true;
  clearInterval(turnTimer);

  const feedback = document.createElement("div");
  feedback.classList.add("feedback");
  
  const playerAvatar = document.querySelector('.player-avatar');
  const bossAvatar = document.querySelector('.boss-avatar');
  const card = document.querySelector('.card');

  let isCorrect = false;
  if (isPreValidated) {
    isCorrect = (idx === 1);
  } else {
    isCorrect = (idx === currentQ.a);
  }

  if (isCorrect) {
    // ACIERTO: Daño al Jefe
    bossHP -= 20; // 5 golpes para ganar
    playerAvatar.classList.add('attack-anim');
    setTimeout(() => playerAvatar.classList.remove('attack-anim'), 300);
    
    if (window.playSound) window.playSound('correct');
    feedback.classList.add("success");
    feedback.innerHTML = `<strong>¡Ataque Exitoso!</strong><br>${currentQ.exp}`;
  } else {
    // ERROR: Daño al Jugador
    playerHP -= 25; // 4 errores para perder
    card.classList.add('damage-effect');
    setTimeout(() => card.classList.remove('damage-effect'), 400);

    if (window.playSound) window.playSound('wrong');
    feedback.classList.add("error");
    const msg = idx === -1 ? "¡Tiempo Agotado!" : "¡Fallaste el ataque!";
    feedback.innerHTML = `<strong>${msg}</strong><br>${currentQ.exp}`;
  }

  updateHealthUI();
  
  // Deshabilitar botones
  document.querySelectorAll('.battle-option, .battle-draggable').forEach(b => {
    b.disabled = true;
    b.style.opacity = '0.6';
    b.draggable = false;
  });

  quiz.appendChild(feedback);

  setTimeout(() => {
    feedback.remove();
    loadReto();
  }, 2000);
}

function finishGame() {
  clearInterval(turnTimer);
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  let mensaje = "";
  let icono = "";
  let estrellas = 0;

  if (playerHP > 0) {
    // VICTORIA
    mensaje = `¡${currentLevel.boss} Derrotado! 🏆`;
    icono = "<div style='font-size: 4rem; margin-bottom: 10px; color: #f59e0b;'><i class='fa-solid fa-trophy'></i></div>";
    
    // Calcular estrellas según vida restante
    if (playerHP >= 80) estrellas = 3;
    else if (playerHP >= 40) estrellas = 2;
    else estrellas = 1;

  } else {
    // DERROTA
    mensaje = "¡Has sido vencido! 💀";
    icono = "<div style='font-size: 4rem; margin-bottom: 10px; color: #ef4444;'><i class='fa-solid fa-skull-crossbones'></i></div>";
    estrellas = 0;
  }

  scoreText.innerHTML = `
    <div style="text-align: center;">${icono}</div>
    <h2 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h2>
    <p style="text-align: center;">Vida Restante: <strong>${Math.max(0, playerHP)}%</strong></p>
    <div style="display: flex; flex-direction: column; gap: 5px; margin-top: 15px;">
      <button class="btn-primary" onclick="showLevelSelection()" style="width:100%; margin:0;">Volver al Mapa</button>
      <button class="btn-secondary" onclick="window.location.href='retos.html'" style="width:100%; margin:0;">Volver a Retos</button>
    </div>
  `;

  starsText.innerHTML = '<i class="fa-solid fa-star"></i>'.repeat(estrellas);

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  progreso.retos = progreso.retos || {};
  // Solo guardar si mejoramos la puntuación
  if (estrellas > (progreso.retos.avanzado?.estrellas || 0)) {
      progreso.retos.avanzado = { estrellas };
      localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));
  }

  if (estrellas === 3) {
    unlockAchievement("Domador de Bestias");
    setTimeout(() => unlockAchievement("Vencedor del Guardián"), 4500);
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
