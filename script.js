function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';

  // Specific logic for projects when opened
  if (id === 'projects') {
    setupProjectsCarousel();
  }
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

// Typing effect
const text = "Hi, I’m Prateeksha";
let i = 0;
const el = document.getElementById('typed');
function type() {
  if (i <= text.length) {
    el.innerText = text.slice(0, i) + (i % 2 ? '|' : '');
    i++;
    setTimeout(type, 120);
  } else {
    el.innerText = text;
  }
}
type();

// Sparkling Stars
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

// Function to resize canvas and redraw stars
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Re-initialize stars if needed, or update their positions
  // For simplicity, stars remain fixed relative to initial generation for now
}

window.addEventListener('resize', resizeCanvas); // Adjust canvas size on window resize
resizeCanvas(); // Initial call to set canvas size

const stars = [];
// Generate stars only once
for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    alpha: Math.random(),
    delta: Math.random() * 0.02 // Slower twinkling
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


// Projects Carousel Setup and Animation
function setupProjectsCarousel() {
    const carouselTrack = document.querySelector('#projects .carousel-track');
    if (!carouselTrack) return;

    // Remove any previously cloned cards
    const originalCards = Array.from(carouselTrack.querySelectorAll('.card:not(.cloned)'));
    carouselTrack.innerHTML = ''; // Clear track to re-populate

    // Re-append original cards and then clone them enough times
    originalCards.forEach(card => {
        carouselTrack.appendChild(card.cloneNode(true));
    });

    const cardWidthWithMargin = 280 + 30; // Card width + margin-right
    const numOriginalCards = originalCards.length;

    // Clone enough cards to create a seamless loop
    // We need at least enough clones to fill the visible area + one full set of original cards
    // A common practice for seamless loops is to duplicate the entire set once or twice.
    const numberOfClonesNeeded = numOriginalCards * 2; // Duplicate the set twice

    for (let i = 0; i < numberOfClonesNeeded; i++) {
        const clone = originalCards[i % numOriginalCards].cloneNode(true);
        clone.classList.add('cloned');
        carouselTrack.appendChild(clone);
    }

    // Calculate the total width of one full set of original cards (what needs to scroll)
    const scrollDistance = numOriginalCards * cardWidthWithMargin;

    // Apply the CSS variable for the animation
    carouselTrack.style.setProperty('--scroll-distance', `-${scrollDistance}px`);

    // Reset and apply animation
    carouselTrack.style.animation = 'none'; // Remove animation temporarily
    void carouselTrack.offsetWidth; // Trigger reflow to apply 'none'
    carouselTrack.style.animation = `scrollProjects ${numOriginalCards * 5}s linear infinite`; // Adjust speed (e.g., 5s per card set)
}

// Ensure setupProjectsCarousel runs when the projects modal is opened
// This is already handled by the openOnly function: `if (id === 'projects') { setupProjectsCarousel(); }`
