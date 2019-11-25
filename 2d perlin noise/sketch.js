let start = 0;
let inc = 0.01;
function setup() {
    createCanvas(600, 600);
}

function draw() {
    //background(0);
    
    loadPixels();
    let yoff = start;
    for(let y = 0; y < height; y++) {
        let xoff = start;    
        for(let x = 0; x < width; x++) {
            let index = (x + y * width) * 4;
            let c = noise(xoff, yoff) * 255;
            pixels[index + 0] = c;
            pixels[index + 1] = c;
            pixels[index + 2] = c;
            pixels[index + 3] = 255;
            xoff += inc;
        }
        yoff += inc ;
    }

    updatePixels();
    start += inc;
    //noLoop();
}