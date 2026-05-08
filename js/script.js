const canvas = document.getElementById('space');

if(canvas){

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',()=>{
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
});

let stars=[];

for(let i=0;i<1000;i++){

stars.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*1.8,
speed:Math.random()*0.2

});
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle='white';

stars.forEach(star=>{

ctx.beginPath();
ctx.arc(star.x,star.y,star.size,0,Math.PI*2);
ctx.fill();

star.y += star.speed;

if(star.y > canvas.height){
star.y = 0;
star.x = Math.random()*canvas.width;
}

});

requestAnimationFrame(animate);
}

animate();
}
