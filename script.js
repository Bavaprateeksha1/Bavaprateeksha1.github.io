// ========================
// script.js
// ========================

// Modal control
function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

// Typing effect for hero heading
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

// Sparkling stars background
const canvas = document.getElementById('stars'),
      ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let k = 0; k < 250; k++) {
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
  stars.forEach(s => {
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > canvas.width || s.y < 0 || s.y > canvas.height) {
      s.x = Math.random() * canvas.width;
      s.y = Math.random() * canvas.height;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Optional: Expand image on click (if you want popup)
document.querySelectorAll('.card img').forEach(img => {
  img.addEventListener('click', () => {
    const src = img.getAttribute('src');
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = 0;
    popup.style.left = 0;
    popup.style.width = '100vw';
    popup.style.height = '100vh';
    popup.style.background = 'rgba(0,0,0,0.8)';
    popup.style.zIndex = 999;
    popup.style.display = 'flex';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';

    const bigImage = document.createElement('img');
    bigImage.src = src;
    bigImage.style.maxWidth = '90%';
    bigImage.style.maxHeight = '90%';
    bigImage.style.borderRadius = '12px';
    bigImage.style.boxShadow = '0 0 20px rgba(255,255,255,0.3)';

    popup.appendChild(bigImage);
    document.body.appendChild(popup);

    popup.addEventListener('click', () => {
      popup.remove();
    });
  });
});
