// =========================
// Retos Semanales (Citas)
// =========================

// Configuración de Semanas (10 preguntas por semana)
const semanas = [
  {
    id: 1,
    titulo: "Fundamentos",
    icono: "fa-quote-left",
    preguntas: [
      { texto: "(Pérez, 2020) La educación es clave...", options: ["Correcto", "Error de posición"], correcta: 1, explicacion: "La cita parentética debe ir al final de la frase o integrada, no suelta al inicio." },
      { texto: "Según Gómez (2019), el aprendizaje...", options: ["Correcto", "Falta año", "Sobra paréntesis"], correcta: 0, explicacion: "Es una cita narrativa correcta." },
      { texto: "La motivación influye (Lopez: 2021).", options: ["Correcto", "Error de puntuación"], correcta: 1, explicacion: "En APA se usa coma (Lopez, 2021), no dos puntos." },
      { texto: "El estudio fue concluyente (Martínez, 2018).", options: ["Correcto", "Falta página", "Error de autor"], correcta: 0, explicacion: "Cita parentética básica correcta." },
      { texto: "Según (Ramírez, 2022) la investigación...", options: ["Correcto", "Redundancia"], correcta: 1, explicacion: "No uses 'Según' seguido de paréntesis. Di 'Según Ramírez (2022)'." },
      { texto: "Como afirma Torres (2020): 'El dato es real'.", options: ["Correcto", "Sobra dos puntos"], correcta: 0, explicacion: "El uso de dos puntos es correcto para introducir la cita." },
      { texto: "El autor (2019) señala que... 'el texto es claro'.", options: ["Correcto", "Falta autor"], correcta: 0, explicacion: "Cita narrativa válida aludiendo al autor." },
      { texto: "La teoría es clara (González 2020).", options: ["Correcto", "Falta coma"], correcta: 1, explicacion: "Debe ser (González, 2020)." },
      { texto: "En 2019, Pérez descubrió el método.", options: ["Correcto", "Orden incorrecto"], correcta: 0, explicacion: "Es válido iniciar la oración con el año en citas narrativas." },
      { texto: "El concepto se define como 'abstracto' (Pérez).", options: ["Correcto", "Falta año"], correcta: 1, explicacion: "Siempre se requiere el año: (Pérez, s.f.) o (Pérez, 2020)." }
    ]
  },
  {
    id: 2,
    titulo: "Autores Múltiples",
    icono: "fa-users",
    preguntas: [
      { texto: "(Gómez y Pérez, 2019)", options: ["Correcto", "Usar '&'"], correcta: 1, explicacion: "En citas parentéticas se usa el ampersand (&)." },
      { texto: "Gómez & Pérez (2019)", options: ["Correcto", "Usar 'y'"], correcta: 1, explicacion: "En citas narrativas se usa la 'y' normal." },
      { texto: "(Smith et al., 2020)", options: ["Correcto", "Falta autores"], correcta: 0, explicacion: "Para 3 o más autores se usa 'et al.' desde la primera vez." },
      { texto: "Ruiz, Díaz y Soto (2018)", options: ["Correcto", "Usar et al."], correcta: 1, explicacion: "Al ser 3 autores, debe ser 'Ruiz et al. (2018)'." },
      { texto: "Según Silva y otros (2021)", options: ["Correcto", "Usar et al."], correcta: 1, explicacion: "En APA se usa la expresión latina 'et al.', no 'y otros'." },
      { texto: "López et al. (2022)", options: ["Correcto", "Falta punto"], correcta: 0, explicacion: "Uso correcto de et al. en narrativa." },
      { texto: "(A, B, & C, 2019)", options: ["Correcto", "Demasiados autores"], correcta: 1, explicacion: "Para 3+ autores, solo se lista el primero seguido de et al." },
      { texto: "A y B (2020) afirman...", options: ["Correcto", "Usar &"], correcta: 0, explicacion: "Narrativa con dos autores usa 'y'." },
      { texto: "(A & B, 2020)", options: ["Correcto", "Usar y"], correcta: 0, explicacion: "Parentética con dos autores usa '&'." },
      { texto: "La Organización (2020)", options: ["Correcto", "Falta sigla"], correcta: 0, explicacion: "Citar por nombre corporativo es válido." }
    ]
  },
  {
    id: 3,
    titulo: "Casos Especiales",
    icono: "fa-star",
    preguntas: [
      { texto: "'La paz es vital' (s.f.).", options: ["Correcto", "Falta fecha"], correcta: 0, explicacion: "(s.f.) es la abreviatura correcta para 'sin fecha'." },
      { texto: "La OMS (2020) reporta...", options: ["Correcto", "Definir sigla"], correcta: 0, explicacion: "Si la sigla es conocida o se definió antes, es correcto." },
      { texto: "Como dice (YouTube, 2019)...", options: ["Correcto", "Autor incorrecto"], correcta: 1, explicacion: "Se cita al nombre del canal o autor del video, no a la plataforma." },
      { texto: "López (citado en Ruiz, 2020)", options: ["Correcto", "Cita directa"], correcta: 0, explicacion: "Formato correcto para cita secundaria." },
      { texto: "La ley 100 (Congreso, 1993)", options: ["Correcto", "Falta autor"], correcta: 0, explicacion: "Cita legal básica aceptable." },
      { texto: "Anónimo (2015) escribió...", options: ["Correcto", "Usar 's.a.'"], correcta: 0, explicacion: "Se usa 'Anónimo' solo si la obra está firmada explícitamente así." },
      { texto: "(Autor, sin fecha)", options: ["Correcto", "Usar s.f."], correcta: 1, explicacion: "Debe usarse la abreviatura estándar 's.f.'." },
      { texto: "El libro 'Estudios' (2010)...", options: ["Correcto", "Falta autor"], correcta: 0, explicacion: "Si no hay autor, se usa el título de la obra." },
      { texto: "(Comunicación personal, 2020)", options: ["Correcto", "Falta referencia"], correcta: 0, explicacion: "Las comunicaciones personales se citan en texto pero no van en referencias." },
      { texto: "Según Wikipedia (2020)...", options: ["Correcto", "Fuente no académica"], correcta: 1, explicacion: "Evita citar wikis o fuentes terciarias inestables." }
    ]
  },
  {
    id: 4,
    titulo: "Puntuación",
    icono: "fa-pen-nib",
    preguntas: [
      { texto: "...'esto es verdad' (p. 4).", options: ["Correcto", "Punto antes"], correcta: 0, explicacion: "El punto final va DESPUÉS del paréntesis de la cita." },
      { texto: "...'esto es verdad'. (p. 4)", options: ["Correcto", "Punto después"], correcta: 1, explicacion: "El punto no debe ir antes del paréntesis en citas cortas." },
      { texto: "(García, 2020, p.12)", options: ["Correcto", "Falta espacio"], correcta: 1, explicacion: "Debe haber un espacio después del punto: 'p. 12'." },
      { texto: "Como dice: 'El sol brilla' (Lee, 2019).", options: ["Correcto", "Sobra dos puntos"], correcta: 0, explicacion: "Puntuación correcta." },
      { texto: "El estudio (2020) de Kim...", options: ["Correcto", "Orden incorrecto"], correcta: 1, explicacion: "El año debe ir inmediatamente después del autor: 'Kim (2020)'." },
      { texto: "Según Paz (2018), 'la vida...'", options: ["Correcto", "Sobra coma"], correcta: 0, explicacion: "La coma después del año/autor es gramaticalmente correcta aquí." },
      { texto: "(Autor, 2020; Otro, 2021)", options: ["Correcto", "Usar coma"], correcta: 0, explicacion: "El punto y coma separa citas de diferentes autores." },
      { texto: "(Autor, 2020, p. 40-41)", options: ["Correcto", "Usar pp."], correcta: 1, explicacion: "Para un rango de páginas se usa la abreviatura plural 'pp.'." },
      { texto: "(Autor, 2020, pp. 40-41)", options: ["Correcto", "Usar p."], correcta: 0, explicacion: "Uso correcto de 'pp.' para rangos." },
      { texto: "...del párrafo (Autor, 2020)", options: ["Correcto", "Falta punto"], correcta: 1, explicacion: "Falta el punto final de la oración después del paréntesis." }
    ]
  },
  {
    id: 5,
    titulo: "Parafraseo",
    icono: "fa-rotate",
    preguntas: [
      { texto: "Parafrasear es copiar y pegar.", options: ["Verdadero", "Falso"], correcta: 1, explicacion: "Parafrasear es reescribir la idea con tus propias palabras." },
      { texto: "¿El parafraseo lleva cita?", options: ["Sí, siempre", "No es necesario"], correcta: 0, explicacion: "Siempre debes dar crédito al autor original, incluso al parafrasear." },
      { texto: "¿El parafraseo lleva comillas?", options: ["Sí", "No"], correcta: 1, explicacion: "No, porque no son las palabras exactas del autor." },
      { texto: "¿Se requiere número de página?", options: ["Obligatorio", "Recomendado"], correcta: 1, explicacion: "En parafraseo es opcional, pero recomendado para textos largos." },
      { texto: "Cambiar solo una palabra es...", options: ["Parafraseo", "Plagio"], correcta: 1, explicacion: "Cambiar pocas palabras manteniendo la estructura es plagio." },
      { texto: "(García, 2020) sostiene que...", options: ["Correcto", "Incorrecto"], correcta: 0, explicacion: "Formato válido para introducir una paráfrasis." },
      { texto: "Resumir una idea es parafrasear.", options: ["Sí", "No"], correcta: 0, explicacion: "El resumen es una forma de parafraseo." },
      { texto: "El autoplagio aplica al parafraseo.", options: ["Sí", "No"], correcta: 0, explicacion: "Debes citarte a ti mismo si reutilizas tus ideas previas." },
      { texto: "Parafrasear demuestra comprensión.", options: ["Sí", "No"], correcta: 0, explicacion: "Requiere entender el texto para explicarlo." },
      { texto: "Cita narrativa en parafraseo.", options: ["Autor (Año)", "(Autor, Año)"], correcta: 0, explicacion: "Ambos formatos son válidos, pero Autor (Año) es el narrativo." }
    ]
  },
  {
    id: 6,
    titulo: "Errores Comunes",
    icono: "fa-bug",
    preguntas: [
      { texto: "(Pérez, p. 45)", options: ["Correcto", "Falta año"], correcta: 1, explicacion: "Falta el año de publicación: (Pérez, 2020, p. 45)." },
      { texto: "Según (Autor, 2020)...", options: ["Correcto", "Error sintaxis"], correcta: 1, explicacion: "No pongas al autor entre paréntesis si usas 'Según'." },
      { texto: "p.g. 45", options: ["Correcto", "Error abrev."], correcta: 1, explicacion: "La abreviatura correcta es 'p.', no 'p.g.'." },
      { texto: "Incluir URL en cita.", options: ["Correcto", "Incorrecto"], correcta: 1, explicacion: "Las URLs van en la lista de referencias, no en la cita." },
      { texto: "Usar iniciales del nombre.", options: ["Correcto", "Incorrecto"], correcta: 1, explicacion: "En las citas solo se usan apellidos (salvo excepciones de homónimos)." },
      { texto: "Ibid (2020)", options: ["Correcto", "Incorrecto"], correcta: 1, explicacion: "APA 7 ya no usa 'Ibid' ni 'Op. cit.'." },
      { texto: "Subrayar la cita.", options: ["Correcto", "Incorrecto"], correcta: 1, explicacion: "APA no utiliza subrayado para énfasis." },
      { texto: "Negrita en el autor.", options: ["Correcto", "Incorrecto"], correcta: 1, explicacion: "No se usa negrita para resaltar autores en el texto." },
      { texto: "et. al.", options: ["Correcto", "Error punto"], correcta: 1, explicacion: "Es 'et al.' (punto solo al final de al)." },
      { texto: "Cita sin espacio: (Autor,2020)", options: ["Correcto", "Falta espacio"], correcta: 1, explicacion: "Siempre debe haber espacio después de la coma." }
    ]
  }
];

// Inyectar estilos para el calendario semanal
const style = document.createElement('style');
style.innerHTML = `
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4 columnas para que 5 y 6 bajen */
    gap: 15px;
    margin: 20px 0;
  }
  @media (max-width: 900px) {
    .calendar-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .week-card {
    background: var(--card-bg, #fff);
    border: 2px solid var(--border-color, #e2e8f0);
    border-radius: 12px;
    padding: 20px 10px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s, border-color 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .week-card:hover {
    transform: translateY(-3px);
    border-color: var(--primary-color, #0f3c78);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .week-card h3 { margin: 10px 0 5px; font-size: 1rem; color: var(--text-color); }
  .week-card span { font-size: 0.8rem; color: var(--text-muted); }
  .week-icon { font-size: 1.8rem; color: var(--primary-color); margin-bottom: 5px; }
  
  /* Estilos para la barra de estado del juego */
  .game-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--hover-bg, #f1f5f9);
    padding: 10px 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    font-weight: bold;
    border: 1px solid var(--border-color);
  }
  .lives { color: #ef4444; font-size: 1.2rem; letter-spacing: 2px; }
  .streak { color: #f59e0b; font-size: 1rem; }
  
  @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }

  body.dark .week-card { background: #1e293b; border-color: #334155; }
  body.dark .week-card:hover { border-color: var(--primary-color); }
  body.dark .week-card h3 { color: #e5e7eb; }
  body.dark .game-stats { background: #1e293b; border-color: #334155; }
  
  /* Estilos Drag & Drop (Arrastrar y Soltar) */
  .drop-target {
    border: 3px dashed var(--border-color);
    border-radius: 16px;
    padding: 30px 20px;
    text-align: center;
    margin: 20px 0;
    background: var(--hover-bg);
    color: var(--text-muted);
    font-weight: 600;
    transition: all 0.3s ease;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .drop-target i { font-size: 2rem; opacity: 0.5; margin-bottom: 5px; }
  .drop-target.drag-over {
    border-color: var(--primary-color);
    background: rgba(15, 60, 120, 0.05);
    transform: scale(1.02);
  }
  
  .draggable-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    margin-top: 30px;
  }
  
  .draggable-item {
    background: var(--card-bg);
    border: 2px solid var(--border-color);
    padding: 12px 24px;
    border-radius: 50px;
    cursor: grab;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    transition: all 0.2s;
    user-select: none;
    color: var(--text-color);
  }
  
  .draggable-item:hover {
    transform: translateY(-2px);
    border-color: var(--primary-color);
    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  }
  
  .draggable-item:active { cursor: grabbing; }
  .draggable-item.dragging { opacity: 0.4; }

  /* Estados de Feedback */
  .drop-target.correct { border-color: #22c55e; background: #f0fdf4; color: #15803d; }
  .drop-target.wrong { border-color: #ef4444; background: #fef2f2; color: #991b1b; }

  .cita-box { font-size: 1.3rem; font-family: 'Times New Roman', serif; margin-bottom: 30px; padding: 30px; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); position: relative; }
  .cita-box::before { content: '"'; position: absolute; top: -10px; left: 20px; font-size: 4rem; color: var(--primary-color); opacity: 0.2; font-family: serif; }

  .challenge-instruction {
    background: var(--hover-bg);
    padding: 12px 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    font-size: 0.95rem;
    color: var(--text-muted);
    border-left: 4px solid var(--primary-color);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  body.dark .drop-target { background: #1e293b; border-color: #374151; }
  body.dark .draggable-item { background: #1f2937; border-color: #374151; color: #e5e7eb; }
  body.dark .drop-target.correct { background: rgba(34, 197, 94, 0.15); border-color: #22c55e; color: #86efac; }
  body.dark .drop-target.wrong { background: rgba(239, 68, 68, 0.15); border-color: #ef4444; color: #fca5a5; }
  body.dark .cita-box { background: #1f2937; color: #e5e7eb; }
`;
document.head.appendChild(style);

let currentRetos = [];
let current = 0;
let score = 0;
let lives = 3;
let streak = 0;
let answered = false;

// Elementos
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const citaTexto = document.getElementById("citaTexto");
const progress = document.getElementById("progress");
const scoreText = document.getElementById("scoreText");
const starsText = document.getElementById("stars");

// Estandarización de Introducción
if (intro) {
  intro.innerHTML = `
    <span class="level">Modo Supervivencia</span>
    <h1>Retos Semanales: Citas</h1>
    <div class="intro-compact">
        <p class="intro-description">
            Enfréntate a 10 situaciones de citación reales. Arrastra la respuesta correcta a la zona indicada.
        </p>
        <ul>
            <li><i class="fa-solid fa-hand-pointer" style="color:#3b82f6"></i> <strong>Arrastrar y Soltar:</strong> Nueva mecánica.</li>
            <li><i class="fa-solid fa-heart" style="color:#ef4444"></i> <strong>3 Vidas:</strong> Si fallas, pierdes una.</li>
            <li><i class="fa-solid fa-fire" style="color:#f59e0b"></i> <strong>Racha:</strong> Acierta seguido para ganar más.</li>
        </ul>
    </div>
    <button class="btn-primary" onclick="showWeeks()">Ver Semanas</button>
  `;
}

// =========================
// Flujo
// =========================
function showWeeks() {
  intro.innerHTML = `
    <h1>Semanas de Reto</h1>
    <p class="subtitle">Selecciona una semana para comenzar.</p>
    <div class="calendar-grid" id="weekGrid"></div>
    <button class="btn-secondary" onclick="location.reload()" style="margin-top:20px">Volver</button>
  `;

  const grid = document.getElementById("weekGrid");
  
  semanas.forEach(sem => {
    const card = document.createElement("div");
    card.className = "week-card";
    card.innerHTML = `
      <div class="week-icon"><i class="fa-solid ${sem.icono}"></i></div>
      <h3>Semana ${sem.id}</h3>
      <span>${sem.titulo}</span>
    `;
    card.onclick = () => startWeek(sem);
    grid.appendChild(card);
  });
}

function loadReto() {
    progress.textContent = `Pregunta ${current + 1} de ${currentRetos.length}`;

    // Limpiar contenedor de quiz pero mantener stats
    const stats = quiz.querySelector('.game-stats');
    quiz.innerHTML = "";
    if (stats) quiz.appendChild(stats);

    // Crear elemento de pregunta
    const qText = document.createElement('div');
    qText.className = "cita-box";
    qText.textContent = currentRetos[current].texto;
    quiz.appendChild(qText);

    // Crear Zona de Caída (Drop Zone)
    const dropZone = document.createElement('div');
    dropZone.className = "drop-target";
    dropZone.id = "dropZone";
    dropZone.innerHTML = `<i class="fa-solid fa-hand-pointer"></i><span>Arrastra la respuesta aquí</span>`;
    
    // Eventos de Drop
    dropZone.addEventListener('dragover', e => { e.preventDefault(); if(!answered) dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', handleDrop);
    quiz.appendChild(dropZone);

    // Crear contenedor de opciones
    const optsDiv = createDraggableOptions(currentRetos[current]);
    quiz.appendChild(optsDiv);

    answered = false; // ¡IMPORTANTE! Reiniciar estado para permitir selección
}

function startWeek(semana) {
  currentRetos = semana.preguntas;
  current = 0;
  score = 0;
  lives = 3;
  streak = 0;
  

  // Limpiar intro y mostrar quiz
  intro.innerHTML = ""; 
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");

  // Inyectar barra de estado si no existe
  if (!document.querySelector('.game-stats')) {
    const statsBar = document.createElement('div');
    statsBar.className = 'game-stats';
    statsBar.innerHTML = `
      <div class="lives" id="livesDisplay">❤️❤️❤️</div>
      <div class="streak" id="streakDisplay">Racha: 0</div>
    `;
    quiz.insertBefore(statsBar, quiz.firstChild);
  } else {
    updateStatsUI();
  }

    loadReto();
}

function updateStatsUI() {
  const hearts = '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
  document.getElementById('livesDisplay').textContent = hearts;
  document.getElementById('streakDisplay').textContent = `Racha: ${streak}`;
}

function createDraggableOptions(reto) {
    const optsDiv = document.createElement('div');
    optsDiv.className = "draggable-container";

    reto.options.forEach((opt, idx) => {
        const card = document.createElement('div');
        card.className = "draggable-item";
        card.textContent = opt;
        card.draggable = true;
        
        card.addEventListener('dragstart', e => {
            if(answered) { e.preventDefault(); return; }
            e.dataTransfer.setData('text/plain', idx);
            e.dataTransfer.setData('content', opt);
            card.classList.add('dragging');
        });
        card.addEventListener('dragend', () => card.classList.remove('dragging'));
        
        optsDiv.appendChild(card);
    });
    return optsDiv;
}

function handleDrop(e) {
    e.preventDefault();
    const dropZone = document.getElementById('dropZone');
    dropZone.classList.remove('drag-over');
    if(answered) return;
    
    const idx = parseInt(e.dataTransfer.getData('text/plain'));
    const content = e.dataTransfer.getData('content');
    
    if(!isNaN(idx)) {
        dropZone.innerHTML = `<strong>${content}</strong>`;
        checkAnswer(idx);
    }
}

function checkAnswer(respuesta) {
  if (answered) return;
  answered = true;

  const dropZone = document.getElementById('dropZone');
  const reto = currentRetos[current];
  const feedback = document.createElement("div");
  feedback.classList.add("feedback");

  // Si respuesta es null (tiempo agotado) o índice incorrecto
  const isCorrect = (respuesta === reto.correcta);

  if (isCorrect) {
    score++;
    streak++;
    if (window.playSound) window.playSound('correct');
    feedback.classList.add("success");
    feedback.innerHTML = "<i class='fa-solid fa-circle-check'></i> Correcto<br>" + reto.explicacion;
    dropZone.classList.add('correct');
    dropZone.innerHTML += ` <i class="fa-solid fa-check"></i>`;
  } else {
    lives--;
    streak = 0;
    if (window.playSound) window.playSound('wrong');
    feedback.classList.add("error");
    const msg = "Incorrecto";
    feedback.innerHTML = `<i class='fa-solid fa-circle-xmark'></i> ${msg}<br>${reto.explicacion} la`;
    dropZone.classList.add('wrong');
    dropZone.innerHTML += ` <i class="fa-solid fa-xmark"></i>`;
  }

  // Deshabilitar botones
  const btns = document.querySelectorAll('.draggable-item');
  btns.forEach(b => { 
      b.draggable = false; 
      b.style.opacity = '0.5'; 
      b.style.cursor = 'default'; 
  });

  updateStatsUI();
  quiz.appendChild(feedback);

    setTimeout(() => {
    feedback.remove();
    
    if (lives > 0) {
      current++;
      current < currentRetos.length ? loadReto() : finishGame(true);
    } else {
      finishGame(false); // Game Over
    }
  }, 2200);
};

function finishGame(completed) {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  let mensaje = "";
  let icono = "";
  let estrellas = 0;

  if (!completed) {
    mensaje = "¡Misión Fallida! 💔";
    icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: #ef4444;'><i class='fa-solid fa-heart-crack'></i></div>";
  } else {
    if (score === currentRetos.length) {
      mensaje = "¡Diagnóstico Perfecto! 🩺";
      icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-quote-left'></i></div>";
      estrellas = 3;
    } else if (score >= 7) {
      mensaje = "¡Vas Bien! 👍";
      icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-pen-to-square'></i></div>";
      estrellas = 2;
    } else {
      mensaje = "¡Revisa la Norma! 📖";
      icono = "<div style='font-size: 3rem; margin-bottom: 10px; color: var(--primary-color);'><i class='fa-solid fa-book-open'></i></div>";
      estrellas = 1;
    }
  }

  scoreText.innerHTML = `<div style="text-align: center;">${icono}</div><h3 style="text-align: center; color: var(--primary-color); margin-bottom: 10px;">${mensaje}</h3><div style="text-align: center;">Aciertos: <strong>${score} de ${currentRetos.length}</strong></div>`;

  if (completed) {
    starsText.innerHTML = '<i class="fa-solid fa-star"></i>'.repeat(estrellas);
  } else {
    starsText.innerHTML = ''; // No mostrar estrellas si falló
  }

  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  // Guardar solo si completó el nivel
  if (completed) {
    progreso.citas.estrellas["reto_semanal"] = Math.max(progreso.citas.estrellas["reto_semanal"] || 0, estrellas);
    localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));

    if (score === currentRetos.length) {
      unlockAchievement("Retador de Citas");
      setTimeout(() => unlockAchievement("Invicto en Citas"), 4500);
    }
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
