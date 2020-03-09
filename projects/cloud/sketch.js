var things = [];

function setup() {
  let size = ( windowWidth > windowHeight ) ? windowHeight : windowWidth;
  size *= .8;
  createCanvas( size, size );
  let colour = random( 360 )
  for( let i = 0; i < 300; i++ ) {
    things.push( new thing( random(width), random(height), colour ) );
  }
  for( let i = 0; i < 1000; i++ ) {
    for( let j = 0; j < things.length; j++ ) {
      things[j].update();
    }
  }
}

function draw() {
  background( 255 );
  for( let i = 0; i < things.length; i++ ) {
    things[i].update();
    things[i].draw();
  }
}

function mousePressed() {
  let colour = random( 360 );
  let offset = random( 180 ) + 90;
  for( let i = 0; i < things.length; i++ ) {
    things[i].assignColour( colour, offset );
  }
}
