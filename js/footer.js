document.addEventListener('DOMContentLoaded', () => {
  // --- INYECCIÓN AUTOMÁTICA DEL FOOTER ---
  // Busca si ya existe un footer
  const existingFooter = document.querySelector('footer');
  
  // Si no existe, o está vacío, lo generamos dinámicamente
  if (!existingFooter || existingFooter.innerHTML.trim() === '') {
    const footer = existingFooter || document.createElement('footer');
    
    footer.innerHTML = `
      <div class="logo">
        <img src="images/logo.png" alt="Logo" onerror="this.style.display='none'">
        APAticGames
      </div>
      <p>Aprende jugando, sin apatía.</p>
      <p style="font-size: 0.9rem; opacity: 0.8;">© 2025 APAticGames. Todos los derechos reservados.</p>
    `;

    // Si no existía la etiqueta, la agregamos al final del cuerpo
    if (!existingFooter) {
      document.body.appendChild(footer);
    }
  }
});