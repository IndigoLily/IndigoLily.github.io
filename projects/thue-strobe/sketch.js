var sequence = [false];
var frames = 0;
var rate = 10;
var add = true;

function circle(colour) {
  this.r = 1;
  this.colour = colour; // boolean, black/white
  this.grow = function() {
    this.r = add ? this.r + rate : this.r * rate;
  }
  this.draw = function() {
    noStroke();
    fill( this.colour ? 255 : 0 );
    ellipse( 0, 0, this.r, this.r );
  }
}

var circles = [];

function iterate() {
  var length = sequence.length;
  for( let i = 0; i < length; i++ ) {
    sequence.push(!sequence[i]);
  }
  console.log(sequence.length);
}

function setup() {
  // var size = Math.floor((windowWidth > windowHeight ? windowHeight : windowWidth));
  createCanvas(windowWidth,windowHeight);
  background(255);
}

function draw() {
  translate(width/2,height/2);
  if( frames >= sequence.length ) {
    iterate();
  }
  if( !(frameCount % 10) ) {
    circles.push( new circle(sequence[frames++]) );
  }
  for( let i = 0; i < circles.length; i++ ) {
    circles[i].grow();
    circles[i].draw();
  }
  for( let i = circles.length-1; i >= 0; i-- ) {
    if( circles[i].r > 1+(width**2 + height**2)**.5) {
      circles.splice(i,1);
      console.log("removed");
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}

function add(n_rate) {
  add = true;
  rate = n_rate;
}

function mult(n_rate) {
  add = false;
  rate = n_rate;
}