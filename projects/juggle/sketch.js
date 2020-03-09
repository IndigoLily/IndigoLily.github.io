var things = [];
var places = [];
var tsel = 1;
var psel1 = 1;
var psel2 = 0;

function setup() {
  let size = ( windowWidth > windowHeight ) ? windowHeight : windowWidth;
  size *= .65;
  size = Math.floor(size);
  createCanvas( size, size );
  const center = createVector( width/2, height/2 );
  let offset = createVector( 0, -1 );
  for( let i = 0; i < 3; i++ ) {
    things[i] = new thing();
    things[i].r = width/5;
    offset.setMag( things[i].r / sqrt(1) );
    places[i] = p5.Vector.add( center, offset );
    things[i].pos = places[i].copy();
    offset.rotate(TAU/3);
  }
}

function draw() {
  background( (128 + 256) / 2 - 1 );
  noStroke();
  if( abs(things[0].pos.x - places[psel1].x) < .01 ) {
    things[0].pos.x = places[psel1].x;
    things[0].pos.y = places[psel1].y;
    things[tsel].pos.x = places[psel2].x;
    things[tsel].pos.y = places[psel2].y;
    
    // console.log('oops');
    
    tsel = (tsel === 1) ? 2 : 1;
    
    psel1 = (psel1 + 1) % 3;
    psel2 = (psel2 + 1) % 3;
    
  }
  for( let i = 0; i < things.length; i++ ) {
    fill( map( i, 0, things.length-1, 0, 255 ) );
    
    let speed = 30
    things[0].pos.x = lerp( things[0].pos.x, places[psel1].x, 1/speed );
    things[0].pos.y = lerp( things[0].pos.y, places[psel1].y, 1/speed );
    things[tsel].pos.x = lerp( things[tsel].pos.x, places[psel2].x, 1/speed );
    things[tsel].pos.y = lerp( things[tsel].pos.y, places[psel2].y, 1/speed );
    
    ellipse( things[i].pos.x, things[i].pos.y, things[i].r, things[i].r);
    
    /*
    fill( 0, 255, 0 );
    textSize( 24 );
    text( i, things[i].pos.x, things[i].pos.y, 256, 256 );
    fill( 255, 0, 0 );
    text( i, places[i].x, places[i].y + things[i].r/2, 256, 256)
    */
  }
}

/*

T -> P
0 -> 1
1 -> 0

0 -> 2
2 -> 1

0 -> 0
1 -> 2

0 -> 1
2 -> 0

0 -> 2
1 -> 1

0 -> 0
2 -> 2

*/
