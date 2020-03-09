Array.prototype.last = function() {
  return this[this.length-1];
}

function tri(s=20,x=0,y=0) {
  this.pos = createVector(x,y);
  this.s = s;
  this.h = ()=>this.s*(.75**.5);
  this.a = 0;
  this.draw = function() {
    var offset = createVector(0,this.h()*(2/3));

    offset.rotate(radians(this.a));
    beginShape();
    for(let i=0;i<3;i++){
      vertex(this.pos.x+offset.x,this.pos.y+offset.y);
      offset.rotate(TAU/3);
    }
    endShape(CLOSE);
  }
}

var tris = [];
var n = 5;
var speed = 1;

function setup() {
  // debugger;
  tris = [];
  createCanvas(windowWidth, windowHeight);
  for(let i=0; i<n; i++){
    for(let j=0; (tris.length>0) ? tris.last().h()*j<height : true; j++){
      tris.push(new tri(width/n));
      tris.last().pos.x = i*tris.last().s+(tris.last().s/2);
      tris.last().pos.y = tris.last().h()*(2/3)+(tris.last().h()*j);
    }
  }
}

function draw() {
  background(255);
  noStroke();
  for(let i=0;i<tris.length;i++){
    fill(i/tris.length*255,64,255);
    tris[i].a += (1 + i/tris.length)*speed;
    tris[i].draw();
  }
}

function windowResized() {
  setup();
}

function mousePressed() {
  n++;
  setup();
}
