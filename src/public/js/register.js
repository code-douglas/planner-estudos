document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.auth-container form');
  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const passwordInput = form.querySelector('input[name="password"]');
  const confirmPasswordInput = form.querySelector('input[name="confirmPassword"]');
  const errorBox = document.getElementById('js-error');

  form.addEventListener('submit', (e) => {
    let errors = [];

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (name.length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres.');
    }

    if (!email.includes('@') || !email.includes('.')) {
      errors.push('Email inválido.');
    }

    if (password.length < 6) {
      errors.push('Senha deve ter pelo menos 6 caracteres.');
    }

    if (password !== confirmPassword) {
      errors.push('As senhas não coincidem.');
    }

    if (errors.length > 0) {
      e.preventDefault();
      errorBox.innerHTML = errors.join('<br>');
      errorBox.style.display = 'block';
    } else {
      errorBox.style.display = 'none';
    }
  });
});
