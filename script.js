function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
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

// Sparkling stars
const canvas = document.getElementById('stars'), ctx = canvas.getContext('2d');
canvas.width = innerWidth; canvas.height = innerHeight;
let stars = [];
for (let s = 0; s < 200; s++) {
  stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r:Math.random()*3+2, d:Math.random()*1+0.2 });
}
function drawStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#ffffffcc';
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
    ctx.fill();
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random()*canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Project image popup
document.querySelectorAll('#projects .card img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'modal';
    overlay.style.display = 'flex';
    const box = document.createElement('div');
    box.className = 'modal-box';
    const full = document.createElement('img');
    full.src = img.src;
    full.style.maxWidth = '80vw';
    full.style.maxHeight = '80vh';
    full.style.borderRadius = '12px';
    const close = document.createElement('span');
    close.className = 'close';
    close.innerText = '×';
    close.onclick = () => overlay.remove();
    box.append(close, full);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
});
