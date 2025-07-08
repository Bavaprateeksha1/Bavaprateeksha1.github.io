function openOnly(id) {
  document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
  document.getElementById('hero-text').style.display = 'none';
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  if (![...document.querySelectorAll('.modal')]
        .some(m => m.style.display === 'flex')) {
    document.getElementById('hero-text').style.display = 'block';
  }
}

// Starfield
const canvas = document.getElementById('stars'),
      ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars=[]; 
for(let i=0;i<100;i++){
  stars.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*1.2,
    a:Math.random(),
    dx:(Math.random()-0.5)*0.5,
    dy:(Math.random()-0.5)*0.5
  });
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='white';
  stars.forEach(s=>{
    ctx.globalAlpha=s.a;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,2*Math.PI);
    ctx.fill();
    s.x+=s.dx; s.y+=s.dy;
    if(s.x<0||s.x>canvas.width||s.y<0||s.y>canvas.height){
      s.x=Math.random()*canvas.width;
      s.y=Math.random()*canvas.height;
    }
  });
  requestAnimationFrame(draw);
}
draw();

// Sparkles
const sparkCon = document.querySelector('.sparkle-container');
for(let i=0;i<30;i++){
  let sp = document.createElement('div');
  sp.className='sparkle';
  sp.style.top = `${Math.random()*100}%`;
  sp.style.left = `${Math.random()*100}%`;
  sparkCon.appendChild(sp);
}

// Shooting Stars
const shootCon = document.querySelector('.shooting-stars');
for(let i=0;i<4;i++){
  let ss = document.createElement('div');
  ss.className='shooting-star';
  ss.style.top = `${Math.random()*80}%`;
  ss.style.left = `${Math.random()*150 - 50}%`;
  ss.style.animationDelay = `${i * 2}s`;
  shootCon.appendChild(ss);
}
