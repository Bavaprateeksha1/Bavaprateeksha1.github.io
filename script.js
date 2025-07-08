function openOnly(id) {
  document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Typing Effect
const typedText = "Hi, I’m Bava Prateeksha";
let i = 0;

function startTyping() {
  const el = document.getElementById("typed");
  el.innerText = "";
  i = 0;
  typeLetter();
}

function typeLetter() {
  const el = document.getElementById("typed");
  if (i <= typedText.length) {
    el.innerText = typedText.slice(0, i) + (i % 2 === 0 ? "|" : "");
    i++;
    setTimeout(typeLetter, 130);
  }
}

startTyping();

// Sparkling Stars
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 120; i++) {
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
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
    star.x += star.dx;
    star.y += star.dy;
    if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();
