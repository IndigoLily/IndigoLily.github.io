const cnv = document.body.appendChild(document.createElement('canvas'));
const ctx = cnv.getContext('2d');

function ease(t, p) {
    if (t < 0.5) {
	return (2*t)**p / 2;
    } else {
	return 1 - (2-2*t)**p/2;
    }
}

const r = (3 - Math.sqrt(3))/4;

function swap(arr, idx1, idx2) {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
}

let w,h,
    t = 0
    clrs = ['#f00', '#0f0', '#00f'],
    pIdx = 0;
function resize() {
    w = cnv.width  = window.innerWidth;
    h = cnv.height = window.innerHeight;
    const scale = Math.min(w,h)/4;
    ctx.translate(w/2, h/2);
    ctx.scale(scale, scale);
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
    const _t = ease(t, 3);

    {
	ctx.fillStyle = clrs[(pIdx+2)%3];
	const p = stillPoint();
	ctx.beginPath();
	ctx.arc(p.x, p.y, r, 0, Math.PI*2);
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
	ctx.arc(p.x, p.y, r, 0, Math.PI*2);
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
	ctx.arc(p.x, p.y, r, 0, Math.PI*2);
	ctx.fill();
    }
}

let lastTime = Date.now();
function drawFrame() {
    const min = Math.min(w,h);
    ctx.clearRect(-min/2,-min/2,min,min);

    let now = Date.now();
    t += (now-lastTime)/1500;
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
