const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

let width  = canvas.width  = window.innerWidth;
let height = canvas.height = window.innerHeight;

c.fillStyle = '#e0e0e0';
c.fillRect(0,0,width,height);
c.fillStyle = '#000';

let highlight = false;

function particle(x, y, l) {
  this.l = l || 0;
  this.pos = new my.vec2d(x||width/2, y||height);
  this.vel = new my.vec2d(0, -1);
  this.age = 0;
  this.lifespan = height/2 / (this.l+1);
  this.branches = [];

  this.draw = function() {
    if (this.age <= this.lifespan) {
      this.age++;
      let angle = Math.PI/100*(this.l+1);
      let dir = Math.random()<.5;
      if (dir) angle *= -1;
      this.vel.rotate(angle);
      if (this.vel.y > 0) this.vel.rotate(-angle*2);
      this.pos.add(this.vel);

      c.fillStyle = (!this.l && highlight) ? '#f00' : '#000';
      c.fillRect(this.pos.x, this.pos.y, 1, 1);

      if (Math.random() < .01 && (this.l ? this.l < 4 && this.branches.length < 2 : true)) {
        this.branches.push(new particle(this.pos.x, this.pos.y, this.l + 1));
        this.branches[this.branches.length - 1].vel.rotate(this.vel.angle()/4 * (Math.random()<.5?1:-1));
        this.age /= 1.1;
      }
    }
    this.branches.forEach(b => b.draw());
  }
}

let trunk = new particle();

window.addEventListener('resize', () => {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;

  c.fillStyle = '#e0e0e0';
  c.fillRect(0,0,width,height);
  c.fillStyle = '#000';

  trunk = new particle();
});

window.addEventListener('click', () => {
  c.fillStyle = '#e0e0e0';
  c.fillRect(0,0,width,height);
  c.fillStyle = '#000';

  trunk = new particle();
});

window.addEventListener('keydown', e => {
  if (e.keyCode === 72) highlight = !highlight;
});

function draw() {
  for(let i = 0; i < 6; i++) {
    trunk.draw();
  }
  requestAnimationFrame(draw);
}

draw();
