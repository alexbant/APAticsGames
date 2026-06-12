document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.auth-form.login');
  const registerForm = document.querySelector('.auth-form.register');
  const showRegisterBtn = document.getElementById('showRegister');
  const showLoginBtn = document.getElementById('showLogin');

  // Animación para cambiar entre Login y Registro
  if (showRegisterBtn && showLoginBtn) {
    showRegisterBtn.addEventListener('click', () => {
      loginForm.classList.remove('active');
      registerForm.classList.add('active');
    });

    showLoginBtn.addEventListener('click', () => {
      registerForm.classList.remove('active');
      loginForm.classList.add('active');
    });
  }
});