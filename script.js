function openOnly(id) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => modal.style.display = 'none');
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

// Canvas Stars
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2,
    alpha: Math.random(),
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
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

// Sparkles
const sparkleContainer = document.querySelector('.sparkle-container');
for (let i = 0; i < 40; i++) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.top = `${Math.random() * 100}%`;
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkleContainer.appendChild(sparkle);
}
