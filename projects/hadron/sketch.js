const cnv = document.getElementById('cnv'),
      c   = cnv.getContext('2d');

let w, h;

let debug = false;

function Particle() {
    this.on = true;

    this.path = new Path2D();
    this.path.moveTo(0, 0);

    this.pos = new Vector();
    this.vel = new Vector();
    this.acc = vecPolar(Math.random() * Math.PI * 2, 4 + Math.random()**1.5 * 10);

    this.curl = (Math.random() + 0.1) / 2;
    if (Math.random() < 0.5) this.curl *= -1;

    this.applyForce = function(v) {
        this.acc.add(v);
    }

    this.update = function() {
        if (this.on) {
            let drag = vecMult(this.vel, this.vel.mag() * -0.005);
            this.applyForce(drag);

            this.vel.add(this.acc);
            this.vel.rotate(this.curl / this.vel.magSq());
            this.pos.add(this.vel);

            this.path.lineTo(this.pos.x, this.pos.y);

            this.acc = new Vector();

            if (this.vel.magSq() < 0.5) this.on = false;
        }
    }

    this.draw = function() {
        c.stroke(this.path);

        if (debug && !this.on) {
            c.fillStyle = '#f00';
            c.beginPath();
            c.arc(this.pos.x, this.pos.y, 2, 0, Math.PI*2);
            c.fill();
        }
    }
}

const particles = [];
let count = 1;
draw();

function draw() {
    w = cnv.width  = innerWidth,
    h = cnv.height = innerHeight;

    if (debug) {
        const active = particles.reduce((sum, it) => sum + it.on, 0);
        c.fillStyle = '#f00';
        c.font = '50px sans-serif';
        c.fillText(active, 20, 50);
    }

    c.translate(w/2, h/2);
    c.lineWidth = 2;
    c.strokeStyle = '#fff';
    c.shadowBlur = 20;
    c.shadowColor = '#fff6';

    while (Math.random() < 9/count**2) {
        count += 1;
        particles.push(new Particle());
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    requestAnimationFrame(draw);
}
