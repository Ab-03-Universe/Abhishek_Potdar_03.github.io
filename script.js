/* ==========================================================
   ABHISHEK POTDAR
   Academic Website JavaScript
========================================================== */

/* ==========================================================
CANVAS STAR BACKGROUND
========================================================== */

const canvas = document.getElementById("space");
const ctx = canvas.getContext("2d");

function resizeCanvas(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

const stars=[];

const STAR_COUNT=900;

for(let i=0;i<STAR_COUNT;i++){

stars.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

size:Math.random()*2,

speed:Math.random()*0.35+0.05

});

}

function animateStars(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="white";

stars.forEach(star=>{

ctx.beginPath();

ctx.arc(star.x,star.y,star.size,0,Math.PI*2);

ctx.fill();

star.y += star.speed;

if(star.y>canvas.height){

star.y=0;

star.x=Math.random()*canvas.width;

}

});

requestAnimationFrame(animateStars);

}

animateStars();

/* ==========================================================
SCROLL REVEAL
========================================================== */

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

document.querySelectorAll("section").forEach(sec=>{

sec.classList.add("hidden");

observer.observe(sec);

});

/* ==========================================================
COUNTERS
========================================================== */

const counters=document.querySelectorAll(".counter");

const speed=120;

const counterObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter=entry.target;

const target=+counter.dataset.target;

const update=()=>{

const current=+counter.innerText;

const increment=Math.ceil(target/speed);

if(current<target){

counter.innerText=current+increment;

setTimeout(update,20);

}else{

counter.innerText=target;

}

};

update();

counterObserver.unobserve(counter);

}

});

});

counters.forEach(counter=>counterObserver.observe(counter));

/* ==========================================================
SMOOTH ACTIVE NAVBAR
========================================================== */

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/* ==========================================================
SMOOTH SCROLL
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault();

document.querySelector(this.getAttribute("href"))

.scrollIntoView({

behavior:"smooth"

});

});

});

/* ==========================================================
TYPING EFFECT
========================================================== */

const typingElement = document.querySelector(".hero-left h2");

if (typingElement) {

const texts = [

"Solar Radio Astrophysics",

"Radio Astronomy Instrumentation",

"Space Weather",

"Chandrayaan-2 XSM",

"Aditya-L1 HEL1OS",

"21-cm Neutral Hydrogen"

];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

const current = texts[textIndex];

if (!deleting) {

typingElement.textContent = current.substring(0, charIndex++);
if (charIndex > current.length) {
deleting = true;
setTimeout(typeEffect, 1800);
return;
}

} else {

typingElement.textContent = current.substring(0, charIndex--);

if (charIndex < 0) {
deleting = false;
textIndex = (textIndex + 1) % texts.length;
}

}

setTimeout(typeEffect, deleting ? 40 : 90);

}

typeEffect();

}

/* ==========================================================
PARALLAX
========================================================== */

window.addEventListener("scroll", () => {

const scroll = window.pageYOffset;

const overlay = document.querySelector(".overlay");

if (overlay) {

overlay.style.transform =
`translateY(${scroll*0.15}px)`;

}

});

/* ==========================================================
NAVBAR BACKGROUND
========================================================== */

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

if(window.scrollY > 100){

navbar.style.background =
"rgba(7,17,31,.92)";

navbar.style.boxShadow =
"0 10px 30px rgba(0,0,0,.35)";

}else{

navbar.style.background =
"rgba(7,17,31,.75)";

navbar.style.boxShadow = "none";

}

});

/* ==========================================================
BACK TO TOP BUTTON
========================================================== */

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.cssText=`

position:fixed;
right:30px;
bottom:30px;

width:55px;
height:55px;

border:none;

border-radius:50%;

background:#64cfff;

color:#07111f;

font-size:22px;

font-weight:bold;

cursor:pointer;

display:none;

z-index:999;

box-shadow:0 10px 25px rgba(0,0,0,.3);

transition:.3s;

`;

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/* ==========================================================
GALLERY LIGHTBOX
========================================================== */

const images=document.querySelectorAll(".gallery-grid img");

const lightbox=document.createElement("div");

lightbox.id="lightbox";

lightbox.style.cssText=`

position:fixed;

top:0;
left:0;

width:100%;
height:100%;

background:rgba(0,0,0,.9);

display:none;

justify-content:center;

align-items:center;

z-index:5000;

`;

const img=document.createElement("img");

img.style.maxWidth="90%";

img.style.maxHeight="90%";

img.style.borderRadius="12px";

lightbox.appendChild(img);

document.body.appendChild(lightbox);

images.forEach(image=>{

image.addEventListener("click",()=>{

lightbox.style.display="flex";

img.src=image.src;

});

});

lightbox.addEventListener("click",()=>{

lightbox.style.display="none";

});

/* ==========================================================
FLOATING CARD EFFECT
========================================================== */

document.querySelectorAll(

".card,.project-card,.publication-card,.skill-card,.about-card"

).forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.transform=

`rotateX(${-(y-rect.height/2)/25}deg)

rotateY(${(x-rect.width/2)/25}deg)

translateY(-8px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0)";

});

});

/* ==========================================================
STAR TWINKLE
========================================================== */

setInterval(()=>{

stars.forEach(star=>{

star.size=Math.random()*2.2;

});

},800);

/* ==========================================================
PAGE LOADED
========================================================== */

window.addEventListener("load",()=>{

document.body.style.opacity="1";

console.log(

"Academic Website Loaded Successfully"

);

});
