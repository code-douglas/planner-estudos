document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.auth-container form');
  const emailInput = form.querySelector('input[name="email"]');
  const passwordInput = form.querySelector('input[name="password"]');
  const errorBox = document.getElementById('js-error');

  form.addEventListener('submit', (e) => {
    let errors = [];

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email.includes('@') || !email.includes('.')) {
      errors.push('Email inválido.');
    }

    if (password.length == 0) {
      errors.push('O campo senha não deve estar vazio');
    }

    if(!email) {
      errors.push('O campo email não deve estar vazio');
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
