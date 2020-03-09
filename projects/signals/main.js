import { Noise } from './lib/noise.mjs';
import { Interpolate } from './lib/interpolate.mjs';
const { sin, cos, abs, sqrt, min, max, PI } = Math;
const TAU   = PI * 2,
      PHI   = (1+sqrt(5))/2,
      RT2   = sqrt(2);

const container = document.getElementById('container');
const cnv1  = container.appendChild(document.getElementById('left')),
      cnv2  = container.appendChild(document.getElementById('mid')),
      cnv3  = container.appendChild(document.getElementById('right')),
      c1    = cnv1.getContext('2d'),
      c2    = cnv2.getContext('2d'),
      c3    = cnv3.getContext('2d');

let w,h,size;
function resize() {
    size = Math.min(Math.floor(innerHeight/2), Math.floor(innerWidth/4));
    cnv1.width = cnv1.height = cnv2.width = cnv2.height = cnv3.width = cnv3.height = size;
    c1.translate(0, size/2);
    c2.translate(size/2, size/2);
    c3.translate(0, size/2);
    c1.strokeStyle = c1.fillStyle = c2.strokeStyle = c2.fillStyle = c3.strokeStyle = c3.fillStyle = '#fff';
    c1.lineWidth = c2.lineWidth = c3.lineWidth = sqrt(2);
}
resize();
window.addEventListener('resize', resize);



const noise1 = new Noise();
const noise2 = new Noise();
const noise3 = new Noise();
const speeds = [];
for (let i = 0; i < 24; i++) {
    speeds[i] = Math.random()*2 + 1;
}

function draw(frame = 0) {
    c1.clearRect(0, -size/2, size, size);
    c2.clearRect(-size/2, -size/2, size, size);
    c3.clearRect(0, -size/2, size, size);

    c1.beginPath();
    for (let i = 0; i <= size*3; i++) {
        const y = (noise1.at(frame/16 + (i/size/3)**3 * 16) * 2 - 1) * size / 4;
        c1.lineTo(i/3, y);
    }
    c1.stroke();

    c3.beginPath();
    for (let i = 0; i <= size*3; i++) {
        const y = (noise3.at(frame/16 + (i/size/3)**3 * 16) * 2 - 1) * size / 4;
        c3.lineTo(size - i/3, y);
    }
    c3.stroke();

    /*
    const circle = new Path2D();
    for (let i = 0; i <= size; i++) {
        const amp = (noise2.at(frame/64 + (i/size) * 32) * 2 - 1) * size / 16;
        const x = cos(i/size * Math.PI + Math.PI/2) * (size / 3 + amp);
        const y = sin(i/size * Math.PI + Math.PI/2) * (size / 3 + amp);
        circle.lineTo(x, y);
    }
    c2.scale(-1, 1);
    c2.stroke(circle);
    c2.scale(-1, 1);
    c2.stroke(circle);
    */

    c2.beginPath();
    const amps = [];
    for (let i = 0; i < speeds.length + 3; i++) {
        amps[i] = size/3 + sin(speeds[i % speeds.length] * frame / 60) * size / 48;
        if (i >= 3) {
            const seglen = (TAU * size / 3) / speeds.length;
            for (let j = 0; j < seglen; j++) {
                const amp = Interpolate.cubic(amps[i-3], amps[i-2], amps[i-1], amps[i], j/seglen)
                const a = (i-3 + j/seglen)/speeds.length * Math.PI * 2;
                const x = cos(frame/600 + a) * amp;
                const y = sin(frame/600 + a) * amp;
                c2.lineTo(x, y);
            }
        }
        // circumference = TAU * size / 3
        // length of one segment = circumference / speeds.length
        // 
    }
    c2.closePath();
    c2.stroke();

    requestAnimationFrame( () => draw(frame + 1) );
}

draw();
