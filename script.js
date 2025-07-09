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

// Close modal on background click
window.addEventListener('click', event => {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
  }
});

// Typing animation on hero text
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

// Clone project card and show as modal with full image
document.querySelectorAll('#projects .card img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'modal';
    overlay.style.display = 'flex';

    const box = document.createElement('div');
    box.className = 'modal-box bg-purple';
    box.style.maxWidth = '80vw';
    box.style.maxHeight = '80vh';
    box.style.overflow = 'hidden';
    box.style.display = 'flex';
    box.style.justifyContent = 'center';
    box.style.alignItems = 'center';

    const fullImg = document.createElement('img');
    fullImg.src = img.src;
    fullImg.style.maxWidth = '100%';
    fullImg.style.maxHeight = '100%';
    fullImg.style.borderRadius = '12px';

    const closeEl = document.createElement('span');
    closeEl.className = 'close';
    closeEl.innerHTML = '&times;';
    closeEl.onclick = () => document.body.removeChild(overlay);

    box.appendChild(closeEl);
    box.appendChild(fullImg);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
});

// Sparkling Stars Background
const canvas = document.getElementById('stars'),
      ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const stars = [];
for (let s = 0; s < 150; s++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1.5,
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
