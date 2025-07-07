function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  document.getElementById(id).style.display = "block";
}
