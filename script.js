function openOnly(id) {
  // Hide all modals
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.style.display = 'none';
  });

  // Hide hero text
  const hero = document.getElementById('hero-text');
  if (hero) hero.style.display = 'none';

  // Open selected modal
  document.getElementById(id).style.display = 'block';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  const hero = document.getElementById('hero-text');
  if (hero) hero.style.display = 'block';
}
