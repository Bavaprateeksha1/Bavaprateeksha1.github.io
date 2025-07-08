// Modals
function openOnly(id){
  document.querySelectorAll('.modal').forEach(m=>m.style.display='none');
  document.getElementById('typed').innerHTML = typedHtml; // resume hero
  document.getElementById('hero-text')?.style?.display='none';
  document.getElementById(id).style.display='flex';
}
function closeModal(id){
  document.getElementById(id).style.display='none';
  if (![...document.querySelectorAll('.modal')].some(m=>m.style.display==='flex')) {
    startTyping();
  }
}

// Sparkling Stars Canvas
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;

let stars=[];
for(let i=0;i<120;i++){
  stars.push({
    x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    r:Math.random()*4+2, alpha:Math.random(),
    dx:(Math.random()-0.5)*0.2, dy:(Math.random()-0.5)*0.2
  });
}
function drawStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='white';
  stars.forEach(s=>{
    ctx.globalAlpha=s.alpha;
    ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,2*Math.PI);ctx.fill();
    s.x+=s.dx; s.y+=s.dy;
    if(s.x<0||s.x>canvas.width||s.y<0||s.y>canvas.height){
      s.x=Math.random()*canvas.width;
      s.y=Math.random()*canvas.height;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Typing Effect for Hero
const typedHtml = "Hi, I’m Bava Prateeksha";
let typedIndex=0;
function startTyping(){
  document.getElementById('typed').innerText='';
  typedIndex=0;
  tick();
}
function tick(){
  const el = document.getElementById('typed');
  el.innerText = typedHtml.slice(0,typedIndex++) + (typedIndex%2===0 ? '|' : '');
  if(typedIndex <= typedHtml.length) setTimeout(tick, 150);
}
startTyping();
