// Modal open/close
function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}
window.addEventListener('click', event => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

// Typing effect
const text = "Hi, I’m Prateeksha";
let i = 0;
const el = document.getElementById('typed');
function type() {
  if (i <= text.length) {
    el.innerText = text.slice(0, i) + (i % 2 ? '|' : '');
    i++;
    setTimeout(type, 120);
  }
}
type();

// Clone project card into full modal
document.querySelectorAll('#projects .card').forEach(card => {
  card.addEventListener('click', () => {
    const clone = card.cloneNode(true);
    const overlay = document.createElement('div');
    overlay.className = 'modal';
    overlay.style.display = 'flex';
    const box = document.createElement('div');
    box.className = 'modal-box bg-purple';
    box.innerHTML = clone.innerHTML;
    const closeEl = document.createElement('span');
    closeEl.className = 'close';
    closeEl.innerHTML = '&times;';
    closeEl.onclick = () => document.body.removeChild(overlay);
    box.prepend(closeEl);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
});

// Stars canvas
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const stars = [];

for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    d: Math.random() * 1 + 0.5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffffaa';
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i];
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(drawStars);
}
drawStars();
