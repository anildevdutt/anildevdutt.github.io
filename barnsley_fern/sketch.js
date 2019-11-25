let x = 0, y = 0;

function setup() {
  createCanvas(600, 600);
  background(51);
  stroke(255);
}

function render() {
  let r = floor(random(100));
  let _x = 0.0, _y = 0.0;

  if(r == 0) {
    _x = 0;
    _y = 0.16 * y;
  } else if(r  > 0 && r < 8) {
    _x = 0.2 * x - 0.26 * y;
    _y = 0.23 * x + 0.22 * y + 1.6;
  } else if(r >= 8 && r < 15) {
    _x = -0.15 * x + 0.28 * y;
    _y = 0.26 * x + 0.24 * y + 0.44;
  } else {
    _x = 0.85 * x + 0.04 * y;
    _y = -0.04 * x + 0.85 * y + 1.6;
  }

  x = _x;
  y = _y;
}

function dpoint() {
  let x1 = map(x, -2.1820, 2.6558, 0, width);
  let y1 = map(y, 0, 9.9983, height, 0);
  stroke(map(x1, 0, width, 0, 255), map(y1, 0, height, 0, 255), 100);
  point(x1, y1);
}

function draw() {
  for(let i = 0; i < 50; i++) {
    dpoint();
    render();
  }
}
