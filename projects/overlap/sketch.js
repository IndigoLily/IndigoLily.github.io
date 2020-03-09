const cnv  = document.getElementById('cnv'),
      c    = cnv.getContext('2d');

let   w    = cnv.width  = innerWidth,
      h    = cnv.height = innerHeight;

window.addEventListener('resize', () => {
    w = cnv.width  = innerWidth;
    h = cnv.height = innerHeight;
});

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





var waves = [[],[]];

const opt = {};
const gui = new dat.GUI();

(opt['Reseed'] = function() {
    waves = [[],[]];
    for (let i = 0; i < 10; i++) {
        waves[0].push({w: +Math.random(), h: Math.random(), s: Math.random() + 0.5})
        waves[1].push({w: -Math.random(), h: Math.random(), s: Math.random() + 0.5})
    };
})();

opt['BG'] = cnv.style.backgroundColor = '#fff';
opt['Top'] = '#0f8';
opt['Bottom'] = '#f04';

gui.add(opt, 'Reseed');

const BG = gui.addColor(opt, 'BG');
BG.onChange(col => {
    cnv.style.backgroundColor = col;
});

gui.addColor(opt, 'Top');
gui.addColor(opt, 'Bottom');





function wave(x, t, n) {
    x /= 20;
    t /= 20;
    let out = 0;
    for (let i = 0; i < waves[n].length; i++) {
        out += sin(x * waves[n][i].w + t * waves[n][i].s) * waves[n][i].h;
    }
    return h/3/waves[n].length * out;
}

draw();

function draw(frame = 0) {
    c.clearRect(0, 0, w, h);

    c.globalCompositeOperation = 'source-over';
    c.fillStyle = opt['Top'];
    c.beginPath();
    c.lineTo(0, 0);
    for (let x = 0; x <= w; x++) {
        c.lineTo(x, h/2 + wave(x, frame, 0));
    }
    c.lineTo(w, 0);
    c.fill();

    c.globalCompositeOperation = 'difference';
    c.fillStyle = opt['Bottom'];
    c.beginPath();
    c.lineTo(0, h);
    for (let x = 0; x <= w; x++) {
        c.lineTo(x, h/2 + wave(x, frame, 1));
    }
    c.lineTo(w, h);
    c.fill();

    requestAnimationFrame( () => draw(frame + 1) );
}
