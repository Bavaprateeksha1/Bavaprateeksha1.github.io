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

// Removed the old project card click listener as the new design might not require a separate overlay for each click.
// If you want a detailed modal for each project, you'll need to re-implement that logic carefully
// to fit the new card structure and ensure content is passed correctly.

// Typing effect
const text = "Hi, I’m Bava Prateeksha";
let i = 0;
const el = document.getElementById('typed');
function type() {
  if (i <= text.length) {
    el.innerText = text.slice(0, i) + (i % 2 ? '|' : '');
    i++;
    setTimeout(type, 120);
  } else {
    el.innerText = text; // Ensure the cursor disappears after typing
  }
}
type();

// Sparkling Stars
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    alpha: Math.random(),
    delta: Math.random() * 0.02
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.alpha += s.delta;
    if (s.alpha <= 0 || s.alpha >= 1) s.delta = -s.delta;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// Duplicate project cards for a seamless loop effect in the carousel
// This should be done after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('#projects .carousel-track');
    if (carouselTrack) {
        const cards = Array.from(carouselTrack.children);
        // Duplicate cards to create a seamless loop.
        // You might need to adjust the number of clones based on how many cards are visible at once.
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            carouselTrack.appendChild(clone);
        });
    }
});
