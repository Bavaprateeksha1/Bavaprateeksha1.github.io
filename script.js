Js 
function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';
}
function closeModal(id){
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// Typing Animation
const text = "Hi, I’m Prateeksha";
let i = 0;
const el = document.getElementById('typed');
function type(){
  if(i <= text.length){
    el.innerText = text.slice(0, i) + (i % 2 ? '|' : '');
    i++;
    setTimeout(type, 120);
  }
}
type();

// Sparkling Stars
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const stars = [];
for(let s = 0; s < 150; s++){
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    d: Math.random() * 1 + 0.5
  });
}
function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = '#ffffffaa';
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    s.y += s.d;
    if(s.y > canvas.height){
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Project Modal Full Image
document.querySelectorAll('#projects .card img').forEach(img => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'modal';
    overlay.style.display = 'flex';

    const box = document.createElement('div');
    box.className = 'modal-box bg-purple';
    box.style.maxHeight = 'none';
    box.innerHTML = `<img src="${img.src}" style="width:100%; border-radius:10px;" />`;

    const closeBtn = document.createElement('span');
    closeBtn.className = 'close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => document.body.removeChild(overlay);

    box.prepend(closeBtn);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  });
});
