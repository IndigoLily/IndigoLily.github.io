const sin   = Math.sin,
      cos   = Math.cos,
      sqrt  = Math.sqrt,
      PI    = Math.PI,
      PHI   = (1+sqrt(5))/2,
      RT2   = sqrt(2);

const cnv  = document.getElementById('cnv'),
      c    = cnv.getContext('2d');

let   w    = cnv.width  = innerWidth,
      h    = cnv.height = innerHeight;

window.addEventListener('resize', () => {
    w = cnv.width  = innerWidth;
    h = cnv.height = innerHeight;
});

function xy(x=0,y=0) {
    return {x, y};
}

let rn = 0;
let rns = [];
function rand() {
    if (rn >= rns.length) {
        rns.push(Math.random());
    }
    return rns[rn++];
}

const start = Date.now();
let now = 0;

const maxLvl = 9;
const rects = 2**(maxLvl+1);

function makeBoxes(p0, p1, p2, p3, t, lvl = 0) {
    if (lvl > maxLvl) {
        c.fillStyle = `hsl(${rn/rects*45 - now*15},100%,${40 + rand()*50}%)`;
        c.beginPath();
        c.lineTo(p0.x, p0.y);
        c.lineTo(p1.x + 1, p1.y);
        c.lineTo(p2.x + 1, p2.y + 1);
        c.lineTo(p3.x, p3.y + 1);
        c.fill();
        return;
    }

    const _w = p1.x - p0.x;
    const _h = p3.y - p0.y;

    const mid = xy((p0.x+p1.x)/2, (p0.y+p3.y)/2);

    // 0---A---1
    // |nw |ne |
    // D---E---B
    // |sw |se |
    // 3---C---2
    //
    // 0---A---1
    // |l  |r  |
    // D   E   B
    // |   |   |
    // 3---C---2
    //
    // 0---A---1
    // |t      |
    // D---E---B
    // |b      |
    // 3---C---2

    const E = xy(mid.x + cos(t)*_w/4, mid.y + cos(t)*_h/4);
    const A = xy(E.x, p0.y);
    const B = xy(p1.x, E.y);
    const C = xy(E.x, p3.y);
    const D = xy(p0.x, E.y);

    /*
    const nw = [p0, A, E, D];
    const ne = [A, p1, B, E];
    const se = [E, B, p2, C];
    const sw = [D, E, C, p3];
    
    makeBoxes(...nw, t*PI/3       , lvl+1);
    makeBoxes(...ne, t*RT2/1.35   , lvl+1);
    makeBoxes(...sw, t*PHI/1.55   , lvl+1);
    makeBoxes(...se, t*PHI*PI/4.85, lvl+1);
    */

    if (lvl % 2 == +(h>w)) {
        const l = [p0, A, C, p3];
        const r = [A, p1, p2, C];
        makeBoxes(...l, t*PI/3    , lvl+1);
        makeBoxes(...r, t*PHI/1.55, lvl+1);
    } else {
        const tp = [p0, p1, B, D];
        const bt = [D, B, p2, p3];
        makeBoxes(...tp, t*PI/3    , lvl+1);
        makeBoxes(...bt, t*PHI/1.55, lvl+1);
    }
}

function draw(frame = 0) {
    now = (Date.now()-start)/3000 + 360000;
    rn = 0;

    makeBoxes(xy(0,0), xy(w,0), xy(w,h), xy(0,h), now);

    requestAnimationFrame( () => draw(frame + 1) );
}

draw();
