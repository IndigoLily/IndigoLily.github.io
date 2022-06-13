import {random, TAU, strengthBase, circle, innerRadius, outerRadius, perpendicularBias} from "./common.js";
import {Particle} from "./particle.js";

const {cos, sin, min} = Math;

let debug = false;
let heldKeys = new Set();
window.addEventListener('keydown', ({key}) => {
  heldKeys.add(key);
  if ((heldKeys.has('h') || heldKeys.has(';')) && heldKeys.has('j') && heldKeys.has('k') && heldKeys.has('l')) {
    debug = !debug;
  }
});
window.addEventListener('keyup', ({key}) => {
  heldKeys.delete(key);
});

const cnv = document.body.appendChild(document.createElement("canvas"));
const ctx = cnv.getContext("2d")!;

const steps = 10;

const particles: Array<Particle> = [];

let needsResize = true;
window.addEventListener("resize", () => needsResize = true);

function resize() {
  needsResize = false;

  const [w, h] = [cnv.width, cnv.height] = [window.innerWidth, window.innerHeight];

  ctx.translate(w / 2, h / 2);

  const scale = min(w, h);
  ctx.scale(scale, scale);

  ctx.fillStyle = '#fff';
}

window.onload = () => {
  let last = performance.now();

  // reset time when switching back to tab, so physics don't do a huge jump
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      last = performance.now();
    }
  });

  window.addEventListener('mousedown', ({button}) => {
    if (button === 0) {
      for (const p of particles) {
        const a = random(0, TAU);
        const str = random(0, 0.001, 8);
        p.vel.x += cos(a) * str;
        p.vel.y += sin(a) * str;
      }
    }
  });

  //let firstHasDied = false;

  requestAnimationFrame(drawFrame);
  function drawFrame() {
    if (needsResize) {
      resize();
    }

    ctx.save();
    ctx.resetTransform();
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.restore();

    //if (!firstHasDied) {
    //  particles.push(new Particle());
    //}

    while (random() < 1 / particles.length**0.15) {
      particles.push(new Particle());
    }

    const now = performance.now();
    const dt = now - last;
    last = now;

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      for (let u = 0; u < steps; u++) {
        p.updt(dt / steps);
      }

      if (p.age >= Particle.maxAge) {
        //firstHasDied = true;
        //p.reset();
        particles.splice(i,1);
        continue;
      }

      p.draw(ctx);
    }

    if (debug) {
      ctx.globalAlpha = 1;
      ctx.save();

      ctx.lineWidth = strengthBase - 0.999;
      ctx.strokeStyle = '#0f0';
      circle(ctx, 0, 0, innerRadius, "stroke");

      ctx.strokeStyle = '#00f';
      circle(ctx, 0, 0, outerRadius, "stroke");

      { // draw perpendicularBias
        ctx.lineWidth = 0.003;
        ctx.fillStyle = ctx.strokeStyle = '#f00';

        ctx.translate((innerRadius + outerRadius) / 2, 0);
        ctx.rotate(TAU / 4);

        ctx.beginPath();
        ctx.arc(0, 0, 0.1, -TAU / 4 / perpendicularBias, TAU / 4 / perpendicularBias);
        ctx.lineTo(0, 0);
        ctx.closePath()
        ctx.stroke();
      }

      ctx.restore();
    }

    requestAnimationFrame(drawFrame);
  }

  console.debug("initialization done");
};
