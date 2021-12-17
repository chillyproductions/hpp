const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const particleSize = 5;
const size = 100;
canvas.width = size * particleSize;
canvas.height = size * particleSize;

const particleAmount = 200;
var particles = [];

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
          particles[row][colm] = {};
        }
      // else{
      //   particles[row][colm] = {
      //     north: getRandom(),
      //     east: getRandom(),
      //     south: getRandom(), 
      //     west: getRandom(),
      //   };
      // }
    }
  }
  particles[70][50] = {east:1}; 
  particles[70][49] = {west:1}; 
}

function moveParticles() {
  var duplicate = [];

  for (let row in particles) {
    duplicate.push([]);
    for(let colm in particles[row]){
      duplicate[row][colm] = {wall:particles[row][colm].wall, north:particles[row][colm].north,east:particles[row][colm].east,south:particles[row][colm].south,west:particles[row][colm].west,}
    }
  };

  for(let row = 0; row < particles.length; row++){
      for(let colm = 0; colm < particles.length; colm++){

        //particle heading north
          if(row - 1 >= 0 && particles[row][colm].north && particles[row-1][colm].wall){
            duplicate[row][colm].north = 0;
            duplicate[row][colm].south = 1;
          }
          else if(row - 1 >= 0 && particles[row][colm].north && particles[row-1][colm].south){
            duplicate[row][colm].north = 0;
            duplicate[row][colm].west = 1;
          }
          else if(row - 1 >= 0 && particles[row][colm].north){
            duplicate[row][colm].north = 0;
            duplicate[row - 1][colm].north = 1;
          }

          //particle heading south
          if(row + 1 < size && particles[row][colm].south && particles[row+1][colm].wall){
            duplicate[row][colm].south = 0;
            duplicate[row][colm].north = 1;
          }
          else if(row + 1 < size && particles[row][colm].south && particles[row+1][colm].north){
            duplicate[row][colm].south = 0;
            duplicate[row][colm].east = 1;
          }
          else if(row + 1 < size && particles[row][colm].south){
            duplicate[row][colm].south = 0;
            duplicate[row + 1][colm].south = 1;
          }

          //particle heading east
          if(colm + 1 < size && particles[row][colm].east && particles[row][colm+1].wall){
            duplicate[row][colm].east = 0;
            duplicate[row][colm].west = 1;
          }
          else if(colm + 1 < size && particles[row][colm].east && particles[row][colm+1].west){
            duplicate[row][colm].east = 0;
            duplicate[row][colm].north = 1;
          }
          else if(colm + 1 < size && particles[row][colm].east){
            duplicate[row][colm].east = 0;
            duplicate[row][colm + 1].east = 1;
          }

          //particle heading west
          if(colm - 1 >= 0 && particles[row][colm].west && particles[row][colm-1].wall){
            duplicate[row][colm].west = 0;
            duplicate[row][colm].east = 1;
          }
          else if(colm - 1 >= 0 && particles[row][colm].west && particles[row][colm-1].east){
            duplicate[row][colm].west = 0;
            duplicate[row][colm].south = 1;
          }
          else if(colm - 1 >= 0 && particles[row][colm].west){
            duplicate[row][colm].west = 0;
            duplicate[row][colm - 1].west = 1;
          }
      }
  }
  return duplicate;
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
