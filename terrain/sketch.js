let cols;
let rows;
let scl = 20;
let wi = 1200;
let hi = 1000;
let fly = 0;

let terrain; 

function setup() {
    fullscreen();
    createCanvas(displayWidth, displayHeight, WEBGL);
    
    setAttributes('antialias', true);   
    rows = Math.floor(hi / scl);
    cols = Math.floor(wi / scl);
    angleMode(DEGREES);
    terrain = Array(rows).fill().map(() => Array(cols).fill(0));
    perspective(80, hi / wi , 0.001, 1000);
    //drawTerrain();   
}

function drawTerrain() {
    
    
}

function draw() {
    fly -= 0.1;
    let yoff = fly;
    for(let y = 0; y < rows; y++) {              
        let xoff = 0;
        for(let x = 0; x < cols; x++) {            
            terrain[y][x] = map(noise(xoff, yoff), 0, 1, -150, 150);
            xoff += 0.07;
        }
        yoff += 0.07; 
    }
    background(0);
    //stroke(255);
    strokeWeight(1);
    //noStroke();
    noFill();        
    rotateX(80);     
    translate(-width / 2, -height / 2);           
    translate((width - wi) / 2, ((height - hi) / 2), -150);    
    colorMode(HSB, 125);
    for(let y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        for(let x = 0; x < cols ; x++){
            stroke(map(y, 0, rows, 0, 255), map(terrain[y][x], -150, 150, 0, 255), 100);
            vertex(x * scl, y * scl, terrain[y][x]);
            vertex(x * scl, (y + 1) * scl, terrain[y + 1][x]);
        }
        endShape();
    }
    
}