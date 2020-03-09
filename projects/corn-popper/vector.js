var my = my || {};

my.vector = function vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
  return this;
}

my.vector.prototype.set = function(x, y) {
  this.x = x;
  this.y = y;
}

my.vector.prototype.mag = function() {
  return (this.x*this.x + this.y*this.y)**.5;
}

my.vector.prototype.setMag = function(n) {
  return this.div(this.mag()).mult(n);
}

my.vector.prototype.angle = function() {
  let a = Math.atan2(this.y, this.x);
  return a;
}

my.vector.prototype.setAngle = function(r) {
  [this.x, this.y] = [Math.cos(r)*this.mag(), Math.sin(r)*this.mag()];
  return this;
}

my.vector.prototype.rotate = function(r) {
  this.setAngle(this.angle() + r);
  return this;
}

my.vector.prototype.mult = function(n) {
  this.x *= n;
  this.y *= n;
  return this;
}

my.vector.prototype.div = function(n) {
  this.x /= n;
  this.y /= n;
  return this;
}

my.vector.prototype.add = function(v2) {
  this.x += v2.x;
  this.y += v2.y;
  return this;
}

my.vector.prototype.sub = function(v2) {
  this.x -= v2.x;
  this.y -= v2.y;
  return this;
}

my.vector.prototype.copy = function() {
  return new my.vector(this.x, this.y);
}

my.vecAdd = function(...args) {
  let vsum = new my.vector();
  for(let i = 0; i < args.length; i++) {
    vsum.add(args[i]);
  }
  return vsum;
}

my.vecSub = function(v1, v2) {
  return new my.vector(v1.x-v2.x, v1.y-v2.y);
}

my.vecMult = function(v, n) {
  return v.copy().mult(n);
}

my.vecDiv = function(v, n) {
  return v.copy().div(n);
}
