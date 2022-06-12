const cnv = document.body.appendChild(document.createElement('canvas'));
const ctx = cnv.getContext('2d')!;

function thueMorse(n: number): boolean {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("Must be a non-negative integer");
  }

  let ones = 0;
  while (n > 0) {
 /* maybe replace with
    ones += n & 1; */
    ones += n % 2;
    n >>>= 1;
  }

  return ones % 2 === 0;
}

const rings = 24;
let idx = 0;
let vals: Array<boolean> = [];
for (; idx < rings; idx++) {
  vals.push(thueMorse(idx));
}

let width:  number,
    height: number,
    scale:  number;

let needsResize = true;

function resize() {
  needsResize = false;

  width = cnv.width = window.innerWidth + 1;
  height = cnv.height = window.innerHeight + 1;
  scale = Math.hypot(width, height) / 2 / (rings - 1);
}

window.onload = () => requestAnimationFrame(draw);
window.addEventListener('resize', () => { needsResize = true; });

const start = performance.now();

function draw(now: number) {
  const t = (now - start) / 1000;
  const offset = t % 1 - 1;

  const newIdx = rings + Math.floor(t);
  const idxDif = newIdx - idx;
  vals.splice(0, idxDif);
  for (; idx < newIdx; idx++) {
    vals.push(thueMorse(idx));
  }

  if (needsResize) {
    resize();
  } else {
    // this is done automatically if resize happens
    ctx.resetTransform();
  }

  ctx.clearRect(0, 0, width, height);
  ctx.translate(width / 2, height / 2);
  ctx.scale(scale, scale);

  ctx.beginPath();
  for (let i = 0; i < rings; i++) {
    if (vals[i]) {
      const outer = rings - i + offset;
      const inner = outer - 1;

      ctx.arc(0, 0, outer, 0, Math.PI * 2, false);

      if (inner > 0) {
        if (vals[i+1]) {
          // next value is also black
          // handle it here, and skip the white that is necessarily after it
          i += 2;
          const newInner = inner - 1;
          if (newInner > 0) {
            // double width ring
            ctx.arc(0, 0, newInner, 0, Math.PI * 2, true);
          } else {
            // circle, not ring
          }
        } else {
          // normal ring
          ctx.arc(0, 0, inner, 0, Math.PI * 2, true);
        }
      } else {
        // circle, not ring
        // and no more rings after this
        break;
      }
    }
  }
  ctx.fill();

  requestAnimationFrame(draw);
}
