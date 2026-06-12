import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // CÁLCULO DE RANGO Y ESTADÍSTICAS (MOVIDO AL INICIO)
  // ==========================================
  const progreso = JSON.parse(localStorage.getItem('apaticgamesProgreso')) || {
    citas: { nivelActual: 1, estrellas: {} },
    referencias: { nivelActual: 1, estrellas: {} },
    formato: { nivelActual: 1, estrellas: {} }
  };

  function getStats(module) {
    let levels = (module.nivelActual || 1) - 1;
    if (levels > 5) levels = 5;
    let stars = 0;
    if (module.estrellas) {
      // Solo contar niveles 1-5 para coincidir con la vista de módulos
      for (let i = 1; i <= 5; i++) {
        stars += (module.estrellas[i] || 0);
      }
    }
    return { levels, stars };
  }

  const sCitas = getStats(progreso.citas);
  const sRef = getStats(progreso.referencias);
  const sFormato = getStats(progreso.formato);

  const totalLevels = sCitas.levels + sRef.levels + sFormato.levels;
  const totalStars = sCitas.stars + sRef.stars + sFormato.stars;
  
  let rank = "Novato";
  if (totalLevels >= 15) rank = "Maestro APA";
  else if (totalLevels >= 12) rank = "Experto";
  else if (totalLevels >= 8) rank = "Avanzado";
  else if (totalLevels >= 4) rank = "Aprendiz";

  // Cargar datos de la SESIÓN ACTIVA (no solo del registro)
  const user = JSON.parse(localStorage.getItem('apaticgamesSession'));

  if (!user) {
    window.location.href = 'ingresar.html';
    return;
  }

  const profileName = document.querySelector('.profile h2');
  const sideExtra = document.querySelector('.side-extra');
  const profileLevel = document.querySelector('.profile .level');

  // ==========================================
  // LÓGICA DE ESTADO Y ESTADÍSTICAS
  // ==========================================
  const stats = JSON.parse(localStorage.getItem('apaticgamesStats')) || { timePlayed: 0, lastLogin: Date.now(), status: 'Activa' };
  const now = Date.now();
  
  // Calcular días desde último ingreso (antes de actualizar lastLogin)
  const lastLoginTime = stats.lastLogin || now;
  const daysSinceLast = (now - lastLoginTime) / (1000 * 60 * 60 * 24);

  // Lógica de Estado (Activa/Inactiva)
  if (daysSinceLast > 3) {
    stats.status = 'Inactiva';
    stats.reactivationStart = now; // Marcar cuándo empezó a jugar de nuevo
  }

  // Si es inactiva, verificar si ya cumplió 1 día jugando para reactivar
  if (stats.status === 'Inactiva' && stats.reactivationStart) {
    const daysActive = (now - stats.reactivationStart) / (1000 * 60 * 60 * 24);
    if (daysActive >= 1) {
      stats.status = 'Activa';
      delete stats.reactivationStart;
    }
  }

  // Actualizar último ingreso a AHORA
  stats.lastLogin = now;
  localStorage.setItem('apaticgamesStats', JSON.stringify(stats));

  // Formatear textos para UI
  const h = Math.floor((stats.timePlayed || 0) / 60);
  const m = (stats.timePlayed || 0) % 60;
  
  let lastLoginText = "Hoy";
  if (daysSinceLast >= 1 && daysSinceLast < 2) lastLoginText = "Ayer";
  else if (daysSinceLast >= 2) lastLoginText = `Hace ${Math.floor(daysSinceLast)} días`;

  const statusText = (stats.status === 'Inactiva') ? 'Inactiva' : 'Activa';

  // Elementos de Avatar
  const avatarContainer = document.getElementById('avatarContainer');
  const avatarInput = document.getElementById('avatarInput');
  const avatarImage = document.getElementById('avatarImage');
  const defaultIcon = document.getElementById('defaultAvatarIcon');

  // Actualizar datos extra (Side Extra)
  if (sideExtra) {
    sideExtra.innerHTML = `
      <p><strong>Último ingreso:</strong> ${lastLoginText}</p>
      <p><strong>Horas jugadas:</strong> ${h}h ${m}m</p>
      <p><strong>Rango:</strong> ${rank}</p>
    `;
  }

  // Función para mostrar la biografía en un contenedor dedicado
  const updateBioUI = (bioText) => {
    let bioContainer = document.getElementById('userBioContainer');
    if (!bioContainer) {
      bioContainer = document.createElement('div');
      bioContainer.id = 'userBioContainer';
      bioContainer.className = 'soft-box';
      bioContainer.style.marginTop = '20px';
      bioContainer.style.textAlign = 'left';
      
      const profileArea = document.querySelector('.profile-area');
      if (profileArea) profileArea.appendChild(bioContainer);
    }

    if (bioText && bioText.trim() !== '') {
      bioContainer.innerHTML = `
        <h4 style="margin: 0 0 8px 0; font-size: 0.95rem; color: var(--primary-color, #0f3c78);"><i class="fa-solid fa-pen-fancy"></i> Biografía</h4>
        <p style="margin: 0; font-size: 0.9rem; color: var(--text-muted, #64748b); line-height: 1.4;">${bioText}</p>
      `;
      bioContainer.style.display = 'block';
    } else {
      bioContainer.style.display = 'none';
    }
  };

  if (user && profileName) {
    // Mostrar nombre real
    profileName.textContent = user.name;

    // Cargar foto guardada si existe
    if (user.avatar && avatarImage && defaultIcon) {
      avatarImage.src = user.avatar;
      avatarImage.style.display = 'block';
      defaultIcon.style.display = 'none';
    }

    // Cargar biografía inicial
    updateBioUI(user.bio);
  }

  // Actualizar Nivel y Estado (Sin "Novato")
  if (profileLevel) {
    profileLevel.textContent = `Nivel ${totalLevels} - Estado: ${statusText}`;
  }

  // Botón Cerrar Sesión
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      showConfirmModal("Cerrar Sesión", "¿Estás seguro de que quieres cerrar sesión? Tu progreso se guardará.", () => {
        // 1. Guardar progreso
        if (user && user.email) {
          localStorage.setItem('apaticgames_save_' + user.email, localStorage.getItem('apaticgamesProgreso') || '{}');
          localStorage.setItem('apaticgames_stats_' + user.email, localStorage.getItem('apaticgamesStats') || '{}');
        }
        // 2. Limpiar datos activos
        localStorage.removeItem('apaticgamesSession');
        localStorage.removeItem('apaticgamesProgreso');
        localStorage.removeItem('apaticgamesStats');
        window.location.href = 'ingresar.html';
      });
    });
  }

  // Botón Solicitar Eliminación de Cuenta (Reemplazo)
  const deleteAccountBtn = document.getElementById('deleteAccountBtn');
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
      showConfirmModal("Solicitar Eliminación de Cuenta", "¿Deseas solicitar la eliminación de tu cuenta? Se guardará un registro oficial en el sistema.", async () => {
        
        try {
          // Guardar solicitud en Firestore
          await addDoc(collection(db, "solicitudes_eliminacion"), {
            uid: user.uid,
            email: user.email,
            name: user.name,
            fecha: new Date().toISOString(),
            estado: "pendiente"
          });
        
          // Mostrar mensaje de confirmación y cerrar sesión
          const modalHtml = `
          <div id="deleteMsgModal" class="modal-backdrop" style="z-index: 99999; display: flex; align-items: center; justify-content: center; position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px);">
            <div class="modal" style="background: var(--card-bg, #fff); padding: 30px; border-radius: 20px; text-align: center; max-width: 360px; width: 90%; box-shadow: 0 20px 50px rgba(0,0,0,0.3); animation: popIn 0.3s ease;">
              <div style="font-size: 3.5rem; margin-bottom: 15px; color: #f59e0b;">
                <i class="fa-solid fa-clock"></i>
              </div>
              <h3 style="margin: 0 0 10px 0; font-size: 1.5rem; color: var(--text-color, #1e293b);">Solicitud Enviada</h3>
              <p style="margin: 0 0 20px 0; color: var(--text-muted, #64748b); line-height: 1.5;">
                Tu solicitud ha sido registrada en nuestra base de datos.<br><br>
                Tu cuenta será eliminada en los próximos <strong>30 días</strong>. Cerrando sesión...
              </p>
              <button id="finalLogoutBtn" class="btn-primary" style="width: 100%; border: none; cursor: pointer; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 1rem; background: var(--primary-color, #0f3c78); color: white;">
                Aceptar
              </button>
            </div>
          </div>
        `;

          document.body.insertAdjacentHTML('beforeend', modalHtml);

          const performLogout = () => {
             localStorage.removeItem('apaticgamesSession');
             localStorage.removeItem('apaticgamesProgreso');
             localStorage.removeItem('apaticgamesStats');
             window.location.href = 'ingresar.html';
          };

          document.getElementById('finalLogoutBtn').onclick = performLogout;
          
          // Auto-logout después de 4 segundos
          setTimeout(performLogout, 4000);

        } catch (error) {
          console.error("Error al guardar solicitud:", error);
          showModal("Error", "No se pudo procesar la solicitud. Intenta nuevamente.", "error");
        }
      });
    });
  }

  // Botón Editar (Mejorado con Modal Profesional)
  const editBtn = document.getElementById('editBtn');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      if (!user) return showModal("Acceso Restringido", "Debes iniciar sesión para editar tu perfil.", "error");
      
      // 1. Crear el HTML del Modal dinámicamente
      const modalHtml = `
        <div id="editModal" style="position:fixed; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:10000; backdrop-filter: blur(4px);">
          <div style="background:var(--card-bg); color:var(--text-color); padding:30px; border-radius:20px; width:90%; max-width:400px; box-shadow:0 20px 50px rgba(0,0,0,0.3); border: 1px solid var(--border-color);">
            <h3 style="margin-top:0; color:var(--primary-color); margin-bottom: 20px;">Editar Perfil</h3>
            
            <label style="display:block; font-weight:600; font-size:0.9rem; margin-bottom:5px;">Nombre</label>
            <input type="text" id="editName" value="${user.name}" style="width:100%; padding:12px; border:1px solid var(--input-border); background:var(--input-bg); color:var(--text-color); border-radius:10px; margin-bottom:15px;">
            
            <label style="display:block; font-weight:600; font-size:0.9rem; margin-bottom:5px;">Email</label>
            <input type="email" id="editEmail" value="${user.email}" style="width:100%; padding:12px; border:1px solid var(--input-border); background:var(--input-bg); color:var(--text-color); border-radius:10px; margin-bottom:15px;">
            
            <label style="display:block; font-weight:600; font-size:0.9rem; margin-bottom:5px;">Frase o Bio</label>
            <input type="text" id="editBio" value="${user.bio || ''}" placeholder="Escribe algo sobre ti..." style="width:100%; padding:12px; border:1px solid var(--input-border); background:var(--input-bg); color:var(--text-color); border-radius:10px; margin-bottom:20px;">

            <div style="display:flex; gap:10px; justify-content:flex-end;">
              <button id="cancelEdit" style="background:var(--hover-bg); color:var(--text-color); border:1px solid var(--border-color); padding:10px 20px; border-radius:10px; cursor:pointer; font-weight:600;">Cancelar</button>
              <button id="saveEdit" style="background:var(--primary-color); color:white; border:none; padding:10px 20px; border-radius:10px; cursor:pointer; font-weight:600;">Guardar</button>
            </div>
          </div>
        </div>
      `;

      // 2. Inyectar en el cuerpo
      const modalContainer = document.createElement('div');
      modalContainer.innerHTML = modalHtml;
      document.body.appendChild(modalContainer);

      // 3. Funcionalidad del Modal
      const closeModal = () => modalContainer.remove();
      document.getElementById('cancelEdit').onclick = closeModal;
      
      document.getElementById('saveEdit').onclick = () => {
        const newName = document.getElementById('editName').value.trim();
        const newEmail = document.getElementById('editEmail').value.trim();
        const newBio = document.getElementById('editBio').value.trim();

        if (newName && newEmail) {
          // Actualizar datos
          user.name = newName;
          user.email = newEmail;
          user.bio = newBio;

          // Guardar en LocalStorage (Sesión y Usuario permanente)
          localStorage.setItem('apaticgamesSession', JSON.stringify(user));
          
          // Actualizar en la lista de usuarios (Soporte Multi-usuario)
          const users = JSON.parse(localStorage.getItem('apaticgamesUsers')) || [];
          const userIndex = users.findIndex(u => u.email === user.email); // Buscar por email original (nota: si cambia email es más complejo, asumimos update simple)
          if (userIndex > -1) {
             users[userIndex] = { ...users[userIndex], name: newName, email: newEmail, bio: newBio };
          } else {
             // Si no existe en BD local, lo creamos
             users.push({
               uid: user.uid,
               name: newName,
               email: newEmail,
               avatar: user.avatar,
               bio: newBio
             });
          }
          localStorage.setItem('apaticgamesUsers', JSON.stringify(users));

          // Actualizar UI inmediatamente (sin recargar)
          if (profileName) profileName.textContent = newName;
          
          // Actualizar info lateral
          if (sideExtra) {
             sideExtra.innerHTML = `
                <p><strong>Último ingreso:</strong> ${lastLoginText}</p>
                <p><strong>Horas jugadas:</strong> ${h}h ${m}m</p>
                <p><strong>Rango:</strong> ${rank}</p>
             `;
          }

          // Actualizar biografía visualmente
          updateBioUI(newBio);

          if (window.showNotification) window.showNotification('<i class="fa-solid fa-check"></i> Perfil actualizado', 'success');
          closeModal();
        } else {
          showModal("Datos Incompletos", "El nombre y el email son obligatorios.", "error");
        }
      };
    });
  }

  // ==========================================
  // LÓGICA DE CAMBIO DE FOTO
  // ==========================================
  if (avatarContainer && avatarInput) {
    // Al hacer clic en el círculo, abrir selector de archivos
    avatarContainer.addEventListener('click', () => avatarInput.click());

    // Al seleccionar un archivo
    avatarInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          // Crear objeto imagen para redimensionar
          const img = new Image();
          img.onload = function() {
            // Crear canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Definir tamaño máximo (300px es suficiente para avatar)
            const MAX_SIZE = 300;
            let width = img.width;
            let height = img.height;

            // Calcular nuevas dimensiones manteniendo proporción
            if (width > height) {
              if (width > MAX_SIZE) {
                height *= MAX_SIZE / width;
                width = MAX_SIZE;
              }
            } else {
              if (height > MAX_SIZE) {
                width *= MAX_SIZE / height;
                height = MAX_SIZE;
              }
            }

            // Redimensionar
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Convertir a base64 comprimido (JPEG calidad 0.7)
            const base64 = canvas.toDataURL('image/jpeg', 0.7);

            // --- GUARDAR ---
            if (avatarImage && defaultIcon) {
              avatarImage.src = base64;
              avatarImage.style.display = 'block';
              defaultIcon.style.display = 'none';
            }

            if (user) {
              user.avatar = base64;
              try {
                localStorage.setItem('apaticgamesSession', JSON.stringify(user));
                
                const users = JSON.parse(localStorage.getItem('apaticgamesUsers')) || [];
                const userIndex = users.findIndex(u => u.email === user.email);
                if (userIndex > -1) {
                  users[userIndex].avatar = base64;
                } else {
                  users.push({
                    uid: user.uid,
                    name: user.name,
                    email: user.email,
                    avatar: base64,
                    bio: user.bio || ""
                  });
                }
                localStorage.setItem('apaticgamesUsers', JSON.stringify(users));
                
                if (window.showNotification) window.showNotification('<i class="fa-solid fa-check"></i> Foto actualizada correctamente', 'success');
              } catch (e) {
                showModal("Error", "No se pudo guardar la imagen.", "error");
              }
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // ==========================================
  // VINCULACIÓN DE PROGRESO Y ESTADÍSTICAS
  // ==========================================
  // (Cálculos movidos al inicio para uso en UI)
  const maxLevels = 15; // 5 niveles x 3 módulos

  // 1. Actualizar Barra de Progreso General
  const percent = Math.round((totalLevels / maxLevels) * 100);
  const progressBar = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-text');
  
  if (progressBar) progressBar.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `${percent}%`;

  // (El nivel en el perfil ya se actualizó arriba junto con el estado)

  // 2. Actualizar Estadísticas (Puntos y Juegos)
  const statsValues = document.querySelectorAll('.stat h3');
  if (statsValues.length >= 3) {
    statsValues[0].textContent = totalStars * 100; // 100 puntos por estrella
    statsValues[1].textContent = totalLevels;      // Niveles completados
  }

  // 2.5. Mostrar Resumen de Estrellas (Nuevo Apartado)
  const targetList = document.querySelector('.achievement-list');
  if (targetList) {
    // Verificar si la lista ya está dentro de un contenedor 'soft-box'
    const existingBox = targetList.closest('.soft-box');

    // 1. Recuadro de Estrellas
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'soft-box'; // Estilo de recuadro
    summaryDiv.innerHTML = `
      <h3 style="margin-top: 0; margin-bottom: 15px; color: var(--primary-color);"><i class="fa-solid fa-star"></i> Estrellas por Módulo</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 15px;">
        <div style="background: var(--card-bg); padding: 15px; border-radius: 12px; text-align: center; border: 1px solid var(--border-color); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          <div style="color: var(--primary-color); margin-bottom: 5px; font-weight: 600;"><i class="fa-solid fa-quote-right"></i> Citas</div>
          <div style="font-size: 1.2rem; font-weight: bold; color: #f59e0b;">${sCitas.stars} <i class="fa-solid fa-star"></i></div>
        </div>
        <div style="background: var(--card-bg); padding: 15px; border-radius: 12px; text-align: center; border: 1px solid var(--border-color); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          <div style="color: var(--primary-color); margin-bottom: 5px; font-weight: 600;"><i class="fa-solid fa-book-open"></i> Referencias</div>
          <div style="font-size: 1.2rem; font-weight: bold; color: #f59e0b;">${sRef.stars} <i class="fa-solid fa-star"></i></div>
        </div>
        <div style="background: var(--card-bg); padding: 15px; border-radius: 12px; text-align: center; border: 1px solid var(--border-color); box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
          <div style="color: var(--primary-color); margin-bottom: 5px; font-weight: 600;"><i class="fa-solid fa-file-pen"></i> Formato</div>
          <div style="font-size: 1.2rem; font-weight: bold; color: #f59e0b;">${sFormato.stars} <i class="fa-solid fa-star"></i></div>
        </div>
      </div>
    `;

    if (existingBox) {
      // Si ya existe una caja padre, insertamos el resumen ANTES de esa caja
      // Así quedan como hermanos separados: [Resumen] [Caja Logros]
      existingBox.parentNode.insertBefore(summaryDiv, existingBox);

      // Asegurar que la caja de logros tenga título si no lo tiene
      if (!existingBox.querySelector('h3')) {
        const title = document.createElement('h3');
        title.style.cssText = "margin-top: 0; margin-bottom: 15px; color: var(--primary-color);";
        title.innerHTML = '<i class="fa-solid fa-trophy"></i> Mis Logros';
        existingBox.insertBefore(title, existingBox.firstChild);
      }
    } else {
      // Si no hay caja padre, insertamos antes de la lista y envolvemos la lista
      targetList.parentNode.insertBefore(summaryDiv, targetList);

      const achievementsBox = document.createElement('div');
      achievementsBox.className = 'soft-box';
      achievementsBox.innerHTML = `<h3 style="margin-top: 0; margin-bottom: 15px; color: var(--primary-color);"><i class="fa-solid fa-trophy"></i> Mis Logros</h3>`;
      
      targetList.parentNode.insertBefore(achievementsBox, targetList);
      achievementsBox.appendChild(targetList);
    }
  }

  // 3. Desbloquear Logros
  const achievementsList = document.querySelector('.achievement-list');
  if (achievementsList) {
    achievementsList.innerHTML = ''; // Limpiar
    
    const unlocked = progreso.logros || [];
    const achievementCount = unlocked.length;

    if (achievementCount > 0) {
      // Estilo de grilla para los logros
      achievementsList.style.display = 'grid';
      achievementsList.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
      achievementsList.style.gap = '12px';

      unlocked.forEach(name => {
        // Asignar icono según el tipo de logro para dar variedad visual
        let icon = 'fa-trophy'; // Icono por defecto
        let colorStyle = '#f59e0b'; // Gold
        
        // Logros de perfección o maestría (Icono de Corona)
        if (name.includes('Perfección') || name.includes('Perfecta') || name.includes('Supremo') || name.includes('Leyenda') || name.includes('Maestro') || name.includes('Oro') || name.includes('Impecable') || name.includes('Sin Fallos') || name.includes('Vencedor')) {
          icon = 'fa-crown'; 
          colorStyle = '#d97706'; // Dark Gold
        } 
        // Logros básicos (Icono de Medalla)
        else if (name.includes('Fundamentos') || name.includes('Básico') || name.includes('Aprendiz')) {
          icon = 'fa-medal';
          colorStyle = '#3b82f6'; // Blue
        } 
        // Logros de retos (Icono de Fuego)
        else if (name.includes('Retador') || name.includes('Invicto') || name.includes('Domador')) {
          icon = 'fa-fire';
          colorStyle = '#ef4444'; // Red
        }
        // Logros de Velocidad (Icono Rayo/Corredor)
        else if (name.includes('Velocista') || name.includes('Corredor') || name.includes('Rápido')) {
          icon = 'fa-person-running';
          colorStyle = '#06b6d4'; // Cyan
        }
        // Logros de Investigación/Errores (Icono Lupa)
        else if (name.includes('Detective') || name.includes('Sherlock') || name.includes('Ojo') || name.includes('Auditor')) {
          icon = 'fa-magnifying-glass';
          colorStyle = '#8b5cf6'; // Violet
        }
        // Logros Académicos (Icono Graduación)
        else if (name.includes('Graduado') || name.includes('Erudito') || name.includes('Sabio') || name.includes('Arquitecto')) {
          icon = 'fa-user-graduate';
          colorStyle = '#10b981'; // Emerald
        }

        achievementsList.innerHTML += `
          <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--hover-bg); border-radius: 12px; border: 1px solid var(--border-color);">
            <div style="font-size: 1.2rem; color: ${colorStyle}; background: ${colorStyle}15; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
              <i class="fa-solid ${icon}"></i>
            </div>
            <span style="font-weight: 600; font-size: 0.9rem; color: var(--text-color);">${name}</span>
          </div>`;
      });
    } else {
      achievementsList.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 20px; color: #64748b;">Sin logros aún. ¡Juega para desbloquearlos!</div>';
    }
    
    // Actualizar contador de logros
    if (statsValues[2]) statsValues[2].textContent = achievementCount;
  }

  // 4. Botón de Reinicio Total (Para pruebas)
  const resetBtn = document.getElementById('resetProgressBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      showConfirmModal("Reiniciar Progreso", "⚠️ ¿Estás seguro? Se borrarán todos tus niveles, estrellas y logros. Esta acción no se puede deshacer.", () => {
        // 1. Definir estado inicial
        const initialProgress = {
          citas: { nivelActual: 1, estrellas: {} },
          referencias: { nivelActual: 1, estrellas: {} },
          formato: { nivelActual: 1, estrellas: {} },
          logros: []
        };
        const initialStats = { timePlayed: 0, lastLogin: Date.now(), status: 'Activa' };

        // 2. Guardar en LocalStorage y persistencia
        localStorage.setItem('apaticgamesProgreso', JSON.stringify(initialProgress));
        localStorage.setItem('apaticgamesStats', JSON.stringify(initialStats));

        if (user && user.email) {
          localStorage.setItem('apaticgames_save_' + user.email, JSON.stringify(initialProgress));
          localStorage.setItem('apaticgames_stats_' + user.email, JSON.stringify(initialStats));
        }

        // 3. Recargar página
        window.location.reload();
      });
    });
  }

  // 5. Verificar si hay logro de bienvenida pendiente
  if (localStorage.getItem('show_welcome_achievement') === 'true') {
    localStorage.removeItem('show_welcome_achievement');
    setTimeout(() => {
      if (window.playSound) window.playSound('achievement');
      
      const notif = document.createElement("div");
      notif.className = "achievement-notification";
      notif.innerHTML = `<div class="icon"><i class="fa-solid fa-trophy"></i></div><div class="text"><strong>¡Logro Desbloqueado!</strong><span>Bienvenido a Bordo</span></div>`;
      document.body.appendChild(notif);

      setTimeout(() => {
        notif.classList.add("hide");
        setTimeout(() => notif.remove(), 500);
      }, 4000);
    }, 1000); // Pequeño retraso para que la página cargue bien
  }
});

// ==========================================
// FUNCIONES DE MODAL (GLOBALES PARA CUENTA)
// ==========================================
function showModal(title, message, type = 'info') {
  const existing = document.getElementById('customModal');
  if (existing) existing.remove();

  const isSuccess = type === 'success';
  const isError = type === 'error';
  let icon = 'fa-circle-info';
  let color = '#3b82f6'; // Blue

  if (isSuccess) { icon = 'fa-circle-check'; color = '#22c55e'; }
  if (isError) { icon = 'fa-circle-xmark'; color = '#ef4444'; }

  const modalHtml = `
    <div id="customModal" class="modal-backdrop" style="z-index: 99999; display: flex; align-items: center; justify-content: center; position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);">
      <div class="modal" style="background: var(--card-bg, #fff); padding: 30px; border-radius: 20px; text-align: center; max-width: 360px; width: 90%; box-shadow: 0 20px 50px rgba(0,0,0,0.3); animation: popIn 0.3s ease;">
        <div style="font-size: 3.5rem; margin-bottom: 15px; color: ${color};">
          <i class="fa-solid ${icon}"></i>
        </div>
        <h3 style="margin: 0 0 10px 0; font-size: 1.5rem; color: var(--text-color, #1e293b);">${title}</h3>
        <p style="margin: 0 0 20px 0; color: var(--text-muted, #64748b); line-height: 1.5;">${message}</p>
        <button id="modalOkBtn" style="width: 100%; border: none; cursor: pointer; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 1rem; background: ${color}; color: white;">Entendido</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  document.getElementById('modalOkBtn').onclick = () => document.getElementById('customModal').remove();
}

function showConfirmModal(title, message, onConfirm) {
  const existing = document.getElementById('customModal');
  if (existing) existing.remove();

  const modalHtml = `
    <div id="customModal" class="modal-backdrop" style="z-index: 99999; display: flex; align-items: center; justify-content: center; position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);">
      <div class="modal" style="background: var(--card-bg, #fff); padding: 30px; border-radius: 20px; text-align: center; max-width: 360px; width: 90%; box-shadow: 0 20px 50px rgba(0,0,0,0.3); animation: popIn 0.3s ease;">
        <div style="font-size: 3rem; margin-bottom: 15px; color: #f59e0b;"><i class="fa-solid fa-circle-question"></i></div>
        <h3 style="margin: 0 0 10px 0; font-size: 1.5rem; color: var(--text-color, #1e293b);">${title}</h3>
        <p style="margin: 0 0 20px 0; color: var(--text-muted, #64748b); line-height: 1.5;">${message}</p>
        <div style="display: flex; gap: 10px; justify-content: center;"><button id="cancelBtn" style="flex: 1; border: 1px solid var(--border-color, #ccc); cursor: pointer; padding: 12px; border-radius: 10px; font-weight: 600; background: transparent; color: var(--text-color, #333);">Cancelar</button><button id="confirmBtn" style="flex: 1; border: none; cursor: pointer; padding: 12px; border-radius: 10px; font-weight: 600; background: var(--primary-color, #0f3c78); color: white;">Confirmar</button></div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
  document.getElementById('cancelBtn').onclick = () => document.getElementById('customModal').remove();
  document.getElementById('confirmBtn').onclick = () => { document.getElementById('customModal').remove(); onConfirm(); };
}