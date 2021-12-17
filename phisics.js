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
            if(particles[row][colm].north){
              if(row - 1 >= 0 && particles[row-1][colm].wall){
                duplicate[row][colm].north = 0;
                duplicate[row][colm].south = 1;
              }
              else if(row - 2 >= 0  && particles[row-2][colm].south){
                duplicate[row][colm].north = 0;
                duplicate[row -1][colm].west = 1;
              }
              else if(row - 1 >= 0){
                duplicate[row][colm].north = 0;
                duplicate[row - 1][colm].north = 1;
              }
            }
  
            //particle heading south
            if(particles[row][colm].south){
              if(row + 1 < size && particles[row+1][colm].wall){
                duplicate[row][colm].south = 0;
                duplicate[row][colm].north = 1;
              }
              else if(row + 2 < size && particles[row+2][colm].north){
                duplicate[row][colm].south = 0;
                duplicate[row + 1][colm].east = 1;
              }
              else if(row + 1 < size){
                duplicate[row][colm].south = 0;
                duplicate[row + 1][colm].south = 1;
              }
            }
  
            //particle heading east
            if(particles[row][colm].east){
              if(colm + 1 < size && particles[row][colm+1].wall){
                duplicate[row][colm].east = 0;
                duplicate[row][colm].west = 1;
              }
              else if(colm + 2 < size && particles[row][colm+2].west){
                duplicate[row][colm].east = 0;
                duplicate[row][colm+1].north = 1;
              }
              else if(colm + 1 < size){
                duplicate[row][colm].east = 0;
                duplicate[row][colm + 1].east = 1;
              }
            }
  
            //particle heading west
            if(particles[row][colm].west){
              if(colm - 1 >= 0 && particles[row][colm-1].wall){
                duplicate[row][colm].west = 0;
                duplicate[row][colm].east = 1;
              }
              else if(colm - 2 >= 0 && particles[row][colm-2].east){
                duplicate[row][colm].west = 0;
                duplicate[row][colm -1].south = 1;
              }
              else if(colm - 1 >= 0){
                duplicate[row][colm].west = 0;
                duplicate[row][colm - 1].west = 1;
              }
            }
        }
    }
    return duplicate;
  }