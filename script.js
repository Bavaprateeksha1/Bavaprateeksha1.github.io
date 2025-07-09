// Typing animation
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

// Show only selected modal
function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';
}

// Close selected modal
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

// Click outside to close modal
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// Clicking a project card opens it in full image modal
document.querySelectorAll('#projects .card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    if (!img) return;

    const overlay = document.createElement('div');
    overlay.className = 'modal';
    overlay.style.display = 'flex';

    const box = document.createElement('div');
    box.className = 'modal-box';
    box.style.background = 'linear-gradient(135deg, #433D8B, #2C318C)';
    box.style.maxHeight = 'none';
    box.style.overflow = 'visible';

    const fullImage = document.createElement('img');
    fullImage.src = img.src;
    fullImage.style.width = '100%';
    fullImage.style.borderRadius = '12px';

    const closeEl = document.createElement('span');
    closeEl.className = 'close';
    closeEl.innerHTML = '&times;';
    closeEl.onclick = () => document.body.removeChild(overlay);

    box.appendChild(closeEl);
    box.appendChild(fullImage);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
});

// Sparkling Stars
const canvas = document.getElementById('stars'),
      ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let s = 0; s < 200; s++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.5 + 1.5,
    d: Math.random() * 1 + 0.5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffffaa';
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();
