// Function to show only the selected modal
function openOnly(id) {
  // Close all other modals
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.style.display = 'none';
  });

  // Open the selected modal
  const modalToOpen = document.getElementById(id);
  if (modalToOpen) {
    modalToOpen.style.display = 'flex';
  }
}

// Function to close a specific modal
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'none';
  }
}

// Click outside modal-box to close modal (optional UX improvement)
window.addEventListener('click', function (event) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Add click-to-open behavior for each project card (modal within modal)
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const parentModal = card.closest('.modal');
    // Prevent nested modals (don’t open if already inside another modal)
    if (parentModal && parentModal.id !== 'projects') return;

    // Clone the card to show in a new standalone modal
    const cardClone = card.cloneNode(true);

    // Create overlay modal
    const newModal = document.createElement('div');
    newModal.className = 'modal';
    newModal.style.display = 'flex';

    // Create modal content container
    const contentBox = document.createElement('div');
    contentBox.className = 'modal-box';
    contentBox.innerHTML = cardClone.innerHTML;

    // Add close button
    const close = document.createElement('span');
    close.className = 'close';
    close.innerHTML = '&times;';
    close.onclick = () => document.body.removeChild(newModal);

    contentBox.prepend(close);
    newModal.appendChild(contentBox);
    document.body.appendChild(newModal);
  });
});
