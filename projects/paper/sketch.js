const cnv = document.getElementById('cnv'),
      c   = cnv.getContext('2d');

// the number of things with an offset
const n = 12;

var speeds;
var col;
initialize();

window.onload = render;
window.onclick = initialize;

const start = Date.now();
function render() {
    let t = (Date.now() - start) / 10;

    let w = cnv.width  = innerWidth,
        h = cnv.height = innerHeight;

    c.shadowBlur = 30;
    c.shadowColor = '#0006';

    let paths = new Array(n);
    for (let i = 0; i < n; i++) {
        paths[i] = new Path2D();
    }

    let offsets, total, off;
    for (let x = -10; x < w + 10; x++) {

        offsets = speeds.map( speed => sin((x+t*speed*20) * speed/h*100) + 0.8 );
        total = sum(offsets);

        // squish into screen height
        for (let i = 0; i < n; i++) {
            offsets[i] /= total;
            offsets[i] *= h;
        }

        off = 0;
        for (let i = 0; i < n; i++) {
            paths[i].lineTo(x, offsets[i] + off);
            off += offsets[i];
        }
    }

    for (let i = 0; i < n; i++) {
        if (i == 0) {
            c.fillStyle = hsl(i);
            c.fillRect(0, 0, w, h);
        }
        c.fillStyle = hsl(i + 1);
        c.strokeStyle = c.fillStyle;

        paths[i].lineTo(w, h);
        paths[i].lineTo(0, h);
        paths[i].closePath();
        c.fill(paths[i]);
    }

    requestAnimationFrame(render);
}

function hsl(i) {
    return `hsl(${ (i/n*60+col) | 0}, 100%, 65%)`;
}

const sin = Math.sin;
const sum = array => array.reduce((sum, n) => sum + n, 0);

function initialize() {
    col = Math.random() * 360;
    speeds = new Array(n);
    for (let i = 0; i < n; i++) {
        speeds[i] = Math.random() / 15;
    }
}
