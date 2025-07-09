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
  // Close any modal if clicked outside its content box
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

// Sparkling Stars / Galaxy Effect
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call to set canvas size

const stars = [];
for (let i = 0; i < 150; i++) { // Increased number of stars for better effect
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5, // Smaller stars
    speed: Math.random() * 0.5 + 0.2, // Speed of falling (slower)
    alpha: Math.random() * 0.8 + 0.2 // Initial alpha for twinkling
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  stars.forEach(s => {
    // Update Y position to make stars fall down
    s.y += s.speed;
    // If star goes off screen, reset to top
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width; // Random X for new star
    }

    // Twinkling effect (alpha change)
    s.alpha += (Math.random() - 0.5) * 0.05; // Small random change
    if (s.alpha > 1) s.alpha = 1;
    if (s.alpha < 0) s.alpha = 0;

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

    // Clear any previously cloned cards
    const originalCards = Array.from(carouselTrack.querySelectorAll('.card:not(.cloned)'));
    carouselTrack.innerHTML = ''; // Clear track to re-populate

    // Re-append original cards and then clone them enough times
    originalCards.forEach(card => {
        carouselTrack.appendChild(card.cloneNode(true));
    });

    const cardWidthWithMargin = 280 + 30; // Card width + margin-right
    const numOriginalCards = originalCards.length;

    // Clone enough cards to create a seamless loop
    // Duplicate the set at least twice to ensure continuous flow
    const numberOfClonesNeeded = numOriginalCards * 2;

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

    // Add click listeners to project cards for the pop-up
    carouselTrack.querySelectorAll('.card').forEach(card => {
        card.onclick = function() {
            const imageUrl = this.getAttribute('data-image');
            if (imageUrl) {
                const popupImage = document.getElementById('popup-image');
                popupImage.src = imageUrl;
                openOnly('image-popup-modal');
            }
        };
    });
}

// Call setupProjectsCarousel when the DOM is fully loaded for initial setup
document.addEventListener('DOMContentLoaded', () => {
    // Initial setup of the carousel if it's visible by default, or call it when the modal opens.
    // For now, it's called when 'projects' modal is opened.
});
