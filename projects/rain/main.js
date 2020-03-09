"use strict";

const cnv = document.body.appendChild(document.createElement('canvas')),
      c   = cnv.getContext('2d');
document.body.appendChild(document.createElement('div'));

let w, h, length, rain;



class Rain {
    reset() {
        ++this.resets;
        this.x = Math.floor(Math.random() * w);
        this.y = -h * Math.random() - length;
        this.z = Math.random()**3;
        this.vel = 1 + this.z**0.25 * h/48 + Math.random();
    }

    constructor() {
        this.resets = -1;
        this.reset();
    }

    move() {
        this.y += this.vel;
        if (this.y > h) {
            this.reset();
        }
    }

    draw() {
        c.fillRect(
            /*x*/ this.x,
            /*y*/ Math.ceil(this.y),
            /*w*/ 1,
            /*h*/ Math.max(1, Math.ceil(length*this.z))
        );
    }
}



resize();
function resize() {
    w = cnv.width  = innerWidth;
    h = cnv.height = innerHeight;
    length = h/20;
    c.strokeStyle = '#fff';
    c.fillStyle = '#fff';
    rain = [];
    for (let i = 0; i < w*2; ++i) {
        rain.push(new Rain());
    }

    while (true) {
        for (let i = 0; i < rain.length; ++i) {
            rain[i].move();
        }
        if (rain.filter(drop => drop.resets > 10).length) {
            break;
        }
    }
}
window.addEventListener('resize', resize);



draw();
function draw() {
    c.clearRect(0, 0, w, h);

    for (let i = 0; i < rain.length; ++i) {
        rain[i].move();
        rain[i].draw();
    }

    requestAnimationFrame(draw);
}
