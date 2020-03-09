"use strict";
const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

var w, h, r1, r2;

var speeds = [];
for (let i = 0; i < 100; i++) {
  speeds[i] = Math.random() + 1;
}

window.addEventListener('load', () => {
  w = canvas.width  = innerWidth;
  h = canvas.height = innerHeight;

  c.strokeStyle = '#fff';
  c.lineWidth = sqrt2;
  c.translate(w/2, h/2);

  r1 = Math.min(w,h)/2.5;
  r2 = Math.min(w,h)/8;

  draw();
});

window.addEventListener('resize', () => {
  w = canvas.width  = innerWidth;
  h = canvas.height = innerHeight;

  c.strokeStyle = '#fff';
  c.lineWidth = sqrt2;
  c.translate(w/2, h/2);

  r1 = Math.min(w,h)/2.5;
  r2 = Math.min(w,h)/8;
});

function calcOffs(_w = 1, _s = speeds) {
  let t = Date.now();
  let offs = _s.map(s => sin(t * s * 0.0005) + 2);
  let sum = offs.reduce((sum, n) => sum + n, 0);
  //return offs.map(n => 1/offs.length * _w); // evenly spaced for debugging
  return offs.map(n => n / sum * _w);
}

function polToCart(a, r) {
  return [sin(a) * r, Math.cos(a) * r];
}

const phi = (1+Math.sqrt(5))/2;
const sqrt2 = Math.sqrt(2);
const sin = Math.sin;

function chaoticWave(x) {
  return (sin(x) + sin(Math.PI * x) + sin(sqrt2 * x) + sin(phi * x))/4 * Math.PI*2;
}

function draw() {
  c.clearRect(-w/2,-h/2,w,h);

  c.beginPath();
  c.arc(0, 0, r1, 0, Math.PI*2);
  c.stroke();

  c.beginPath();
  c.arc(0, 0, r2, 0, Math.PI*2);
  c.stroke();

  let offs = calcOffs(Math.PI*2);
  let total = 0;
  for (let i = 0, len = offs.length; i < len; i++) {
    c.beginPath();
    c.moveTo(...polToCart(offs[i] + total + chaoticWave(Date.now()/80000), r1));
    c.lineTo(...polToCart(offs[i] + total + chaoticWave(Date.now()/80000), r2));
    c.stroke();
    total += offs[i];
  }

  requestAnimationFrame(draw);
}
