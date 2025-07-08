// --- Modal Functions ---
function openOnly(id) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none'); // Hide all modals

    // Ensure hero-text is hidden when any modal opens
    document.getElementById('hero-text').style.display = 'none';

    // Show the target modal
    const targetModal = document.getElementById(id);
    if (targetModal) {
        targetModal.style.display = 'flex'; // Use flex for centering if your CSS supports it
    }
}

function closeModal(id) {
    const targetModal = document.getElementById(id);
    if (targetModal) {
        targetModal.style.display = 'none'; // Hide the specific modal
    }

    // Check if any other modals are still open
    const openModals = [...document.querySelectorAll('.modal')].filter(modal => modal.style.display === 'flex');

    // If no modals are open, show hero-text
    if (openModals.length === 0) {
        document.getElementById('hero-text').style.display = 'block';
    }
}

// --- Star Canvas ---
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

// Set canvas dimensions dynamically and handle resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // When resizing, it's good to re-initialize or adjust star positions if needed
    // For simplicity, we'll just let them reappear on the other side.
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call

let stars = [];
const numStars = 100; // Number of static background stars
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5, // Min radius 0.5, max 2.0
        alpha: Math.random() * 0.8 + 0.2, // Min opacity 0.2, max 1.0
        // Slower, more subtle movement
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for next frame
    ctx.fillStyle = 'white';
    ctx.lineCap = 'round'; // Makes lines slightly smoother if used

    stars.forEach(star => {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        star.x += star.dx;
        star.y += star.dy;

        // Wrap stars around the screen (appear on opposite side)
        if (star.x < -star.radius) star.x = canvas.width + star.radius;
        if (star.x > canvas.width + star.radius) star.x = -star.radius;
        if (star.y < -star.radius) star.y = canvas.height + star.radius;
        if (star.y > canvas.height + star.radius) star.y = -star.radius;
    });

    requestAnimationFrame(drawStars); // Loop the animation
}
drawStars(); // Start the star animation

// --- Sparkles ---
const sparkleContainer = document.querySelector('.sparkle-container');
const numSparkles = 30; // Number of small, twinkling sparkles
for (let i = 0; i < numSparkles; i++) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    // Position sparkles randomly
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.left = `${Math.random() * 100}%`;
    // Add random animation delays and durations for varied twinkling
    sparkle.style.animationDelay = `${Math.random() * 5}s`; // 0 to 5 seconds
    sparkle.style.animationDuration = `${Math.random() * 1.5 + 0.5}s`; // 0.5 to 2 seconds
    sparkleContainer.appendChild(sparkle);
}


// --- Shooting Stars ---
const shootingContainer = document.querySelector('.shooting-stars');
const numShootingStars = 4; // Number of shooting stars

function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    shootingContainer.appendChild(star);

    // Random initial position (can be off-screen)
    const startX = Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.25; // From -25% to 125% of width
    const startY = Math.random() * window.innerHeight * 1.5 - window.innerHeight * 0.25; // From -25% to 125% of height

    // Random direction (angle in degrees)
    const angle = Math.random() * 360; // 0 to 360 degrees

    // Random travel distance (how far it moves across the screen)
    const travelDistance = Math.random() * 800 + 400; // 400px to 1200px

    // Calculate end coordinates based on angle and distance
    const endX = startX + travelDistance * Math.cos(angle * Math.PI / 180);
    const endY = startY + travelDistance * Math.sin(angle * Math.PI / 180);

    // Random animation duration and delay
    const duration = Math.random() * 5 + 3; // 3 to 8 seconds
    const delay = Math.random() * 5; // 0 to 5 seconds

    // Random size and length of the tail
    const size = Math.random() * 3 + 1; // 1px to 4px thickness
    const length = Math.random() * 200 + 80; // 80px to 280px length

    // Set CSS custom properties (variables) for this specific star
    star.style.setProperty('--start-x', `${startX}px`);
    star.style.setProperty('--start-y', `${startY}px`);
    star.style.setProperty('--end-x', `${endX}px`);
    star.style.setProperty('--end-y', `${endY}px`);
    star.style.setProperty('--rotation', `${angle}deg`); // Rotate the star to match its travel direction
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--delay', `${delay}s`);
    star.style.setProperty('--size', `${size}px`);
    star.style.setProperty('--length', `${length}px`);

    // Apply the animation using the custom properties
    star.style.animation = `shoot var(--duration) var(--delay) linear infinite`;

    // Listen for animation end to re-create/reset the star
    star.addEventListener('animationiteration', () => {
        // Remove the old star to clean up DOM and allow fresh creation
        star.remove();
        // Create a new star to keep the continuous effect
        createShootingStar();
    });
}

// Create the initial set of shooting stars
for (let i = 0; i < numShootingStars; i++) {
    // Add a slight delay for initial creation to spread them out
    setTimeout(createShootingStar, i * 1500);
}
