var my = my || {};

my.vec2d = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
  return this;
}

my.vec2d.prototype.set = function(x, y) {
  this.x = x;
  this.y = y;
}

my.vec2d.prototype.mag = function() {
  return (this.x*this.x + this.y*this.y)**.5;
}

my.vec2d.prototype.setMag = function(n) {
  return this.div(this.mag()).mult(n);
}

my.vec2d.prototype.angle = function() {
  let a = Math.atan2(this.y, this.x);
  return a;
}

my.vec2d.prototype.setAngle = function(r) {
  [this.x, this.y] = [Math.cos(r)*this.mag(), Math.sin(r)*this.mag()];
  return this;
}

my.vec2d.prototype.rotate = function(r) {
  this.setAngle(this.angle() + r);
  return this;
}

my.vec2d.prototype.mult = function(n) {
  this.x *= n;
  this.y *= n;
  return this;
}

my.vec2d.prototype.div = function(n) {
  this.x /= n;
  this.y /= n;
  return this;
}

my.vec2d.prototype.add = function(v2) {
  this.x += v2.x;
  this.y += v2.y;
  return this;
}

my.vec2d.prototype.sub = function(v2) {
  this.x -= v2.x;
  this.y -= v2.y;
  return this;
}

my.vec2d.prototype.copy = function() {
  return new my.vec2d(this.x, this.y);
}

my.vec2dAdd = function(...args) {
  let vsum = new my.vec2d();
  for(let i = 0; i < args.length; i++) {
    vsum.add(args[i]);
  }
  return vsum;
}

my.vec2dSub = function(v1, v2) {
  return new my.vec2d(v1.x-v2.x, v1.y-v2.y);
}

my.vec2dMult = function(v, n) {
  return v.copy().mult(n);
}

my.vec2dDiv = function(v, n) {
  return v.copy().div(n);
}
