const cnv = document.getElementById('cnv');
const c   = cnv.getContext('2d');
const w   = cnv.width  = Math.min(innerWidth, innerHeight) - 100;
const h   = cnv.height = w;

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    collides(that) {
        if (this.r + that.r > Math.hypot(this.x - that.x, this.y - that.y)) {
            return true;
        }

        return false;
    }

    oob() {
        if (this.x - this.r < 0 || this.x + this.r > w || this.y - this.r < 0 || this.y + this.r > h) {
            return true;
        }
        
        return false;
    }
}

var circles = [];


const base_speed = Math.min(w, h) / 10000;
const acc = 1.1;
var curr_speed = base_speed;
var clicked = false;
var circle = null;
var dq = false;
var score = 0;

function replay() {
    document.getElementById('gameover').style.display = 'none';
    circles = [];
    curr_speed = base_speed;
    clicked = false;
    circle = null;
    dq = false;
    score = 0;

    c.clearRect(0, 0, w, h);
}

cnv.addEventListener('mousedown', e => {
    const [x, y] = [e.offsetX, e.offsetY];
    if (dq || clicked || (e.which < 1 || e.which > 3) || (x < 0 || x > w || y < 0 || y > h)) {
        return;
    }

    clicked = e.which;
    curr_speed = base_speed;

    circle = new Circle(x, y, base_speed);
    circles.push(circle);

    grow();
});

window.addEventListener('mouseup', e => {
    if (e.which != clicked) {
        return;
    }

    clicked = false;
});

cnv.addEventListener('contextmenu', e => {
    e.preventDefault();
});

const area = w * h;
function calcScore() {
    const circles_area = circles.reduce((acc, val) => acc + Math.PI*val.r*val.r, 0);
    return Math.ceil(circles_area / area * 100)**2;
}

const red = '#f00';
const black = '#000';

function grow() {
    c.clearRect(0, 0, w, h);

    curr_speed *= acc;
    circle.r += curr_speed;

    let collides = false;
    for (let i = 0, it; i < circles.length; i++) {
        it = circles[i];

        if (it.oob() || (it != circle && it.collides(circle)) || (it == circle && collides)) {
            collides = true;
            c.fillStyle = red;
            dq = true;
        } else {
            c.fillStyle = black;
        }

        c.beginPath();
        c.arc(it.x, it.y, it.r, 0, Math.PI * 2);
        c.fill();
    }

    if (clicked) {
        requestAnimationFrame(grow);
    } else if (!dq) {
        score = calcScore();
        console.log(score);
    } else {
        document.getElementById('gameover').style.display = 'block';
        document.getElementById('score').innerText = score;
        if (score > +localStorage.getItem('highscore')) {
            localStorage.setItem('highscore', score);
            document.getElementById('highscore').innerText = score;
        } else {
            document.getElementById('highscore').innerText = +localStorage.getItem('highscore');
        }
    }
}
