const cnv  = document.getElementById('cnv'),
      c    = cnv.getContext('2d');

const PI   = Math.PI,
      TAU  = PI * 2,
      sin  = Math.sin,
      cos  = Math.cos,
      abs  = Math.abs,
      sqrt = Math.sqrt,
      min  = Math.min,
      max  = Math.max;

function choose(array) {
    return array[Math.floor(Math.random()*array.length)];
}

const L = 0;
const R = 1;

var triB, triH;

function tri(tx, ty, lr, glow) {
    let x0, y0, x1, y1, x2, y2;

    x0 = (tx + lr) * triB + ty * triB / 2;
    y0 = ty * triH;

    if (lr == L) {
        x1 = x0 + triB;
        y1 = y0;

        x2 = x0 + triB/2;
        y2 = y0 + triH;
    } else {
        x1 = x0 - triB/2;
        y1 = y0 + triH;

        x2 = x0 + triB/2;
        y2 = y0 + triH;
    }

    const rand = Math.random();
    if (glow) {
        c.shadowBlur = 30;
        c.shadowColor = '#fff';
        c.fillStyle = '#fff';
    } else if (rand < opt['Colour chance']/100) {
        c.fillStyle = choose([opt['c0'], opt['c1'], opt['c2'], opt['c3']]);
    } else {
        c.fillStyle = `hsl(0, 0%, ${Math.random()*50}%)`;
    }
    c.strokeStyle = c.fillStyle;
    //c.strokeStyle = '#f0f';

    c.beginPath();
    c.moveTo(x0, y0);
    c.lineTo(x1, y1);
    c.lineTo(x2, y2);
    if (opt['Width'] < 20) c.closePath();
    c.fill();
    c.stroke();
}

const gui = new dat.GUI();
const opt = {};

opt['Draw'] = draw;
gui.add(opt, 'Draw');

opt['Width'] = 80;
const width_ctrl = gui.add(opt, 'Width').min(sqrt(2));
width_ctrl.onChange(draw);

opt['Tris'] = 10;
const tris_ctrl = gui.add(opt, 'Tris').min(1).step(1);
tris_ctrl.onChange(draw);

opt['Colour chance'] = 10;
gui.add(opt, 'Colour chance').min(0).max(100);

opt['Glow chance'] = 1;
gui.add(opt, 'Glow chance').min(0).max(100);

opt['c0'] = '#f04';
opt['c1'] = '#fd0';
opt['c2'] = '#0f4';
opt['c3'] = '#04f';
gui.addColor(opt, 'c0');
gui.addColor(opt, 'c1');
gui.addColor(opt, 'c2');
gui.addColor(opt, 'c3');



draw();

function draw() {
    const w = cnv.width  = innerWidth;
    const h = cnv.height = innerHeight;

    c.lineWidth = opt['Width'];

    triH = h/opt['Tris'];
    triB = triH / sin(TAU/6);

    const off = Math.random();

    for (let x = 0; x < Math.ceil(w/triB*2); ++x) {
        for (let y = 0; y < opt['Tris']; ++y) {
            for (let lr = L; lr <= R; ++lr) {
                tri(x - opt['Tris']/2 - off, y, lr);
            }
        }
    }

    for (let x = 0; x < Math.ceil(w/triB*2); ++x) {
        for (let y = 0; y < opt['Tris']; ++y) {
            for (let lr = L; lr <= R; ++lr) {
                if (Math.random() < opt['Glow chance']/100) {
                    tri(x - opt['Tris']/2 - off, y, lr, true);
                }
            }
        }
    }
}
