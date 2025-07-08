// Open/Close Modals
function openOnly(id) {
  document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
  document.getElementById('hero-text').style.display = 'none';
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  const openModals = [...document.querySelectorAll('.modal')].filter(modal => modal.style.display === 'flex');
  if (openModals.length === 0) {
    document.getElementById('hero-text').style.display = 'block';
  }
}

// Sparkling Stars (canvas)
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 80; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2.2 + 1,
    alpha: Math.random(),
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  stars.forEach(star => {
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
    ctx.fill();
    star.x += star.dx;
    star.y += star.dy;

    if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// ONE shooting star at a time
const shootingContainer = document.querySelector('.shooting-stars');

function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');
  star.style.top = `${Math.random() * window.innerHeight * 0.4}px`;
  star.style.left = `${Math.random() * window.innerWidth * 0.4}px`;
  shootingContainer.appendChild(star);
  setTimeout(() => star.remove(), 4000);
}

function loopOneShootingStar() {
  createShootingStar();
  setTimeout(loopOneShootingStar, 6000 + Math.random() * 3000);
}
loopOneShootingStar();
