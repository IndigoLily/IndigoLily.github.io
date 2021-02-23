const cnv = document.body.appendChild(document.createElement('canvas'));
const ctx = cnv.getContext('2d');

let w = cnv.width  = window.innerWidth;
let h = cnv.height = window.innerHeight;

window.addEventListener('resize', () => {
    w = cnv.width  = window.innerWidth;
    h = cnv.height = window.innerHeight;
});

function A(b) {
    let g = 0;
    const logb = Math.log(b);
    const twologsqb = 2 * logb * logb;
    for (let i = 0; i < 128; i++) {
	const bto2g = b ** (2 * g);
	g = g - (g + bto2g * logb) / (1 + bto2g * twologsqb);
    }
    return g;
}

function R(a, b) {
    return Math.sqrt(a**2 + b**(2*a));
}

function draw() {
    ctx.resetTransform();

    const scale = Math.min(w,h)/3;
    const t = Date.now() / 10000;
    const b = 10 ** (Math.cos(t * Math.PI * 2));
    const a = A(b);
    const r = R(a, b);

    ctx.shadowColor = '#000';

    {
	const x = w/2 + a*scale;

	let red = ctx.createLinearGradient(x, 0, 0, 0);
	red.addColorStop(1, '#600');
	red.addColorStop(0, '#f00');
	ctx.fillStyle = red;
	ctx.fillRect(0, 0, w, h);

	let blue = ctx.createLinearGradient(x, 0, w, 0);
	blue.addColorStop(1, '#006');
	blue.addColorStop(0, '#00f');
	ctx.fillStyle = blue;
	ctx.fillRect(x, 0, w, h);
    }

    ctx.lineWidth = 1;
    ctx.fillStyle = ctx.strokeStyle = '#000';

    ctx.shadowBlur = 0;



    ctx.beginPath();
    ctx.moveTo(-10, -h);
    for (let x = -10; x < w + 10; x++) {
	const sx = (x-w/2) / scale;
	ctx.lineTo(x, h/2 - b ** (sx) * scale);
    }
    ctx.lineTo(w + 10, -h);

    //ctx.fillStyle = ctx.strokeStyle = '#04f';
    ctx.fill();

    //ctx.fillStyle = ctx.strokeStyle = '#02c';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-10, 2*h);
    for (let x = -10; x < w + 10; x++) {
	const sx = (x-w/2) / scale;
	ctx.lineTo(x, h/2 + b ** (sx) * scale);
    }
    ctx.lineTo(w + 10, 2*h);

    //ctx.fillStyle = ctx.strokeStyle = '#04f';
    ctx.fill();

    //ctx.fillStyle = ctx.strokeStyle = '#02c';
    ctx.stroke();



    ctx.beginPath();
    ctx.arc(w/2, h/2, r * scale, 0, Math.PI * 2);

    //ctx.fillStyle = ctx.strokeStyle = '#d02';
    ctx.fill();

    //ctx.fillStyle = ctx.strokeStyle = '#b01';
    ctx.stroke();



    requestAnimationFrame(draw);
}

draw();
