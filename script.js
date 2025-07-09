// Variable to store the ID of the modal that opened the card detail modal
let parentModalId = '';

function openOnly(id) {
  // Close all modals *except* the card detail or image popup if they are currently open
  document.querySelectorAll('.modal').forEach(m => {
    if (m.id !== id && m.id !== 'card-detail-modal' && m.id !== 'image-popup-modal') {
      m.style.display = 'none';
    }
  });

  const modal = document.getElementById(id);
  if (modal) {
    modal.style.display = 'flex';
    // If opening projects or achievements, attach click handlers
    if (id === 'projects' || id === 'achievements') {
      attachCardClickHandlers(id);
    }
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

// Custom close function for the card detail modal
function closeCardDetailModal() {
  const cardDetailModal = document.getElementById('card-detail-modal');
  cardDetailModal.style.display = 'none';
  // Re-open the parent modal (projects or achievements)
  if (parentModalId) {
    document.getElementById(parentModalId).style.display = 'flex';
  }
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
for (let i = 0; i < 300; i++) { // Increased number of stars
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1, // Increased radius for larger stars
    speed: Math.random() * 0.8 + 0.3, // Increased speed for more intensity
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
        length: Math.random() * 70 + 40, // Increased length of the tail
        speedX: Math.random() * 15 + 8, // Faster horizontal speed
        speedY: Math.random() * 15 + 8, // Faster vertical speed
        alpha: 1,
        life: 1 // For fading out
    });
}

// Add shooting stars periodically (more frequently)
setInterval(createShootingStar, Math.random() * 3000 + 1500); // Every 1.5-4.5 seconds

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


// Function to attach click handlers for projects/achievements cards
function attachCardClickHandlers(modalId) {
    const cardsContainer = document.querySelector(`#${modalId} .cards-grid`);
    if (!cardsContainer) return;

    cardsContainer.querySelectorAll('.card').forEach(card => {
        card.onclick = function() {
            // Set the parent modal ID before opening the card detail
            parentModalId = modalId;
            openCardDetailPopup(this);
        };
    });
}

// Function to open the generic card detail pop-up
function openCardDetailPopup(originalCardElement) {
    const cardDetailModal = document.getElementById('card-detail-modal');
    const cardDetailContent = document.getElementById('card-detail-content');

    // Clone the original card, excluding event listeners
    const clonedCard = originalCardElement.cloneNode(true);

    // Remove any click listeners from the cloned card to avoid unintended behavior
    clonedCard.onclick = null;
    clonedCard.style.cursor = 'default';

    // Add a specific click listener to the IMAGE within the cloned card
    const clonedImage = clonedCard.querySelector('img');
    if (clonedImage) {
        clonedImage.style.cursor = 'pointer';
        clonedImage.onclick = function(event) {
            event.stopPropagation(); // Prevent card-level click if img is clicked
            openImagePopup(this.src);
        };
    }

    // Replace content and open the card detail modal
    cardDetailContent.innerHTML = '';
    cardDetailContent.appendChild(clonedCard);
    openOnly('card-detail-modal');
}

// Function to open the image-only pop-up
function openImagePopup(imageUrl) {
    const popupImage = document.getElementById('popup-image');
    popupImage.src = imageUrl;
    openOnly('image-popup-modal');
}

// Initial attachment of card click handlers when the page loads
// This ensures that even if projects/achievements are not the first modals opened,
// their cards are clickable.
document.addEventListener('DOMContentLoaded', () => {
    attachCardClickHandlers('projects');
    attachCardClickHandlers('achievements');
});
