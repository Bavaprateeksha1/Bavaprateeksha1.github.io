// ========================
// script.js
// ========================

// Open only the selected modal
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

// Sparkling Stars (Increased Intensity)
const canvas = document.getElementById('stars'),
      ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let k = 0; k < 250; k++) {  // Increased star count
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

// Optional: Image click popup modal
document.querySelectorAll('.card img').forEach(img => {
  img.addEventListener('click', () => {
    const popup = document.createElement('div');
    popup.className = 'modal';
    popup.style.display = 'flex';
    popup.innerHTML = `
      <div class="modal-box" style="max-width:600px;">
        <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
        <img src="${img.src}" style="width:100%; border-radius:10px;" />
      </div>
    `;
    document.body.appendChild(popup);
  });
});
