const cnv = document.body.appendChild(document.createElement('canvas'));
const ctx = cnv.getContext('2d');

const OUTER_SCALE = 1.15;
const PAD_SCALE = 1/400;

let w, h, min, pad, r, p_i, p_o;
function resize() {
    w = cnv.width  = window.innerWidth;
    h = cnv.height = window.innerHeight;
    min = Math.min(w,h);
    r = min / 3;
    pad = min*PAD_SCALE + ctx.lineWidth / 2;

    p_i = { x: w/2 + r - 1, y: h/2 };
    p_o = { x: w/2 + r * OUTER_SCALE + 1, y: h/2 };

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(w/2, h/2, +pad + r, 0, Math.PI * 2, true);
    ctx.arc(w/2, h/2, -pad + r * OUTER_SCALE, 0, Math.PI * 2, false);
    ctx.fill();

    //ctx.lineWidth = Math.max(1, min / 800);
    ctx.lineJoin = 'round';
}
resize();
window.addEventListener('resize', resize);

let frame = 0;
function draw() {
    ctx.strokeStyle = `hsl(${Math.floor(frame) % 360}, 100%, 55%)`;
    ctx.beginPath();
    ctx.moveTo(p_i.x, p_i.y);
    for (let i = 0; i < 4000; i++) {
	let nx, ny, a;
	do {
	    a = Math.random() * Math.PI * 2;
	    nx = p_i.x + Math.cos(a) * min / 400;
	    ny = p_i.y + Math.sin(a) * min / 400;
	} while (Math.hypot(w/2 - nx, h/2 - ny) > r)
	p_i.x = nx;
	p_i.y = ny;
	ctx.lineTo(p_i.x, p_i.y);
    }
    ctx.stroke();

    ctx.strokeStyle = `hsl(${Math.floor(frame * Math.PI / 3) % 360}, 90%, 45%)`;
    ctx.beginPath();
    ctx.moveTo(p_o.x, p_o.y);
    for (let i = 0; i < 8000; i++) {
	let nx, ny, a;
	do {
	    a = Math.random() * Math.PI * 2;
	    nx = p_o.x + Math.cos(a) * min / 400;
	    ny = p_o.y + Math.sin(a) * min / 400;
	} while (Math.hypot(w/2 - nx, h/2 - ny) < r * OUTER_SCALE || nx < pad || nx > w - pad || ny < pad || ny > h - pad)
	p_o.x = nx;
	p_o.y = ny;
	ctx.lineTo(p_o.x, p_o.y);
    }
    ctx.stroke();

    frame += 1;
    requestAnimationFrame(draw);
}
draw();
