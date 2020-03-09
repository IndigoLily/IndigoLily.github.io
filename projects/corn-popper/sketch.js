const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const PI = Math.PI;
const TAU = PI*2;
const GRAV = new my.vector(0, 0.2);
const DRAG = .99;

let width  = canvas.width  = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

function ball() {
  this.r = 4 + Math.random()*10;
  this.pos = new my.vector(Math.random()*width, height + this.r);
  let base = -(height**.47);
  this.vel = new my.vector(0, base - Math.random()*base/2);
  this.vel.rotate(TAU/16 - Math.random()*TAU/16*2);
  let col1 = Math.floor(0x10 + Math.random()*0x11).toString(16);
  let col2 = Math.floor(0x20 + Math.random()*0x51).toString(16);
  this.col = '#' + col1 + col1 + col2;

  this.update = function() {
    this.vel.add(GRAV);
    this.vel.mult(DRAG);

    this.pos.add(this.vel);
  }

  this.draw = function() {
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.r, 0, TAU);
    c.fillStyle = this.col;
    c.fill();
  }
}

let balls = [];
let time = 0, waitTime = 0, toggle = false;

function draw() {
  c.clearRect(0,0,width,height);

  if (!(time%(60*12))) {
    toggle = false;
    waitTime = time + 60*3.25;
  } else if (time >= waitTime) toggle = true;

  if (toggle) {
    balls.push(new ball());
    balls.push(new ball());
  }

  for(let i = 0; i < balls.length; i++) {
    balls[i].update();
    if (balls[i].pos.y - balls[i].r >= height && balls[i].vel.y > 0) {
      balls.splice(i,1);
      i--;
      continue;
    }
    balls[i].draw();
  }

  time++;
  requestAnimationFrame(draw);
}

draw();
