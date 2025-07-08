function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  document.getElementById(id).style.display = 'flex';
}

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

// Sparkling Stars
const canvas = document.getElementById('stars'),
      ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let k = 0; k < 120; k++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1.5,
    alpha: Math.random(),
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  stars.forEach(s => {
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
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
