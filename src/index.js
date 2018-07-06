var prompt = require('readline-sync'); 

var robotTraveler = function(){
  this.xAxis = -1; 
  this.yAxis = -1;
  this.direction = '';
  this._directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  this._xmin = 0;
  this._xmax = 4; 
  this._ymin = 0;
  this._ymax = 4; 
}; 

robotTraveler.prototype.place = function(X, Y, dir){
  let errMessage = 'Your input is not in the correct format, please enter a placement in the following format:PLACE X Y DIR';
  let xINT = parseInt(X, 10);
  let yINT = parseInt(Y, 10);
  if ((isNaN(xINT)) || (isNaN(yINT))){
    console.log(errMessage);
  }
  let index = this._directions.indexOf(dir);
  if (xINT < this._xmin || xINT > this._xmax){
    console.log(`Please enter a valid x axis value between ${this._xmin} and ${this._xmax}`);
  } else if (yINT < this._ymin || yINT > this._ymax){
    console.log(`Please enter a valid y axis value between ${this._ymin} and ${this._ymax}`); 
  } else if (index === -1) {
    console.log("Please enter a valid direction. Valid directions are 'NORTH', 'SOUTH', 'EAST', and 'WEST'.");
  } else {
    this.xAxis = xINT;
    this.yAxis = yINT;
    this.direction = dir;
  }
};

robotTraveler.prototype.changeDirection = function(dir){
  let direction = this.direction;
  let index = this._directions.indexOf(direction);
  if (index === 3 && dir === 'RIGHT'){
    this.direction = this._directions[0];
  } else if (index === 0 && dir === 'LEFT'){
    this.direction = this._directions[this._directions.length - 1];
  } else if (dir === 'LEFT'){
    this.direction = this._directions[index - 1];
  } else if (dir === 'RIGHT'){
    this.direction = this._directions[index + 1]; 
  }
};

robotTraveler.prototype._validateBoard = function(){
  let dir = this.direction; 
  let index = this._directions.indexOf(dir); 
  if ((this.xAxis >= this._xmin) && (this.xAxis <= this._xmax) && (this.yAxis >= this._ymin) && 
    (this.yAxis <= this._ymax) && (index !== -1)){
    return true; 
  }
  return false; 
}; 

robotTraveler.prototype.move = function(){
  this._lastCommandValid = true; 
  if (this.direction === 'EAST'){
    if ((this.xAxis < this._xmax)){
      this.xAxis += 1; 
    }
  } else if ((this.direction) === 'WEST'){
    if (this.xAxis > this._xmin){
      this.xAxis -= 1; 
    }
  } else if ((this.direction) === 'NORTH'){
    if (this.yAxis < this._ymax){
      this.yAxis += 1;
    }
  } else if ((this.direction) === 'SOUTH'){ 
    if (this.yAxis > this._ymin){
      this.yAxis -= 1; 
    }
  }
};

robotTraveler.prototype.report = function(){
  let xAxis = this.xAxis;
  let yAxis = this.yAxis;
  let direction = this.direction;
  console.log(`X: ${xAxis}, Y: ${yAxis}, DIRECTION: ${direction}`);
};

robotTraveler.prototype.serviceCommand = function(command){
  let valid = this._validateBoard(); 
  command = command.toUpperCase(); 
  let exhortation = 'Please place the robot in a valid position, facing a valid direction'; 
  if (command === 'LEFT'){
    if (!valid){
      console.log(exhortation);
    } else {
      this.changeDirection(command);
    }
  } else if (command === 'RIGHT'){
    if (!valid){
      console.log(exhortation);
    } else {
      this.changeDirection(command); 
    }
  } else if (command === 'MOVE'){
    if (!valid){
      console.log(exhortation);
    } else {
      this.move(); 
    }
  } else if (command === 'REPORT'){
    if (!valid){
      console.log(exhortation);
    } else {
      this.report(); 
    }
  } else if (command.substring(0, 5) === 'PLACE'){
    let x = command[6];
    let y = command[8];
    let dir = command.substring(10, command.length); 
    this.place(x, y, dir);
  } else {
    if (!valid){
      console.log(exhortation);
    } else {
      console.log('invalid command');      
    }
  }
}; 


robotTraveler.prototype.init = function(){
  let command; 
  do {
    command = prompt.question('Please enter a valid initial command '); 
    if (command.toUpperCase() === 'QUIT'){
      process.exit();
    }
    this.serviceCommand(command); 
  }while(!this._validateBoard()); 
  do {
    command = prompt.question('Thank you. Please enter another command '); 
    this.serviceCommand(command); 
  } while(command.toUpperCase() !== 'QUIT'); 
  process.exit(); 
};

var theTraveler = new robotTraveler(); 
theTraveler.init(); 