function openOnly(id) {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => modal.style.display = 'none');
  document.getElementById('hero-text').style.display = 'none';
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  const openModals = [...document.querySelectorAll('.modal')].filter(modal => modal.style.display === 'flex');
  if (openModals.length === 0) {
    document.getElementById('hero-text').style.display = 'block';
  }
}

// Star canvas
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2,
    alpha: Math.random(),
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  stars.forEach(star => {
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
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

// Sparkles
const sparkleContainer = document.querySelector('.sparkle-container');
for (let i = 0; i < 30; i++) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.top = `${Math.random() * 100}%`;
  sparkle.style.left = `${Math.random() * 100}%`;
  sparkleContainer.appendChild(sparkle);
}

// --- Shooting Stars ---
const shootingContainer = document.querySelector('.shooting-stars');
const numShootingStars = 4; // You can change this to 2, 3, 4, or more

// Function to create a single shooting star and set its properties
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star'; // Assign the CSS class
    shootingContainer.appendChild(star); // Add to the container

    // Random initial position (can be off-screen to create a natural entry)
    const startX = Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.25; // From -25% to 125% of viewport width
    const startY = Math.random() * window.innerHeight * 1.5 - window.innerHeight * 0.25; // From -25% to 125% of viewport height

    // Random direction (angle in degrees)
    const angle = Math.random() * 360; // A full 360-degree range for varied directions

    // Random travel distance (how far it moves across the screen)
    const travelDistance = Math.random() * 800 + 400; // Travels between 400px and 1200px

    // Calculate end coordinates based on the angle and travel distance
    const endX = startX + travelDistance * Math.cos(angle * Math.PI / 180);
    const endY = startY + travelDistance * Math.sin(angle * Math.PI / 180);

    // Random animation duration (how fast the star travels)
    const duration = Math.random() * 5 + 3; // Animation lasts between 3 and 8 seconds

    // Random delay before the animation starts for each star
    const delay = Math.random() * 5; // Delays between 0 and 5 seconds

    // Random size (thickness) and length (tail length) of the star
    const size = Math.random() * 3 + 1; // Thickness between 1px and 4px
    const length = Math.random() * 200 + 80; // Length between 80px and 280px

    // Set CSS custom properties (variables) for this specific star.
    // These variables are then used in the CSS @keyframes `shoot`.
    star.style.setProperty('--start-x', `${startX}px`);
    star.style.setProperty('--start-y', `${startY}px`);
    star.style.setProperty('--end-x', `${endX}px`);
    star.style.setProperty('--end-y', `${endY}px`);
    star.style.setProperty('--rotation', `${angle}deg`); // Rotates the star's visual representation
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--delay', `${delay}s`);
    star.style.setProperty('--size', `${size}px`);
    star.style.setProperty('--length', `${length}px`);

    // Apply the animation using the CSS custom properties
    star.style.animation = `shoot var(--duration) var(--delay) linear infinite`;

    // Listen for the 'animationiteration' event.
    // This fires each time the 'shoot' animation completes a cycle.
    star.addEventListener('animationiteration', () => {
        // When an animation cycle finishes, remove the old star element...
        star.remove();
        // ...and create a brand new one. This ensures continuous, varied stars.
        createShootingStar();
    });
}

// Create the initial set of shooting stars when the page loads
for (let i = 0; i < numShootingStars; i++) {
    // Add a small sequential delay to the initial stars so they don't all start at once
    setTimeout(createShootingStar, i * 1500); // Each star starts 1.5 seconds after the previous one
}
