let start = 0;
let inc = 0.1;
let scl = 10;
let rows;
let cols;
let zoff = 0;
let fr;
let particles = [];
let flowField;
function setup() {
    createCanvas(1000, 600);
    rows = floor(height / scl);
    cols = floor(width / scl);
    fr = createP('');
    flowField = new Array(cols * rows);
    for(let i = 0; i < 600; i++)
        particles[i] = new Particle();
}

function draw() {
    //background(0);        
    let yoff = start;
    stroke(0, 50);
    strokeWeight(1);
    for(let y = 0; y < rows; y++) {
        let xoff = start;    
        for(let x = 0; x < cols; x++) {
            let index = x + y * cols;
            let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;                        
            let v = p5.Vector.fromAngle(angle);
            v.setMag(0.5);
            flowField[index] = v;
            // push();
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // line(0, 0, scl, 0);
            // pop();
            xoff += inc;
        }
        yoff += inc;
    }    
    zoff += 0.01;
    //start += inc;
    //noLoop();
    for(let i = 0; i < particles.length; i++) {
        particles[i].follow(flowField);
        particles[i].update();
        particles[i].edges();
        particles[i].show();        
    }
    
    fr.html(floor(frameRate()));
}