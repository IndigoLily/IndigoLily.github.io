const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

var width  = canvas.width  = window.innerWidth;
var height = canvas.height = window.innerHeight;

window.addEventListener('resize', resize);

var should_redraw = false;

var circles = [];



const gui = new dat.GUI();
const opt = {};

opt['Restart'] = resize;
gui.add(opt, 'Restart');

opt['Multiplier'] = 0.5;
const sep = gui.add(opt, 'Multiplier').min(0).max(2);
sep.onChange(resize);

opt['Speed'] = 1;
gui.add(opt, 'Speed').min(0).step(1);

opt['Shadow'] = true;
const shadow = gui.add(opt, 'Shadow');
shadow.onChange(() => should_redraw = true);

opt['Random colours'] = function() {
  clr1.setValue(randColour());
  clr2.setValue(randColour());
  clr3.setValue(randColour());
  clr4.setValue(randColour());
};
gui.add(opt, 'Random colours');

const clr = gui.addFolder('Colours');

var COLOURS = ['#ef3340', '#06f', '#fff', '#111'];
opt['Colour 1'] = COLOURS[0];
opt['Colour 2'] = COLOURS[1];
opt['Colour 3'] = COLOURS[2];
opt['Colour 4'] = COLOURS[3];

const clr1 = clr.addColor(opt, 'Colour 1');
const clr2 = clr.addColor(opt, 'Colour 2');
const clr3 = clr.addColor(opt, 'Colour 3');
const clr4 = clr.addColor(opt, 'Colour 4');
clr1.onChange(clr => {COLOURS[0] = clr; should_redraw = true;});
clr2.onChange(clr => {COLOURS[1] = clr; should_redraw = true;});
clr3.onChange(clr => {COLOURS[2] = clr; should_redraw = true;});
clr4.onChange(clr => {COLOURS[3] = clr; should_redraw = true;});



const PI = Math.PI;
const TAU = PI * 2;

c.shadowColor = 'rgba(0, 0, 0, 0.5)';

function redraw() {
    c.clearRect(0, 0, width, height);
    circles.forEach(circle => drawQuadrants(circle));
}

function randColour() {
  let r = (Math.random()*16|0).toString(16),
      g = (Math.random()*16|0).toString(16),
      b = (Math.random()*16|0).toString(16);
  if (Math.random() > .2) return '#'+r+g+b;
  else return '#'+r+r+r;
}

function resize() {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
  circles = [];
}

function shuffle(array) {
  let copy = [...array], out = [];
  while(copy.length) {
    let choice = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(choice, 1)[0]);
  }
  return out;
}

function drawQuadrants(circle) {
  c.save();
  c.translate(circle.x, circle.y);
  c.rotate(circle.a);
  for(let i = 0; i < 4; i++) {
    c.strokeStyle = c.fillStyle = COLOURS[circle.c[i]];
    c.shadowBlur = circle.r**0.5;
    c.shadowColor = opt['Shadow'] ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)';
    let a = TAU/4 * i;

    c.beginPath();
    c.arc(0, 0, Math.max(circle.r - c.lineWidth / 2, 0), a, a + TAU/4);
    c.lineTo(0, 0);
    c.fill();
    c.shadowBlur = 0;
    c.stroke();
  }
  c.restore();
}

function dist(x1, y1, x2, y2) {
  return Math.hypot(x1-x2, y1-y2);
}

function draw() {
  if (should_redraw) {
      redraw();
      should_redraw = false;
  }

  for(let i = 0; i < opt['Speed']; i++) {
    let x = Math.random() * width,
        y = Math.random() * height,
        a = Math.random() * TAU,
        c = shuffle([0, 1, 2, 3]);

    let min = Infinity;
    for(let j = 0; j < circles.length; j++) {
      let it = circles[j];
      let d = dist(it.x, it.y, x, y);
      if (it.r > d) {
        j = -1;
        min = Infinity;
        x = Math.random() * width;
        y = Math.random() * height;
        continue;
      }
      if (d - it.r < min) min = d - it.r;
    }

    if (x < min) min = x;
    if (width - x < min) min = width - x;
    if (y < min) min = y;
    if (height - y < min) min = height - y;

    r = min * opt['Multiplier'];

    let circle = {x, y, r, a, c};
    drawQuadrants(circle);
    circles.push(circle);
  }

  requestAnimationFrame(draw);
}

draw();
