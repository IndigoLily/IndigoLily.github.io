const canvas = document.getElementById('cnv');
const c = canvas.getContext('2d');

let width  = canvas.width  = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width  = canvas.width  = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const maxLength = 5 * 20;
const minLength = maxLength / 2**.5;
const speed = Math.PI/3/120;

function draw() {
  c.setTransform(1,0,0,1,width/2,height/2);
  c.clearRect(-width/2, -height/2, width, height);
  c.fillStyle = '#000';

  let len = my.map(Math.sin(count*speed*4 + Math.PI/2), -1, 1, minLength, maxLength);
  for(let x = 0; x < width/2 + maxLength; x += maxLength) {
    for(let y = 0; y < height/2 + maxLength; y += maxLength) {
      for(let signX = (x||y)?-1:1; signX <= 1; signX += 2) {
        for(let signY = (x||y)?-1:1; signY <= 1; signY += 2) {
          // drawing an extra square at horizontal and vertical centers
          c.save();
          c.translate(x*signX, y*signY);
          c.rotate(count*speed);
          c.fillRect(-len/2,-len/2,len,len);
          c.restore();
        }
      }
    }
  }

  /*c.beginPath();
  c.arc(0,0,minLength/2,0,Math.PI*2);
  c.fillStyle = '#f00';
  c.fill();*/

  count++;
  requestAnimationFrame(draw);
}

let count = 0;
draw();
