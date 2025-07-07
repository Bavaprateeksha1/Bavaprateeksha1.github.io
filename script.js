function toggleModal(id) {
  const modal = document.getElementById(id);
  if (modal.style.display === "flex") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
}
