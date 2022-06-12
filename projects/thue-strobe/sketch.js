"use strict";
const cnv = document.body.appendChild(document.createElement('canvas'));
const ctx = cnv.getContext('2d');
function thueMorse(n) {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Must be a non-negative integer");
    }
    let ones = 0;
    while (n > 0) {
        ones += n % 2;
        n >>>= 1;
    }
    return ones % 2 === 0;
}
const start = performance.now();
const speed = 1 / 1000;
let width, height, diag, tmWidth;
let needsResize = true;
function resize() {
    needsResize = false;
    width = cnv.width = window.innerWidth + 1;
    height = cnv.height = window.innerHeight + 1;
    diag = Math.hypot(width, height);
    tmWidth = diag / 64;
}
window.onload = () => requestAnimationFrame(draw);
window.addEventListener('resize', () => { needsResize = true; });
function draw(T) {
    const t = (T - start) * speed;
    if (needsResize) {
        resize();
    }
    else {
        ctx.resetTransform();
    }
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    let idx = t | 0, R, r;
    do {
        R = (t - idx) * tmWidth;
        r = R - tmWidth;
        if (thueMorse(idx)) {
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(0, R), 0, Math.PI * 2, true);
            ctx.arc(0, 0, Math.max(0, r - 1), 0, Math.PI * 2, false);
            ctx.fill();
        }
        idx -= 1;
    } while (idx >= 0 && r < diag / 2);
    requestAnimationFrame(draw);
}
