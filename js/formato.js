document.addEventListener('DOMContentLoaded', () => {
  const progreso = JSON.parse(localStorage.getItem('apaticgamesProgreso')) || {
    formato: { nivelActual: 1, estrellas: {} }
  };

  // ==========================================
  // LOGICA DE PROGRESO (ESTRELLAS)
  // ==========================================
  const progressContainer = document.querySelector('.progress') || document.getElementById('progress-section');
  
  if (progressContainer) {
    progressContainer.style.lineHeight = "1.8";

    const stars = (progreso.formato && progreso.formato.estrellas) ? progreso.formato.estrellas : {};
    let totalStars = 0;
    for (let i = 1; i <= 5; i++) {
      totalStars += (stars[i] || 0);
    }
    const maxStars = 15;
    const percent = Math.min(100, Math.round((totalStars / maxStars) * 100));

    const barFill = progressContainer.querySelector('.bar-fill');
    const barText = progressContainer.querySelector('.percent-text') || progressContainer.querySelector('p');
    
    if (barFill) barFill.style.width = `${percent}%`;
    if (barText) {
       barText.innerHTML = `<strong>Progreso:</strong> ${percent}% (${totalStars}/15 ⭐)`;
    }

    let msgDiv = document.getElementById('formato-status-msg');
    if (!msgDiv) {
      msgDiv = document.createElement('div');
      msgDiv.id = 'formato-status-msg';
      msgDiv.style.marginTop = "20px";
      progressContainer.appendChild(msgDiv);
    }

    if (totalStars >= maxStars) {
      msgDiv.innerHTML = `
        <div class="sidebar-msg success">
          <i class="fa-solid fa-trophy icon"></i>
          <div>
            <h4>¡Sección Completada!</h4>
            <p>Has dominado el Formato APA con puntuación perfecta.</p>
          </div>
        </div>
      `;
    } else {
      const missing = [];
      for (let i = 1; i <= 5; i++) {
        const s = stars[i] || 0;
        if (s < 3) missing.push({ lvl: i, stars: s });
      }

      if (missing.length > 0) {
        msgDiv.innerHTML = `
          <div class="sidebar-msg info">
            <strong class="title"><i class="fa-solid fa-circle-info"></i> Te faltan estrellas en:</strong>
            <ul>
              ${missing.map(m => `<li>Nivel ${m.lvl}: Tienes ${m.stars}/3 ⭐</li>`).join('')}
            </ul>
          </div>
        `;
      }
    }
  }

  // ==========================================
  // FUNCIONALIDAD DE TARJETAS (BLOQUEO, BOTONES Y ESTRELLAS)
  // ==========================================
  const cards = document.querySelectorAll('.level-card');
  const currentLevel = (progreso.formato && progreso.formato.nivelActual) ? progreso.formato.nivelActual : 1;

  cards.forEach((card, index) => {
    const levelNum = index + 1;
    const btn = card.querySelector('button') || card.querySelector('.btn-play');
    const lockedMsg = card.querySelector('.locked-msg');
    const targetUrl = `nivel${levelNum}F.html`; // URL específica para Formato (Sufijo F)

    // 1. Lógica de Desbloqueo
    if (levelNum <= currentLevel) {
      // --- DESBLOQUEADO ---
      card.classList.remove('locked');
      
      if (btn) {
        btn.classList.remove('hidden', 'disabled');
        btn.style.display = ''; 
        btn.style.pointerEvents = 'auto';
        btn.style.opacity = '1';
        btn.textContent = "Jugar";
        
        if (btn.tagName === 'A') {
          btn.href = targetUrl;
          btn.onclick = null;
        } else {
          btn.disabled = false;
          btn.onclick = () => window.location.href = targetUrl;
        }
      }
      
      if (lockedMsg) lockedMsg.style.display = 'none';
      
    } else {
      // --- BLOQUEADO ---
      card.classList.add('locked');
      
      if (btn) {
        btn.style.display = ''; 
        btn.textContent = "Bloqueado";
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.6';
        
        if (btn.tagName === 'A') {
          btn.removeAttribute('href');
        } else {
          btn.disabled = true;
        }
      }
      
      // Mensaje de bloqueo
      if (!lockedMsg) {
        const msg = document.createElement('p');
        msg.className = 'locked-msg';
        msg.style.cssText = "margin-top: 10px; font-size: 0.9rem; color: var(--text-muted);";
        msg.innerHTML = '<i class="fa-solid fa-square-xmark"></i> Completa el nivel anterior ';
        if (btn) card.insertBefore(msg, btn);
        else card.appendChild(msg);
      }
    }

    // 2. Mostrar Estrellas Ganadas
    const starsEarned = (progreso.formato && progreso.formato.estrellas && progreso.formato.estrellas[levelNum]) ? progreso.formato.estrellas[levelNum] : 0;
    if (starsEarned > 0) {
      let starsDisplay = card.querySelector('.stars-display');
      if (!starsDisplay) {
        starsDisplay = document.createElement('div');
        starsDisplay.className = 'stars-display';
        starsDisplay.style.cssText = "margin-bottom: 10px; font-size: 1.2rem; color: #fbbf24;";
        if (btn) card.insertBefore(starsDisplay, btn);
        else card.appendChild(starsDisplay);
      }
      starsDisplay.innerHTML = '⭐'.repeat(starsEarned);
    }
  });
});