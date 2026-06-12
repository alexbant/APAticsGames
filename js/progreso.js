document.addEventListener('DOMContentLoaded', () => {
  // 1. Obtener datos guardados de forma segura
  const rawData = JSON.parse(localStorage.getItem('apaticgamesProgreso')) || {};
  
  // Garantizar estructura mínima para evitar errores (Blindaje)
  const progreso = {
    citas: rawData.citas || { nivelActual: 1, estrellas: {} },
    referencias: rawData.referencias || { nivelActual: 1, estrellas: {} },
    formato: rawData.formato || { nivelActual: 1, estrellas: {} }
  };

  // 2. Función para calcular y actualizar barras
  function updateModule(moduleId, data, maxLevels = 5) {
    const safeData = data || { nivelActual: 1 };
    // El nivelActual 1 significa 0 completados. Nivel 6 significa 5 completados.
    let completed = (safeData.nivelActual || 1) - 1;
    if (completed > maxLevels) completed = maxLevels;
    if (completed < 0) completed = 0;

    const percentage = Math.round((completed / maxLevels) * 100);

    // Actualizar DOM
    const bar = document.getElementById(`${moduleId}Bar`);
    const text = document.getElementById(`${moduleId}Text`);

    if (bar) {
      // Pequeño delay para que la animación CSS se vea al cargar
      setTimeout(() => { bar.style.width = `${percentage}%`; }, 100);
    }
    if (text) text.innerHTML = `<strong>${completed}/${maxLevels}</strong> niveles completados`;

    return percentage;
  }

  // 3. Actualizar cada módulo
  const pCitas = updateModule('citas', progreso.citas);
  const pRef = updateModule('referencias', progreso.referencias);
  const pFormato = updateModule('formato', progreso.formato);

  // 4. Actualizar Resumen General
  const totalAvg = Math.round((pCitas + pRef + pFormato) / 3);
  
  // Contar módulos al 100%
  let modulesDone = 0;
  if (pCitas === 100) modulesDone++;
  if (pRef === 100) modulesDone++;
  if (pFormato === 100) modulesDone++;

  // Calcular total de estrellas
  function countStars(module) {
    if (!module || !module.estrellas) return 0;
    return Object.values(module.estrellas).reduce((sum, s) => sum + s, 0);
  }
  const totalStars = countStars(progreso.citas) + countStars(progreso.referencias) + countStars(progreso.formato);

  const modulosEl = document.getElementById('modulosCompletos');
  if (modulosEl) modulosEl.textContent = modulesDone;

  const generalBar = document.getElementById('generalBar');
  if (generalBar) setTimeout(() => { generalBar.style.width = `${totalAvg}%`; }, 100);

  const generalText = document.getElementById('generalText');
  if (generalText) {
    generalText.innerHTML = `<strong>${totalAvg}%</strong> del curso total<div style="margin-top: 5px; font-size: 0.9rem; color: var(--text-muted, #64748b);">Total de estrellas: <strong style="color: #f59e0b;">${totalStars} <i class="fa-solid fa-star"></i></strong></div>`;
  }
});