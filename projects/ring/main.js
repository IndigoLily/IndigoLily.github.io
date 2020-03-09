import { Vec } from './lib/vec.mjs';
const { sin, cos, abs, sqrt, min, max, PI } = Math;
const TAU   = PI * 2,
      PHI   = (1+sqrt(5))/2,
      RT2   = sqrt(2);

const cnv  = document.body.appendChild(document.createElement('canvas')),
      c    = cnv.getContext('2d');

const direction = Math.random() < 0.5 ? 1 : -1;
const maxAge = 360;
const correction = 1/30;
let w,h,inRad,outRad;
resize();
function resize() {
    w = cnv.width  = innerWidth;
    h = cnv.height = innerHeight;
    inRad  = min(w,h)/5;
    outRad = min(w,h)/3;
}
window.addEventListener('resize', resize);



let parts = [];

class Particle {
    constructor() {
        this.pos = new Vec(Math.random()*(outRad-inRad)+inRad, 0);
        this.pos.degs = Math.random()*360;
        this.vel = new Vec(1 + Math.random(), 0);
        this.vel.degs = this.pos.degs + direction*(45 + Math.random()*90);
        this.acc = new Vec();
        this.age = 0;
    }

    move() {
        this.age++;
        if (this.age < maxAge) {
            if (this.pos.mag > outRad) {
                this.acc.add(Vec.scale(this.pos, -1/this.pos.mag*correction));
            }
            if (this.pos.mag < inRad) {
                this.acc.add(Vec.scale(this.pos, 1/this.pos.mag*correction));
            }

            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.set(0, 0);
        }
    }

    draw() {
        c.beginPath();
        c.arc(this.pos.x, this.pos.y, min(w,h)/300*(sin(PI*this.age/maxAge)**2), 0, TAU);
        c.fill();
    }
}

function draw(frame = 0) {
    c.resetTransform();
    c.fillStyle = '#000';
    c.fillRect(0, 0, w, h);
    c.translate(w/2,h/2);

    /*
    c.strokeStyle = '#f00';
    c.beginPath();
    c.arc(0, 0, inRad, 0, TAU);
    c.stroke();
    c.beginPath();
    c.arc(0, 0, outRad, 0, TAU);
    c.stroke();
    */

    parts.push(new Particle());

    c.fillStyle = '#fff';
    for (const part of parts) {
        part.move();
        part.draw();
    }

    if (parts.length >= maxAge) {
        parts.shift();
    }

    requestAnimationFrame( () => draw(frame + 1) );
}

draw();
