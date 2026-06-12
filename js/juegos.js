document.addEventListener('DOMContentLoaded', () => {
  const modoDev = localStorage.getItem("modoDev") === "true";
  const progreso = JSON.parse(localStorage.getItem('apaticgamesProgreso')) || {};
  
  // Verificar si se completaron los 3 módulos (Nivel > 5 en cada uno)
  // Nota: nivelActual 6 significa que completó el 5.
  const citasOk = modoDev || (progreso.citas?.nivelActual || 1) > 5;
  const refOk = modoDev || (progreso.referencias?.nivelActual || 1) > 5;
  const formatoOk = modoDev || (progreso.formato?.nivelActual || 1) > 5;

  if (citasOk && refOk && formatoOk) {
    const finalCard = document.getElementById('finalChallenge');
    if (finalCard) {
      finalCard.classList.remove('locked');
      
      // Cambiar icono e info
      const icon = finalCard.querySelector('.game-icon i');
      if (icon) icon.className = "fa-solid fa-trophy";
      
      const btn = finalCard.querySelector('button');
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Jugar";
        btn.onclick = () => window.location.href = 'DesafioFinal.html';
      }
    }
  }
});