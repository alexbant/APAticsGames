document.addEventListener('DOMContentLoaded', () => {
  const progreso = JSON.parse(localStorage.getItem('apaticgamesProgreso')) || {};
  const cards = document.querySelectorAll('.dashboard-grid .card-base');

  if (cards.length < 6) return;

  // Iconos para cada paso
  const icons = [
    'fa-user-plus',      // 1. Crear cuenta
    'fa-quote-right',    // 2. Citas
    'fa-book-open',      // 3. Referencias
    'fa-file-pen',       // 4. Formato
    'fa-trophy',         // 5. Final
    'fa-dragon'          // 6. Duelo
  ];

  const statusData = [
    { el: cards[0], status: 'done' }, // 1. Crear cuenta
    { el: cards[1], module: 'citas', dependsOn: null }, // 2. Citas
    { el: cards[2], module: 'referencias', dependsOn: 'citas' }, // 3. Referencias
    { el: cards[3], module: 'formato', dependsOn: 'referencias' }, // 4. Formato
    { el: cards[4], module: 'final', dependsOn: 'formato' }, // 5. Evaluación final
    { el: cards[5], module: 'duelo', dependsOn: 'final' } // 6. Duelo de Guardianes
  ];

  const moduleStatus = {};

  // Calcular estado de cada módulo
  statusData.forEach((item, index) => {
    if (index === 0) {
      moduleStatus['crear_cuenta'] = 'done';
      return;
    }

    const mod = item.module;
    const dep = item.dependsOn;
    const nivelActual = progreso[mod]?.nivelActual || 1;

    if (mod === 'final') {
      if (moduleStatus['formato'] === 'done') {
        // Si el desafío final ya se completó, marcarlo como 'done'
        moduleStatus[mod] = progreso.avanzado?.completado ? 'done' : 'active';
      } else {
        moduleStatus[mod] = 'locked';
      }
    } else if (mod === 'duelo') {
      if (moduleStatus['final'] === 'done') {
        // Verificar si el Reto Avanzado tiene estrellas guardadas
        moduleStatus[mod] = (progreso.retos && progreso.retos.avanzado && progreso.retos.avanzado.estrellas > 0) ? 'done' : 'active';
      } else {
        moduleStatus[mod] = 'locked';
      }
    } else {
      if (nivelActual > 5) {
        moduleStatus[mod] = 'done';
      } else if (dep === null || moduleStatus[dep] === 'done') {
        moduleStatus[mod] = 'active';
      } else {
        moduleStatus[mod] = 'locked';
      }
    }
  });

  // Actualizar la UI
  statusData.forEach((item, index) => {
    // Inyectar icono temático en lugar del número
    const stepEl = item.el.querySelector('.step');
    if (stepEl) {
      stepEl.innerHTML = `<i class="fa-solid ${icons[index]}"></i>`;
    }

    const statusEl = item.el.querySelector('.status');
    if (!statusEl) return;

    let status;
    if (index === 0) {
      status = 'done';
    } else {
      status = moduleStatus[item.module];
    }
    
    let icon = '';
    let text = '';

    switch (status) {
      case 'done':
        icon = 'fa-solid fa-circle-check';
        text = 'Completado';
        break;
      case 'active':
        icon = 'fa-solid fa-spinner fa-spin';
        text = 'En progreso';
        break;
      case 'locked':
        icon = 'fa-solid fa-lock';
        text = 'Bloqueado';
        break;
    }

    statusEl.className = `status ${status}`;
    statusEl.innerHTML = `<i class="${icon}"></i> ${text}`;
  });

  // Verificar si TODOS los módulos están completados para dar el logro final
  const allDone = statusData.every((item, index) => {
    if (index === 0) return true; // Crear cuenta siempre es done
    return moduleStatus[item.module] === 'done';
  });

  if (allDone) {
    unlockAchievement("Trayectoria Completa");
  }
});

function unlockAchievement(name) {
  const progreso = JSON.parse(localStorage.getItem("apaticgamesProgreso")) || {};
  if (!progreso.logros) progreso.logros = [];

  if (!progreso.logros.includes(name)) {
    progreso.logros.push(name);
    localStorage.setItem("apaticgamesProgreso", JSON.stringify(progreso));
    if (window.showNotification) window.showNotification(`<i class="fa-solid fa-trophy"></i> Logro: ${name}`, 'success');
  }
}