// Function to open only the selected modal and close all others
function openOnly(id) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    modal.style.display = "none"; // Hide all modals first
  });

  const target = document.getElementById(id);
  if (target) {
    target.style.display = "flex"; // Show selected modal
    target.classList.add("fade-in");
    setTimeout(() => {
      target.classList.remove("fade-in");
    }, 500);
  }
}

// Function to close the selected modal
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = "none";
  }
}

// Optional: Close modal when clicking outside the modal box
window.addEventListener('click', function (e) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
