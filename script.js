
/* SETTINGS */

const SECRET_PASSWORD = "BAVANI";
const BIRTHDAY = new Date(2026,11,4,0,0,0);

// Testing only: true = bypass countdown
const TEST_MODE = true;

/* NAVIGATION */

function next(number) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );

  document.getElementById("s"+number).classList.add("active");

  window.scrollTo(0,0);

  if(number===4) createBalloons();
  if(number===6) setupScratch();
}

function showModal(title,message,emoji="💗") {
  document.getElementById("modalTitle").textContent=title;
  document.getElementById("modalMessage").textContent=message;
  document.getElementById("modalEmoji").textContent=emoji;
  document.getElementById("modal").classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}

/* COUNTDOWN */

function updateCountdown() {
  const diff=BIRTHDAY.getTime()-Date.now();

  if(diff<=0) {
    ["days","hours","minutes","seconds"].forEach(id=>
      document.getElementById(id).textContent="00"
    );

    document.getElementById("countText").textContent=
      "The magical day is finally here! Happy Birthday Bavani! ❤️";

    document.getElementById("countContinue").disabled=false;
    return;
  }

  const days=Math.floor(diff/86400000);
  const hours=Math.floor(diff%86400000/3600000);
  const minutes=Math.floor(diff%3600000/60000);
  const seconds=Math.floor(diff%60000/1000);

  document.getElementById("days").textContent=days;
  document.getElementById("hours").textContent=String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent=String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent=String(seconds).padStart(2,"0");
}

updateCountdown();
setInterval(updateCountdown,1000);

if(TEST_MODE) {
  document.getElementById("countContinue").disabled=false;
}

/* PASSWORD */

function checkPassword() {
  const value=document.getElementById("password").value;

  if(value.toUpperCase()===SECRET_PASSWORD.toUpperCase()) {
    document.getElementById("passError").textContent="";
    next(4);
    sparkleBurst(innerWidth/2,innerHeight/2,35);
  } else {
    document.getElementById("passError").textContent=
      "Oops! Wrong password. Try again ❤️";
    document.getElementById("password").value="";
  }
}

document.getElementById("password").addEventListener("keydown",e=>{
  if(e.key==="Enter") checkPassword();
});

/* 24 BALLOONS */

const messages=[
"உன் புன்னகை எப்போதும் இப்படியே அழகாக இருக்கட்டும்! ❤️",
"You deserve all the happiness in this world.",
"உன் கனவுகள் அனைத்தும் நனவாகட்டும்! ✨",
"உன்னைப் போன்றவர்கள் மிகவும் special.",
"May every sunrise bring you new hope.",
"உன் வாழ்க்கையில் மகிழ்ச்சியே நிறைந்திருக்கட்டும்.",
"Keep shining, beautiful soul! 🌸",
"உன் சின்னச் சின்ன சந்தோஷங்கள் பெரிய நினைவுகளாகட்டும்.",
"You are one of a kind.",
"எப்போதும் உன் முகத்தில் புன்னகை இருக்கட்டும்!",
"May your heart always find peace.",
"உன் ஆசைகள் அனைத்தும் நிறைவேறட்டும்.",
"You make ordinary moments special.",
"உன் வாழ்க்கை வண்ணமயமான பூந்தோட்டமாகட்டும்!",
"Never stop dreaming, Bavani.",
"உன்னைச் சுற்றி அன்பான மனிதர்கள் நிறைந்திருக்கட்டும்.",
"Your happiness matters.",
"ஒவ்வொரு நாளும் ஒரு புதிய தொடக்கமாகட்டும்.",
"May you always have a reason to smile.",
"உன் மனதில் இருக்கும் நல்ல எண்ணங்கள் நிறைவேறட்டும்.",
"Stay magical, stay beautiful! ✨",
"நீ நினைக்கும் உயரத்தை அடைய வேண்டும்.",
"A thousand smiles for your special day.",
"இனிய பிறந்தநாள் வாழ்த்துகள், Bavani! ❤️"
];

const balloonColors=[
"#ff5caa","#9c70ff","#42dfff","#ffca57",
"#70ffbb","#ff795f","#d77bff","#4da5ff",
"#ff4d86","#c3ff5b","#ff9e53","#70e5ff",
"#a58aff","#ffdc6e","#fd70d5","#60ffc8",
"#ff7899","#77aaff","#e7a1ff","#ffe56e",
"#65e9ff","#ff9a64","#9effae","#ff63d1"
];

let openedBalloons=new Set();
let balloonCreated=false;

function shuffle(array) {
  return array.sort(()=>Math.random()-.5);
}

function createBalloons() {
  if(balloonCreated)return;
  balloonCreated=true;

  const grid=document.getElementById("balloonGrid");

  shuffle([...Array(24).keys()]).forEach((index,i)=>{
    const balloon=document.createElement("div");

    balloon.className="balloon";
    balloon.textContent="🎈";
    balloon.style.color=balloonColors[index];
    balloon.style.filter=`drop-shadow(0 0 12px ${balloonColors[index]})`;
    balloon.style.setProperty("--delay",i*.08+"s");
    balloon.dataset.number=index+1;

    balloon.addEventListener("click",()=>{
      if(openedBalloons.has(index))return;

      openedBalloons.add(index);
      balloon.classList.add("opened");

      showModal("Surprise "+(index+1),messages[index],"🎈");

      sparkleBurst(
        balloon.getBoundingClientRect().left+25,
        balloon.getBoundingClientRect().top+25,18
      );

      document.getElementById("balloonCount").textContent=
        openedBalloons.size+" / 24 opened";

      if(openedBalloons.size===24) {
        document.getElementById("balloonContinue").disabled=false;
      }
    });

    grid.appendChild(balloon);
  });
}

/* GIFT BOX */

let boxOpened=false;

function openBox() {
  if(boxOpened)return;
  boxOpened=true;

  document.querySelector(".big-box").textContent="💝";
  document.getElementById("boxText").textContent=
    "A special memory is waiting behind the stars...";

  sparkleBurst(innerWidth/2,innerHeight/2,55);

  setTimeout(()=>next(6),1200);
}

/* SCRATCH PHOTO */

hiddenPhoto.onload = () => {
  resetScratch();
};

hiddenPhoto.onerror = () => {
  console.error("Birthday photo not found!");
};

function setupScratch() {
  if (hiddenPhoto.complete && hiddenPhoto.naturalWidth > 0) {
    if (!canvas.width) resetScratch();
  }
}

function setupScratch() {
  if(!canvas.width)resetScratch();
}

function resetScratch() {
  const wrap=document.getElementById("scratchWrap");

  canvas.width=wrap.clientWidth*devicePixelRatio;
  canvas.height=wrap.clientHeight*devicePixelRatio;

  ctx.globalCompositeOperation="source-over";

  const gradient=ctx.createLinearGradient(
    0,0,canvas.width,canvas.height
  );

  gradient.addColorStop(0,"#ff8dcb");
  gradient.addColorStop(.5,"#9467dc");
  gradient.addColorStop(1,"#56c8f5");

  ctx.fillStyle=gradient;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle="white";
  ctx.textAlign="center";
  ctx.textBaseline="middle";
  ctx.font=`bold ${Math.max(15,canvas.width/32)}px Poppins`;
  ctx.fillText("✨ SCRATCH TO REVEAL ✨",
    canvas.width/2,canvas.height/2);

  ctx.globalCompositeOperation="destination-out";

  scratched=false;
  document.getElementById("scratchProgress").textContent="0% revealed";
  document.getElementById("scratchContinue").disabled=true;
}

function getPosition(e) {
  const rect=canvas.getBoundingClientRect();

  return {
    x:(e.clientX-rect.left)*canvas.width/rect.width,
    y:(e.clientY-rect.top)*canvas.height/rect.height
  };
}

function scratch(e) {
  if(!scratching||scratched)return;

  const pos=getPosition(e);

  ctx.beginPath();
  ctx.arc(pos.x,pos.y,canvas.width/28,0,Math.PI*2);
  ctx.fill();

  const rect=canvas.getBoundingClientRect();

  sparkleBurst(
    rect.left+pos.x/canvas.width*rect.width,
    rect.top+pos.y/canvas.height*rect.height,
    3
  );

  checkScratchProgress();
}

function checkScratchProgress() {
  const data=ctx.getImageData(
    0,0,canvas.width,canvas.height
  ).data;

  let transparent=0,total=0;

  for(let i=3;i<data.length;i+=160) {
    total++;
    if(data[i]<80)transparent++;
  }

  const percent=Math.floor(transparent/total*100);

  document.getElementById("scratchProgress").textContent=
    percent+"% revealed";

  if(percent>=80&&!scratched) {
    scratched=true;
    ctx.clearRect(0,0,canvas.width,canvas.height);

    document.getElementById("scratchProgress").textContent=
      "✨ Your memory is revealed! ✨";

    document.getElementById("scratchContinue").disabled=false;
    sparkleBurst(innerWidth/2,innerHeight/2,65);
  }
}

canvas.addEventListener("pointerdown",e=>{
  scratching=true;
  canvas.setPointerCapture(e.pointerId);
  scratch(e);
});

canvas.addEventListener("pointermove",scratch);
canvas.addEventListener("pointerup",()=>scratching=false);
canvas.addEventListener("pointercancel",()=>scratching=false);

/* STAR EFFECTS */

function sparkleBurst(x,y,count=25) {
  const symbols=["✨","⭐","💖","🌟","💗"];

  for(let i=0;i<count;i++) {
    const particle=document.createElement("div");

    particle.className="particle";
    particle.textContent=
      symbols[Math.floor(Math.random()*symbols.length)];

    particle.style.left=x+"px";
    particle.style.top=y+"px";

    particle.style.setProperty("--x",(Math.random()-.5)*240+"px");
    particle.style.setProperty("--y",(Math.random()-.5)*240+"px");

    document.body.appendChild(particle);
    setTimeout(()=>particle.remove(),1100);
  }
}

/* FORMSPREE */

async function saveResponse() {
  const message=document.getElementById("herMessage").value.trim();
  const status=document.getElementById("responseStatus");
  const button=document.getElementById("sendButton");

  if(!message) {
    status.textContent="Please write a little something ❤️";
    return;
  }

  button.disabled=true;
  button.textContent="SENDING... 💌";

  try {
    const response=await fetch(
      "https://formspree.io/f/xzepljrz",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },
        body:JSON.stringify({
          name:"Bavani",
          message:message,
          subject:"A Special Message From Bavani ❤️",
          website:"Magical Birthday Surprise"
        })
      }
    );

    if(!response.ok)throw new Error("Sending failed");

    status.textContent=
      "Your words have reached someone special! ❤️";

    document.getElementById("herMessage").disabled=true;
    button.textContent="SENT WITH LOVE ❤️";

    sparkleBurst(innerWidth/2,innerHeight/2,50);

  } catch(error) {
    status.textContent="Oops! Please try again.";
    button.disabled=false;
    button.textContent="SEND WITH LOVE 💕";
  }
}

/* BACKGROUND MUSIC */

const music=new Audio("romantic.mp3");
music.loop=true;
music.volume=.35;

document.addEventListener("click",()=>{
  music.play().catch(()=>{});
},{once:true});

     
