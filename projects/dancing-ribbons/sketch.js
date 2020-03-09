const cnv = document.body.appendChild(document.createElement('canvas'));
const c = cnv.getContext('2d');
let width, height;
let xor = false;
function resize() {
    width = cnv.width = window.innerWidth;
    height = cnv.height = window.innerHeight;
    c.lineWidth = height/20;
    c.lineCap = 'round';
    c.globalCompositeOperation = xor?'xor':'screen';
};
resize();
window.addEventListener('resize', resize);

window.addEventListener('click', e => {
    xor = !xor;
    resize();
});

let off = 0;
const speed = 1/(2**5);
const xrate = 1/(2**9);

const phase = 6/7;
const wave1 = Math.sin;
const wave2 = n => Math.sin(n*phase);

draw();
function draw() {
    c.clearRect(0, 0, width, height);

    c.strokeStyle = `hsl(${10+0-off}, 100%, 50%)`;
    c.beginPath();
    for(let x = width/10; x < width - width/10; x += 2) {
        let y = wave1(off-x*xrate) * height/4;
        c.lineTo(x, y + height/2);
    }
    c.stroke();

    c.strokeStyle = `hsl(${10+(xor?180:240)-off}, 100%, 50%)`;
    c.beginPath();
    for(let x = width/10; x < width - width/10; x += 2) {
        let y = wave2(off-x*xrate) * height/4;
        c.lineTo(x, y + height/2);
    }
    c.stroke();

    c.strokeStyle = `hsl(${10+120-off}, 100%, ${xor?100:50}%)`;
    c.beginPath();
    for(let x = width/10; x < width - width/10; x += 2) {
        let y = (wave1(off-x*xrate) + wave2(off-x*xrate)) * height/8;
        c.lineTo(x, y + height/2);
    }
    c.stroke();

    off += speed;

    requestAnimationFrame(draw);
}
