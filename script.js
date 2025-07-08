// JS to control modals and stars
function openOnly(id) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => modal.style.display = 'none');
  document.getElementById('hero-text').style.display = 'none';
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  const openModals = [...document.querySelectorAll('.modal')].filter(
    modal => modal.style.display === 'flex'
  );
  if (openModals.length === 0) {
    document.getElementById('hero-text').style.display = 'block';
  }
}

// Sparkling Stars
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 2,
    alpha: Math.random(),
    delta: Math.random() * 0.02 + 0.01
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.alpha += s.delta;
    if (s.alpha <= 0 || s.alpha >= 1) s.delta *= -1;
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
