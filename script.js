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

// Starry canvas with multiple shooting stars
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [], shootingStars = [];

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

function createShootingStar() {
  return {
    x: Math.random() * canvas.width,
    y: 0,
    length: Math.random() * 200 + 100,
    speed: 6,
    angle: Math.PI / 4,
    opacity: 1
  };
}

setInterval(() => {
  shootingStars.push(createShootingStar());
  if (shootingStars.length > 4) shootingStars.shift(); // keep 3-4
}, 3000);

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Normal stars
  stars.forEach(star => {
    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = 'white';
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

  // Shooting stars
  shootingStars.forEach(star => {
    ctx.strokeStyle = `rgba(255,255,255,${star.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(
      star.x - Math.cos(star.angle) * star.length,
      star.y - Math.sin(star.angle) * star.length
    );
    ctx.stroke();

    star.x += star.speed * Math.cos(star.angle);
    star.y += star.speed * Math.sin(star.angle);
    star.opacity -= 0.01;
  });

  requestAnimationFrame(drawStars);
}
drawStars();
