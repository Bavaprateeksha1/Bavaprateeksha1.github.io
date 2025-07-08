function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  document.getElementById('hero').style.display = 'none';
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  if (![...document.querySelectorAll('.modal')].some(m => m.style.display === 'flex')) {
    document.getElementById('hero').style.display = 'flex';
  }
}

// Sparkling stars - 200 with larger size and faster pulses/movement
const canvas = document.getElementById('stars'), ctx = canvas.getContext('2d');
function resizeCanvas() {
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
let stars = [];
for (let i = 0; i < 200; i++) { // Increased to 200 stars
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1.5, // Larger size
    alpha: Math.random(),
    delta: (Math.random() * 0.04 + 0.02) * (Math.random() < 0.5 ? 1 : -1), // Faster pulse
    dx: (Math.random() - 0.5) * 0.5, // Faster horizontal movement
    dy: (Math.random() - 0.5) * 0.5 // Faster vertical movement
  });
}
function drawStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(s => {
    // Update alpha for sparkling effect
    s.alpha += s.delta;
    if (s.alpha <= 0.1 || s.alpha >= 1) s.delta *= -1; // Ensure it fades but doesn't disappear completely

    // Update position for movement
    s.x += s.dx;
    s.y += s.dy;

    // Wrap stars around if they go off-screen
    if (s.x < 0 || s.x > canvas.width || s.y < 0 || s.y > canvas.height) {
        s.x = Math.random() * canvas.width;
        s.y = Math.random() * canvas.height;
        s.alpha = Math.random(); // Reset alpha when repositioned
    }

    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Typing effect with emoji
document.addEventListener('DOMContentLoaded', () => {
  const text = "Hi, I'm Bava Prateeksha"; // Updated hero text
  let i = 0;
  const el = document.getElementById('typed');
  el.innerText = '';
  function type() {
    if (i < text.length) {
      el.innerText += text[i++];
      setTimeout(type, 100);
    }
  }
  type();
});

// Image popup
document.addEventListener('click', e => {
  const img = e.target.closest('.proj-card img');
  if (img) {
    const overlay = document.createElement('div');
    overlay.style = `
      position:fixed;
      inset:0;
      background:rgba(0,0,0,0.8);
      display:flex;
      justify-content:center;
      align-items:center;
      cursor:pointer;
      z-index:30;
    `;
    const popup = document.createElement('img');
    popup.src = img.src;
    popup.style = 'max-width:90%; max-height:90%; border-radius:8px;';
    overlay.appendChild(popup);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  }
});
