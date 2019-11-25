let a = 1;
let k;
let _x, _y;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  background(51);
  stroke(255);
  _x = width;
  _y = height/2;
  k = PI;
}

function render() {
  let x = cos(k * a) * cos(a);
  let y = cos(k * a) * sin(a);
  x = map(x, -1, 1, 0, width);
  y = map(y, -1, 1, 0, height);
  let r = map(cos(a), -1, 1, 0, 255);
  let g = map(sin(a), -1, 1, 0, 255);
  let b = map(sin(a) * cos(a), -1, 1, 0, 255);;
  stroke(r, g, b);
  line(_x, _y, x, y);
  _x = x;
  _y = y;
  a++;

}

function draw() {
  for(let i = 0; i < 5; i++) {
    render();
  }
}
