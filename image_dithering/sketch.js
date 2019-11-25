let img;
let particles = [];
let at;

function preload() {
  img = loadImage("cat.jpg");
}

function setup() {
  createCanvas(1200, 600);
  img.filter(GRAY);
  //image(img, 0, 0, 600, 600);
  img.resize(200, 200);
  img.loadPixels();
  for(let y = 0; y < img.height; y++) {
    for(let x = 0; x < img.width; x++) {      
      let oldR = img.pixels[index(x, y)];
      let oldG = img.pixels[index(x, y) + 1];
      let oldB = img.pixels[index(x, y) + 2]; 
      let factor = 1;
      let newR = round(factor * oldR / 255) * floor(255 / factor);
      let newG = round(factor * oldG / 255) * floor(255 / factor);
      let newB = round(factor * oldB / 255) * floor(255 / factor);

      img.pixels[index(x, y)] = newR;
      img.pixels[index(x, y) + 1] = newG;
      img.pixels[index(x, y) + 2] = newB;
      
      if(newR == 255){
        let p = createVector(x * 2, y * 2);
        particles.push(new Particle(p));
      }
      
      let errR = oldR - newR;
      let errG = oldG - newG;
      let errB = oldB - newB;      

      if(x + 1 < img.width && x - 1 >= 0 && y + 1 < img.height) {
        addErr(errR * 7 / 16.0, errG * 7 / 16.0, errB * 7 / 16.0, x + 1, y);      
        addErr(errR * 3 / 16.0, errG * 3 / 16.0, errB * 3 / 16.0, x - 1, y + 1);    
        addErr(errR * 5 / 16.0, errG * 5 / 16.0, errB * 5 / 16.0, x, y + 1);    
        addErr(errR * 1 / 16.0, errG * 1 / 16.0, errB * 1 / 16.0, x + 1, y + 1);
      }
      
    }
  }
  img.updatePixels();
  //image(img, 600, 0, 600, 600);
  at = createP('Aclerations');
}

function addErr(errR, errG, errB, x, y) {  
  img.pixels[index(x, y)] += errR;
  img.pixels[index(x, y) + 1] += errG;
  img.pixels[index(x, y) + 2] += errB;    
}

function index(x, y)  {
  return (x + y * img.width) * 4;
}

function draw() {
  background(255);  
  for(let p of particles) {
    let force = createVector(accelerationX, accelerationY);
    p.applyForce(force);
    //p.seek();
    p.show();
  }
  at.elt.innerText = accelerationX + ", " + accelerationY;
  
}

