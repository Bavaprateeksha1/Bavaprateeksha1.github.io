// ========================
// script.js
// ========================

// Open one modal at a time
function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  document.getElementById(id).style.display = 'flex';
}

// Close modal
function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Typing Effect
const typedText = "Hi, I’m Bava Prateeksha";
let ti = 0;

function startTyping() {
  const el = document.getElementById('typed');
  if (!el) return;
  el.innerText = '';
  ti = 0;
  type();
}

function type() {
  const el = document.getElementById('typed');
  if (ti <= typedText.length) {
    el.innerText = typedText.slice(0, ti) + (ti % 2 === 0 ? '|' : '');
    ti++;
    setTimeout(type, 130);
  }
}

startTyping();

// ========================
// Sparkling Stars Background
// ========================

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

// Increased from 120 → 250 for more intensity
for (let i = 0; i < 250; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
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
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fill();

    // Move
    star.x += star.dx;
    star.y += star.dy;

    // Reset when out of bounds
    if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    }
  });

  requestAnimationFrame(drawStars);
}

drawStars();

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
