const w = 20;
const h = 20;

const container = document.createElement('div');
container.id = 'container';
document.body.append(container);

let dots = new Array(w);
let speeds = [];
let voff = 0;

for (let i = 0; i < h; i++) {
  dots[i] = new Array(w);

  let row = document.createElement('div');

  row.classList.add('row');
  container.append(row);

  for (let j = 0; j < w; j++) {
    let dot = document.createElement('div');
    dot.classList.add('dot');
    row.append(dot);
    dots[i][j] = dot;

    speeds[i * w + j] = (Math.random() + 1) / 2;
  }
}

function draw(start = true) {
  let milli = Date.now();
  let offsum = 0;

  for (let i = 0; i < h; i++) {
    for (let j = 1; j < w; j++) {
      let offset = Math.sin(milli * speeds[i * w + j] * 0.003) + 1;
      offsum += offset;
      dots[i][j].style.marginLeft = offset + 'vmin';
    }
  }

  let off = offsum/w/w;
  voff = start ? off : lerp(voff, off, 0.1);
  document.querySelectorAll('.row + .row')
    .forEach(row => row.style.marginTop = voff + 'vmin');

  requestAnimationFrame(()=>draw(false));
}

draw();

function lerp(a, b, c) {
  return a + (b-a) * c;
}
