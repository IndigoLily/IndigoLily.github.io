const cnv = document.body.appendChild(document.createElement('canvas'));
const ctx = cnv.getContext('2d');

const w = 1920;
const h = 1080;
const r = h * 0.4;

let scale;
function resize() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    ctx.translate(cnv.width / 2, cnv.height / 2);
    scale = Math.min(cnv.width / w, cnv.height / h);
    //ctx.scale(scale, scale);
    ctx.globalAlpha = 0.5;
}
resize();
window.addEventListener('resize', resize);


class Bubble {
    constructor() {
	this.r = 5 + Math.random() / 7 * r;
	const _a = Math.random() * Math.PI * 2;
	const _r = Math.random() ** 0.5 * r - this.r;
	this.x = Math.cos(_a) * _r;
	this.y = Math.sin(_a) * _r;
	this.velx = -1 + Math.random() * 2;
	this.vely = -1 + Math.random() * 2;
    }

    updt() {
	const _a = Math.random() * Math.PI * 2;
	const _r = Math.random() * 0.1;
	this.velx += Math.cos(_a) * _r;
	this.vely += Math.sin(_a) * _r;

	const d = Math.hypot(this.x, this.y);
	if (d + this.r > r) {
	    this.velx -= this.x / d * 0.2;
	    this.vely -= this.y / d * 0.2;
	}

	this.velx *= 0.99;
	this.vely *= 0.99;

	this.x += this.velx;
	this.y += this.vely;
    }

    draw() {
	ctx.fillStyle = this.clr;
	ctx.beginPath();
	ctx.arc(this.x * scale, this.y * scale, this.r * scale, 0, Math.PI * 2);
	ctx.fill();
    }
}

let bubbles = [];
for (let i = 0; i < 300; i++) {
    bubbles.push(new Bubble());
}

function recolour() {
    const hue = Math.random() * 360;
    const clr1 = `hsl(${hue}, 100%, 50%)`;
    const clr2 = `hsl(${hue + 90 + Math.random() * 180}, 100%, 50%)`;
    for (let i = 0; i < bubbles.length; i++) {
	bubbles[i].clr = Math.random() < 0.5 ? clr1 : clr2;
    }
}
recolour();
window.addEventListener('click', recolour);

function draw() {
    ctx.clearRect(-cnv.width/2, -cnv.height/2, cnv.width, cnv.height);

    for (let i = 0; i < bubbles.length; i++) {
	bubbles[i].updt();
	bubbles[i].draw();
    }

    requestAnimationFrame(draw);
}

draw();
