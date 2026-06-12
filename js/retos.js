// Función global para navegación
function startReto(tipo) {
  if (tipo === 'diario') window.location.href = 'diario.html';
  if (tipo === 'citas') window.location.href = 'rcitas.html';
  if (tipo === 'referencias') window.location.href = 'rreferencias.html';
  if (tipo === 'avanzado') window.location.href = 'ravanzado.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const modoDev = localStorage.getItem("modoDev") === "true";
  const progreso = JSON.parse(localStorage.getItem('apaticgamesProgreso')) || {};

  // Verificar si se cumplen las condiciones para el Reto Avanzado
  // (Debe haber completado Juegos y Jerarquía)
  const juegosOk = (progreso.citas?.nivelActual > 5) && 
                   (progreso.referencias?.nivelActual > 5) && 
                   (progreso.formato?.nivelActual > 5);
  const jerarquiaOk = progreso.jerarquia?.completado === true;

  const desbloqueado = modoDev || (juegosOk && jerarquiaOk);

  if (desbloqueado) {
    const advancedCard = document.querySelector('.reto-card.locked');
    if (advancedCard) {
      advancedCard.classList.remove('locked');
      
      // Cambiar icono a fuego (activo)
      const icon = advancedCard.querySelector('.icon i');
      if (icon) icon.className = "fa-solid fa-fire";

      // Habilitar botón
      const btn = advancedCard.querySelector('button');
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Comenzar";
        btn.onclick = () => startReto('avanzado');
      }
    }
  }

  // Actualizar visualmente la tarjeta de "Reto de Citas" a "Retos Semanales"
  const citasBtn = document.querySelector("button[onclick=\"startReto('citas')\"]");
  if (citasBtn) {
    const card = citasBtn.closest('.reto-card');
    if (card) {
      const title = card.querySelector('h3');
      const desc = card.querySelector('p');
      const icon = card.querySelector('.icon i');
      if (title) title.textContent = "Retos Semanales";
      if (desc) desc.textContent = "Pon a prueba tu racha. 10 desafíos y 3 vidas. ¿Sobrevivirás a la semana?";
      if (icon) icon.className = "fa-solid fa-calendar-week";
    }
  }

  // Actualizar visualmente la tarjeta de "Reto de Referencias" a "Contra Reloj"
  const refBtn = document.querySelector("button[onclick=\"startReto('referencias')\"]");
  if (refBtn) {
    const card = refBtn.closest('.reto-card');
    if (card) {
      const title = card.querySelector('h3');
      const desc = card.querySelector('p');
      const icon = card.querySelector('.icon i');
      if (title) title.textContent = "Contra Reloj";
      if (desc) desc.textContent = "4 meses de alta velocidad. Demuestra qué tan rápido puedes identificar referencias correctas.";
      if (icon) icon.className = "fa-solid fa-stopwatch";
    }
  }
});