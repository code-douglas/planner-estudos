document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('create-form');
  const titleInput = form.querySelector('input[name="title"]');
  const descriptionInput = form.querySelector('textarea[name="description"]');
  const dateInput = form.querySelector('input[name="date"]');
  const errorBox = document.getElementById('js-error');

  form.addEventListener('submit', (e) => {
    let errors = [];

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const date = dateInput.value;

    if (!title) {
      errors.push('O título é obrigatório.');
    }

    if (!description) {
      errors.push('A descrição é obrigatória.');
    }

    if (!date) {
      errors.push('A data é obrigatória.');
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
