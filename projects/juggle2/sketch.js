const cnv = document.body.appendChild(document.createElement('canvas'));
const ctx = cnv.getContext('2d');

const r = (3 - Math.sqrt(3))/4;

function swap(arr, idx1, idx2) {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
}

let w,h,scale,
    t = 0
    clrs = ['hsl(0,0%,100%)', 'hsl(0,0%,50%)', 'hsl(0,0%,0%)'],
    pIdx = 0;
function resize() {
    w = cnv.width  = window.innerWidth;
    h = cnv.height = window.innerHeight;
    scale = Math.min(w,h)/5;
    ctx.translate(w/2, h/2);
    ctx.rotate(-Math.PI/2);
}
resize();
window.addEventListener('resize', resize);

function pivotTheta() {
    return (pIdx/3) * (Math.PI*2) + (Math.PI/3);
}

function getPivot() {
    const theta = pivotTheta();
    return { x: Math.cos(theta)/2, y: Math.sin(theta)/2 };
}

function stillPoint() {
    const p = getPivot();
    return {
	x: p.x * -2,
	y: p.y * -2,
    };
}

function draw() {
    const s = 5;
    const _t = (1 - Math.exp(-s * t)) / (1 - Math.exp(-s));

    for (let n = 0; n < 2; n++) {
	ctx.shadowBlur = n==0 ? 20 : 0;
	ctx.shadowColor = '#0004';

	{
	    ctx.fillStyle = clrs[(pIdx+2)%3];
	    const p = stillPoint();
	    ctx.beginPath();
	    ctx.arc(p.x * scale, p.y * scale, r * scale, 0, Math.PI*2);
	    ctx.fill();
	}

	{
	    const pivot = getPivot();
	    const theta = pivotTheta() - Math.PI/2 + Math.PI*_t;
	    const p = {
		x: pivot.x + Math.cos(theta) * Math.sqrt(3)/2,
		y: pivot.y + Math.sin(theta) * Math.sqrt(3)/2,
	    };

	    ctx.fillStyle = clrs[pIdx];
	    ctx.beginPath();
	    ctx.arc(p.x * scale, p.y * scale, r * scale, 0, Math.PI*2);
	    ctx.fill();
	}

	{
	    const pivot = getPivot();
	    const theta = pivotTheta() + Math.PI/2 + Math.PI*_t;
	    const p = {
		x: pivot.x + Math.cos(theta) * Math.sqrt(3)/2,
		y: pivot.y + Math.sin(theta) * Math.sqrt(3)/2,
	    };

	    ctx.fillStyle = clrs[(pIdx+1)%3];
	    ctx.beginPath();
	    ctx.arc(p.x * scale, p.y * scale, r * scale, 0, Math.PI*2);
	    ctx.fill();
	}
    }
}

let lastTime = Date.now();
function drawFrame() {
    const min = Math.min(w,h);
    ctx.clearRect(-min/2,-min/2,min,min);

    ctx.shadowBlur = 20;
    ctx.shadowColor = '#0004';
    ctx.fillStyle = 'hsl(0,0%,75%)';
    ctx.beginPath();
    ctx.arc(0, 0, (1/2 + Math.sqrt(3)/2 + r) * 1.2 * scale, 0, Math.PI*2);
    ctx.fill();

    let now = Date.now();
    t += (now-lastTime)/2000;
    lastTime = now;
    if (t >= 1) {
	t %= 1;
	const next = (pIdx + 1) % 3;
	swap(clrs, pIdx, next);
	pIdx = next;
    }
    draw();

    requestAnimationFrame(drawFrame);
}

drawFrame();
