// Open only one modal
function openOnly(id) {
  // Close all modals
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => modal.style.display = 'none');

  // Hide hero section
  document.getElementById('hero').style.display = 'none';

  // Show selected modal
  const target = document.getElementById(id);
  if (target) {
    target.style.display = 'flex';
  }
}

// Close modal and show hero if all are closed
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';

  // Check if all modals are closed
  const stillOpen = [...document.querySelectorAll('.modal')].some(
    modal => modal.style.display === 'flex'
  );

  if (!stillOpen) {
    document.getElementById('hero').style.display = 'flex';
  }
}

// Sparkling Stars Effect
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    alpha: Math.random(),
    delta: Math.random() * 0.02
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.alpha += star.delta;
    if (star.alpha <= 0 || star.alpha >= 1) {
      star.delta *= -1;
    }
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Typed effect for "Hi, I’m Bava Prateeksha"
document.addEventListener("DOMContentLoaded", function () {
  const typedText = "Hi, I’m Bava Prateeksha";
  const typedTarget = document.getElementById("typed");

  if (typedTarget) {
    let index = 0;
    function typeNextChar() {
      if (index < typedText.length) {
        typedTarget.innerHTML += typedText.charAt(index);
        index++;
        setTimeout(typeNextChar, 80);
      }
    }
    typeNextChar();
  }
});
