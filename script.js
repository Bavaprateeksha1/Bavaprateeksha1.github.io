function openOnly(id) {
  // Close all modals except the one being opened, unless it's a layered popup
  document.querySelectorAll('.modal').forEach(m => {
    if (m.id !== id) { // Don't close the current modal
      m.style.display = 'none';
    }
  });

  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';

  // Specific logic for projects/achievements when opened
  if (id === 'projects') {
    setupCarousel('projects');
  } else if (id === 'achievements') {
    // Achievements carousel doesn't loop, but we need to attach click handlers
    // If you want it looping like projects, the setupCarousel function would handle it.
    // For now, it will just ensure click handlers are attached.
    attachCardClickHandlers('achievements');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

window.addEventListener('click', event => {
  // This event listener was removed in the previous turn to prevent issues with layered popups.
  // We rely solely on the close buttons.
});


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
    el.innerText = text;
  }
}
type();

// Sparkling Stars / Galaxy Effect with Shooting Stars
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call to set canvas size

const stars = [];
for (let i = 0; i < 200; i++) { // Increased number of stars
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.5 + 0.2,
    alpha: Math.random() * 0.8 + 0.2
  });
}

const shootingStars = [];
function createShootingStar() {
    const startX = Math.random() * canvas.width * 1.5 - canvas.width * 0.25; // Start off-screen left/top
    const startY = Math.random() * canvas.height * 0.5 - canvas.height * 0.25; // Start higher up
    shootingStars.push({
        x: startX,
        y: startY,
        length: Math.random() * 50 + 30, // Length of the tail
        speedX: Math.random() * 10 + 5, // Faster horizontal speed
        speedY: Math.random() * 10 + 5, // Faster vertical speed
        alpha: 1,
        life: 1 // For fading out
    });
}

// Add shooting stars periodically
setInterval(createShootingStar, Math.random() * 5000 + 3000); // Every 3-8 seconds

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  // Draw regular stars
  stars.forEach(s => {
    s.y += s.speed;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
    s.alpha += (Math.random() - 0.5) * 0.05;
    if (s.alpha > 1) s.alpha = 1;
    if (s.alpha < 0) s.alpha = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
    ctx.fill();
  });

  // Draw shooting stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];

      ss.x += ss.speedX;
      ss.y += ss.speedY;
      ss.life -= 0.02; // Fade out

      if (ss.life <= 0 || ss.x > canvas.width + ss.length || ss.y > canvas.height + ss.length) {
          shootingStars.splice(i, 1); // Remove if faded or off-screen
          continue;
      }

      ctx.beginPath();
      // Create a gradient for the tail
      const gradient = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.speedX * 2, ss.y - ss.speedY * 2);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha * ss.life})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5; // Thickness of the shooting star
      ctx.moveTo(ss.x, ss.y);
      ctx.lineTo(ss.x - ss.speedX * (ss.life * 2), ss.y - ss.speedY * (ss.life * 2)); // Tail
      ctx.stroke();
  }

  requestAnimationFrame(animateStars);
}
animateStars();


// Projects and Achievements Carousel Setup and Animation
function setupCarousel(modalId) {
    const carouselTrack = document.querySelector(`#${modalId} .carousel-track`);
    if (!carouselTrack) return;

    // Clear any previously cloned cards
    const originalCards = Array.from(carouselTrack.querySelectorAll('.card:not(.cloned)'));
    carouselTrack.innerHTML = ''; // Clear track to re-populate

    // Re-append original cards
    originalCards.forEach(card => {
        carouselTrack.appendChild(card.cloneNode(true));
    });

    const cardWidthWithMargin = 280 + 30; // Card width + margin-right
    const numOriginalCards = originalCards.length;

    const numberOfClonesNeeded = numOriginalCards * 2;

    for (let i = 0; i < numberOfClonesNeeded; i++) {
        const clone = originalCards[i % numOriginalCards].cloneNode(true);
        clone.classList.add('cloned');
        carouselTrack.appendChild(clone);
    }

    const scrollDistance = numOriginalCards * cardWidthWithMargin;

    carouselTrack.style.setProperty('--scroll-distance', `-${scrollDistance}px`);

    carouselTrack.style.animation = 'none';
    void carouselTrack.offsetWidth;
    carouselTrack.style.animation = `scrollProjects ${numOriginalCards * 5}s linear infinite`;

    // Add click listeners to project/achievement cards for the pop-up
    carouselTrack.querySelectorAll('.card').forEach(card => {
        card.onclick = function() {
            openCardDetailPopup(this);
        };
    });
}

// Function to open the generic card detail pop-up
function openCardDetailPopup(originalCardElement) {
    const cardDetailModal = document.getElementById('card-detail-modal');
    const cardDetailContent = document.getElementById('card-detail-content');

    // Clone the original card's content, not the whole card element itself
    const clonedCard = originalCardElement.cloneNode(true);

    // Remove any click listeners from the cloned card to avoid infinite loops
    clonedCard.onclick = null;
    clonedCard.style.cursor = 'default'; // No cursor change on hover

    // Add a specific click listener to the IMAGE within the cloned card
    const clonedImage = clonedCard.querySelector('img');
    if (clonedImage) {
        clonedImage.style.cursor = 'pointer'; // Indicate image is clickable
        clonedImage.onclick = function(event) {
            event.stopPropagation(); // Prevent card-level click if img is clicked
            openImagePopup(this.src);
        };
    }

    // Replace content and open the card detail modal
    cardDetailContent.innerHTML = ''; // Clear previous content
    cardDetailContent.appendChild(clonedCard);
    openOnly('card-detail-modal');
}

// Function to open the image-only pop-up
function openImagePopup(imageUrl) {
    const popupImage = document.getElementById('popup-image');
    popupImage.src = imageUrl;
    openOnly('image-popup-modal');
}

// Function to attach click handlers specifically for non-looping carousels like achievements
function attachCardClickHandlers(modalId) {
    const achievementsTrack = document.querySelector(`#${modalId} .achievements-track`); // Note: different track class
    if (!achievementsTrack) return;

    achievementsTrack.querySelectorAll('.card').forEach(card => {
        card.onclick = function() {
            openCardDetailPopup(this);
        };
    });
}
