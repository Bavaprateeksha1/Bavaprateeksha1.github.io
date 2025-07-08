// 🔄 Modal control
function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  document.getElementById('hero-text').style.display = 'none';
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  const anyOpen = [...document.querySelectorAll('.modal')].some(m => m.style.display === 'flex');
  if (!anyOpen) document.getElementById('hero-text').style.display = 'block';
}

// ✨ Sparkles
const sparkleContainer = document.getElementById("sparkles");
for (let i = 0; i < 30; i++) {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  sparkle.style.top = Math.random() * 100 + "vh";
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.width = sparkle.style.height = Math.random() * 3 + 1 + "px";
  sparkle.style.animationDuration = (Math.random() * 2 + 1) + "s";
  sparkleContainer.appendChild(sparkle);
}

// 🌠 Shooting Stars
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let shootingStars = [];

function createShootingStar() {
  const angleOptions = [45, 135, 225, 315]; // Diagonal directions
  const angle = angleOptions[Math.floor(Math.random() * angleOptions.length)] * (Math.PI / 180);
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 100 + 80,
    speed: 4 + Math.random() * 2,
    angle: angle,
    opacity: 1
  };
}

setInterval(() => {
  shootingStars.push(createShootingStar());
  if (shootingStars.length > 4) shootingStars.shift();
}, 2500);

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shootingStars.forEach(star => {
    ctx.strokeStyle = `rgba(255,255,255,${star.opacity})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(
      star.x - Math.cos(star.angle) * star.length,
      star.y - Math.sin(star.angle) * star.length
    );
    ctx.stroke();

    star.x += star.speed * Math.cos(star.angle);
    star.y += star.speed * Math.sin(star.angle);
    star.opacity -= 0.015;
  });
  requestAnimationFrame(drawStars);
}
drawStars();
