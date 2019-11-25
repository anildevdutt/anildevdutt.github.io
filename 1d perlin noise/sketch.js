let start = 0;
let inc = 0.01;
function setup() {
    createCanvas(600, 600);
}

function draw() {
    background(0);
    stroke(255);
    noFill();
    beginShape();
    let xoff = start;
    for(let i = 0; i < width; i++) {
        let y = noise(xoff) * height;
        vertex(i, y);
        xoff += inc;
    }
    start += inc;
    endShape();
    
}