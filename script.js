const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const particleSize = 2;
const size = 200;
canvas.width = size * particleSize;
canvas.height = size * particleSize;

const particleAmount = 1000;
var particles = [];

var mouseDown = false;

canvas.addEventListener('mousedown',(evt)=>{
  particles[Math.floor(evt.offsetY/particleSize)][Math.floor(evt.offsetX/particleSize)].wall = 1;
  mouseDown = true;
})

canvas.addEventListener('mousemove',(evt)=>{
  if(mouseDown)
    particles[Math.floor(evt.offsetY/particleSize)][Math.floor(evt.offsetX/particleSize)].wall = 1;
})

canvas.addEventListener('mouseup',(evt)=>{
  mouseDown = false;
})

function start() {
  createParticles();
  var timer = getTime();
  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    var dt = (getTime() - timer) / 1000;
    particles = moveParticles();
    drawParticles();

    timer = getTime();
  }, 20);
}

function createParticles() {
  for (let row = 0; row < size; row++) {
    particles.push([]);
    for (let colm = 0; colm < size; colm++) {
      if(row == 0 || colm == 0 || colm == size-1 || row == size -1)
        particles[row][colm] = {wall : 1};

      else{
        particles[row][colm] = {
          north: getRandom(),
          east: getRandom(),
          south: getRandom(), 
          west: getRandom(),
        };
      }
    }
  }
}

function drawParticles() {
  for (let row = 0; row < size; row++) {
    for (let colm = 0; colm < size; colm++) {
      if (particles[row][colm].wall) {
        ctx.fillStyle = "black";
        ctx.fillRect(colm * particleSize, row * particleSize, particleSize, particleSize);
      }
      if (particles[row][colm].north || particles[row][colm].east || particles[row][colm].south || particles[row][colm].west) {
        ctx.fillStyle = "blue";
        ctx.fillRect(colm * particleSize, row * particleSize, particleSize, particleSize);
      }
    }
  }
}

function getRandom() {
  var num = Math.random();
  if (num < particleAmount / (size * size * 4)) return 1;
  return 0;
}

function getTime() {
  return new Date().getTime();
}

start();
