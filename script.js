
function openOnly(id) {
  const modals = document.querySelectorAll(".modal");
  modals.forEach(modal => modal.style.display = "none");
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
