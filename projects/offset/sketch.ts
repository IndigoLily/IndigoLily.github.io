import {resize, circle} from './svg.js';

const len = 28; // Amount of circles per side of square
const area = len * len; // Total amount of circles

const maxWidth = 300 / 4;
const offsetRatio = 2 / 3;
const radius = maxWidth / 2 / (len + offsetRatio * len - offsetRatio);
(document.getElementById("css") as HTMLStyleElement).sheet?.insertRule(`circle { r: ${radius}% }`);

const circles = new Array<SVGElement>();
const speeds = new Array<number>();
for (let y = 0; y < len; y++) {
  for (let x = 0; x < len - 1; x++) {
    circles.push(circle());
    speeds.push(Math.random() + 1);
  }

  circles.push(circle());
}

function draw(t: number) {
  t /= 1000;

  resize();

  let vertOffset = 0;

  for (let y = 0; y < len; y++) {
    let offsets = new Array<number>();
    let width = 2 * radius * (len - 1);

    for (let x = 0; x < len - 1; x++) {
      const offset = (0.5 - 0.5 * Math.cos(t * speeds[(len - 1) * y + x])) * radius * 2 * offsetRatio;
      width += offset;
      offsets.push(offset);
      vertOffset += offset;
    }

    let offset = 50 - width / 2;
    for (let x = 0; x < len; x++) {
      circles[y * len + x].setAttribute("cx", `${offset}%`);
      offset += radius * 2 + offsets[x];
    }
  }

  vertOffset /= area;
  const height = (2 * radius + vertOffset) * (len - 1);
  let offset = 50 - height / 2;
  for (let y = 0; y < len; y++) {
    const cy = offset + (2 * radius + vertOffset) * y;
    for (let x = 0; x < len; x++) {
      circles[y * len + x].setAttribute("cy", `${cy}%`);
    }
  }

  requestAnimationFrame(draw);
}

draw(0);
