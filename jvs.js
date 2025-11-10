const chuCai = ['A','E','U','Ơ','Ư'];
const thung = document.getElementById('thung');
const bongTrong = [];
let bongRaHienTai = null;
let lastChar = null;
const bongR = 25;
const thungSize = 320;

// Tạo bóng trong thùng
for(let i=0;i<5;i++){
  const div = document.createElement('div');
  div.className='bong';
  div.style.left=`${Math.random()*(thungSize-2*bongR)}px`;
  div.style.top=`${Math.random()*(thungSize-2*bongR)}px`;
  div.vx=(Math.random()*3+2)*(Math.random()<0.5?-1:1);
  div.vy=(Math.random()*3+2)*(Math.random()<0.5?-1:1);
  div.colorBase=randomColor();
  div.style.background=`radial-gradient(circle at 30% 30%, #fff, ${div.colorBase})`;
  thung.appendChild(div);
  bongTrong.push(div);

  setInterval(()=>{
    let x=parseFloat(div.style.left)+div.vx;
    let y=parseFloat(div.style.top)+div.vy;
    if(x<=0){x=0;div.vx*=-1;div.style.background=`radial-gradient(circle at 30% 30%, #fff, ${randomColor()})`;}
    if(x>=thungSize-2*bongR){x=thungSize-2*bongR;div.vx*=-1;div.style.background=`radial-gradient(circle at 30% 30%, #fff, ${randomColor()})`;}
    if(y<=0){y=0;div.vy*=-1;div.style.background=`radial-gradient(circle at 30% 30%, #fff, ${randomColor()})`;}
    if(y>=thungSize-2*bongR){y=thungSize-2*bongR;div.vy*=-1;div.style.background=`radial-gradient(circle at 30% 30%, #fff, ${randomColor()})`;}
    div.style.left=`${x}px`; 
    div.style.top=`${y}px`;
    div.style.transform=`rotate(${x+y}deg)`;
  },20);
}

function randomColor(){
  const colors=['#ff4d4d','#ffa64d','#ffff66','#66ff66','#4da6ff','#ff66cc','#cc66ff','#66ffff','#ffb366'];
  return colors[Math.floor(Math.random()*colors.length)];
}

// Bốc bóng ra từ cửa
function bocBong(){
  if(bongRaHienTai){bongRaHienTai.remove(); bongRaHienTai=null;}
  let char;
  do{
    char=chuCai[Math.floor(Math.random()*chuCai.length)];
  } while(char===lastChar);
  lastChar=char;

  const bgColor=randomColor();
  const bongRa=document.createElement('div');
  bongRa.className='raNgoaiBong';
  bongRa.textContent=char;
  bongRa.style.background=`radial-gradient(circle at 30% 30%, #fff, ${bgColor})`;

  const cua = document.getElementById('cua-thung');
  const rect = cua.getBoundingClientRect();
  const containerRect = document.getElementById('container').getBoundingClientRect();

  const startX = rect.left - containerRect.left + rect.width/2 - bongR + 10;
  const startY = rect.top - containerRect.top + rect.height/2 - bongR + 10;

  bongRa.style.left=`${startX}px`;
  bongRa.style.top=`${startY}px`;
  bongRa.style.transform='scale(0.5)';
  document.getElementById('container').appendChild(bongRa);
  bongRaHienTai=bongRa;

  setTimeout(()=>{
    bongRa.style.transition='transform 0.8s ease-out';
    const xOffset = 140;
    const yOffset = -70;
    bongRa.style.transform=`scale(2) translateX(${xOffset}px) translateY(${yOffset}px)`;
  },50);

  bongRa.addEventListener('click',()=>{
    bongRa.remove();
    bongRaHienTai=null;
  });
}
