var my = my || {};

my.norm = function(val, min, max) {
  return (val - min) / (max - min);
}

my.lerp = function(norm, min, max) {
  return (max - min) * norm + min;
}

my.map = function(val, oldMin, oldMax, newMin, newMax) {
  let n = my.norm(val, oldMin, oldMax);
  return  my.lerp(  n, newMin, newMax);
}
