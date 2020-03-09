function thing( x, y, initColour ) {
  this.pos = createVector( x, y );
  this.vel = createVector( 0, 0 );
  this.acc = createVector( 0, 0 );
  this.r = random( 10, width/7 );
  this.colour;
  
  this.assignColour = function(colour, offset) {
    colorMode(HSB);
    if( random() > .5 ) {
      this.colour = color( colour, 100, 100, .5 );
    } else {
      this.colour = color( (colour+120)%360, 100, 100, .5 );
    }
  }
  this.assignColour( initColour, 180 );
  
  this.update = function() {
    
    var force = createVector( 1, 0 );
    force.normalize();
    force.mult( .1 );
    force.rotate( random( TAU ) );
    this.acc.add( force );
    
    var center = createVector( width/2, height/2 );
    if( center.dist( this.pos ) + this.r > width/2 ) {
      var inward = p5.Vector.sub( center, this.pos );
      inward.normalize();
      inward.mult( .2 );
      this.acc.add( inward );
    }
    
    this.vel.add( this.acc );
    this.vel.mult( .99 );
    this.pos.add( this.vel );
    
    this.acc.mult( 0 );
  }
  this.draw = function() {
    push();
    noStroke();
    fill( this.colour );
    ellipse( this.pos.x, this.pos.y, this.r, this.r );
    pop();
  }
}
