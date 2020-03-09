import { Rand } from './lib/random.mjs';
import { Vec } from './lib/vec.mjs';
const { sin, cos, abs, sqrt, min, max, PI } = Math;
const TAU   = PI * 2,
      PHI   = (1+sqrt(5))/2,
      RT2   = sqrt(2);

const cnv  = document.body.appendChild(document.createElement('canvas')),
      c    = cnv.getContext('2d');

function setClr(colour) {
    c.fillStyle = c.strokeStyle = colour;
}

const clr = {
    ccwt:   '#f00',
    ccwm:   '#0f0',
    hull:   '#00f',
    curr:    '#fff',
    inside: '#444',
};

let w,h,
    timer,wait,done,
    number=3/2,points,hull,curr,
    level,history,
    ccwm,ccwmv,ccwt;
resize();
function resize() {
    w = cnv.width  = innerWidth;
    h = cnv.height = innerHeight;
    c.lineWidth = 2;
    setup();
}
window.addEventListener('resize', resize);

function cross(a,b) {
    return a.x*b.y - a.y*b.x;
}

function setup() {
    clearTimeout(timer);

    level = 0;
    history = [];
    done = false;
    number *= 2;

    points = [];
    for (let i = 0; i < number; i++) {
        points[i] = new Vec(
            w/2 + Rand.gaussian()/10*min(w,h),
            h/2 + Rand.gaussian()/10*min(w,h)
        );
    }
    points.sort((a,b) => a.x - b.x);

    curr = 0;
    hull = [0];

    ccwm = 1; // counterclockwisemost
    ccwmv = Vec.sub(points[ccwm], points[curr]);
    ccwt = ccwm; // ccw test, the point ccwm is tested against

    wait = 2000/number;
    step();
}

window.addEventListener('dblclick', setup);

function drawHull(close = false) {
    setClr(clr.hull);

    for (let lvl = 0; lvl < level; lvl++) {
        c.beginPath();
        for (let i = 0; i < history[lvl].length; i++) {
            c.lineTo(history[lvl][i].x, history[lvl][i].y);
        }
        c.closePath();
        c.stroke();
    }

    c.beginPath();
    for (let i = 0; i < hull.length; i++) {
        c.lineTo(points[hull[i]].x, points[hull[i]].y);
    }
    if (close) c.closePath();
    c.stroke();
}

function drawPoints() {
    if (ccwt < points.length) {
        setClr(clr.ccwt);
        c.beginPath();
        c.moveTo(points[curr].x, points[curr].y);
        c.lineTo(points[ccwt].x, points[ccwt].y);
        c.stroke();
    }

    setClr(clr.ccwm);
    c.beginPath();
    c.moveTo(points[curr].x, points[curr].y);
    c.lineTo(points[ccwm].x, points[ccwm].y);
    c.stroke();

    for (let i = 0; i < points.length; i++) {
        if      (i === curr)       setClr(clr.curr);
        else if (i === ccwm)       setClr(clr.ccwm);
        else if (i === ccwt)       setClr(clr.ccwt);
        else if (hull.includes(i)) setClr(clr.hull);
        else                       setClr(clr.inside);
        c.beginPath();
        c.arc(points[i].x, points[i].y, 4, 0, TAU);
        c.fill();
    }
}

function step() {
    c.clearRect(0,0,w,h);

    if (done) {
        drawHull(true);
        next();
        return;
    }
    
    ccwt++;
    while (hull.includes(ccwt) || ccwt === curr) ccwt++;

    if (ccwt >= points.length) {
        drawHull();
        drawPoints();

        if (ccwm === 0) {
            done = true;
            timer = setTimeout(step, max(200,wait*2.5));
            return;
        }

        curr = ccwm;
        hull.push(curr);

        ccwm = 0;
        ccwt = 0;
        if (hull.length <= 2) {
            while (hull.includes(ccwm) || ccwm === curr) ccwm++;
            while (hull.includes(ccwt) || ccwt === curr) ccwt++;
        }
        ccwmv = Vec.sub(points[ccwm], points[curr]);

        timer = setTimeout(step, max(200,wait*2.5));
        return;
    } else {
        drawHull();
        drawPoints();
    }

    const ccwtv = Vec.sub(points[ccwt], points[curr]);
    if (cross(ccwtv, ccwmv) > 0) {
        ccwm = ccwt;
        ccwmv = ccwtv;
    }

    timer = setTimeout(step, wait);
}

function next() {
    //debugger;
    done = false;

    history[level++] = hull.map(i => points[i]);
    points = points.filter((_,p) => !hull.includes(p));
    if (points.length < 3) {
        hull = [];
        drawHull(true);
        timer = setTimeout(setup, 1000*level);
        return;
    }

    curr = 0;
    hull = [0];

    ccwm = 1;
    ccwmv = Vec.sub(points[ccwm], points[curr]);
    ccwt = ccwm;

    step();
}
