const sin   = Math.sin,
      cos   = Math.cos,
      abs   = Math.abs,
      sqrt  = Math.sqrt,
      min   = Math.min,
      max   = Math.max,
      PI    = Math.PI,
      TAU   = PI * 2,
      PHI   = (1+sqrt(5))/2,
      RT2   = sqrt(2);

const cnv  = document.getElementById('cnv'),
      c    = cnv.getContext('2d');

let   w    = cnv.width  = innerWidth,
      h    = cnv.height = innerHeight;
c.translate(w/2, h/2);

window.addEventListener('resize', () => {
    w = cnv.width  = innerWidth;
    h = cnv.height = innerHeight;
    c.translate(w/2, h/2);
    parts = [];
});

var count = 0;
var slow = 50;
class Part {
    constructor(col, r) {
        this.r = r || Math.random()**2 * min(w,h)/100 + min(w,h)/400;
        this.pos = Vector.rand(0, min(w,h)*0.3/2 - this.r*2);
        this.vel = Vector.rand(min(w,h)/1000, min(w,h)/80);
        this.acc = new Vector(0, 0);
        this.col = col || `hsl(${(count = (count + (Math.random() < 0.0008 ? 67*slow : 1))%(360*slow))/slow}, 100%, ${Math.floor(20+Math.random()**3*80)}%)`;
    }

    move() {
        let grav = Vector.sub(new Vector(), this.pos);
        this.acc.add(grav.div(1000));
        this.vel.mult(0.999);
        this.pos.add(this.vel.add(this.acc));
        this.acc.set(0, 0);
    }

    draw() {
        c.fillStyle = this.col;
        c.beginPath();
        c.arc(this.pos.x, this.pos.y, this.r, 0, TAU);
        c.fill();
    }

    updt() {
        this.move();
        this.draw();
    }
}

var parts = [];

function burst() {
    count = (count + 67*slow)%(360*slow)
    const b = (times=0) => {
        for (let i = 0; i < 30; i++) {
            let part = new Part();
            if (Math.random()<1/3) part.col = '#fff';
            part.vel.mult(1.125);
            part.r /= 2;
            part.r **= 2;
            parts.unshift(part);
        }
        if (times < 30) {
            setTimeout(()=>b(times+1), 1);
        }
    }
    b();
}


draw();

function draw(frame = 0) {
    c.clearRect(-w/2, -h/2, w, h);

    while (Math.random() < 0.85) {
        parts.push(new Part());
    }

    for (let i = parts.length - 1; i >= 0; i--) {
        let part  = parts[i],
            pos   = part.pos.deg,
            vel   = part.vel.deg,
            big   = max(pos, vel),
            small = min(pos, vel);
        c.strokeStyle = '#f00';
        c.fillStyle = '#fff';

        part.move();

        let a = big - small;
        if (a > 180) {
            a = 360 - a;
        }
        if (part.pos.mag+part.r < min(w,h)*0.33/2 && !(a < 90)) {
            c.strokeStyle = '#00f';
            parts.splice(i, 1);
        }
        part.draw();
    }

    requestAnimationFrame( () => draw(frame + 1) );
}
