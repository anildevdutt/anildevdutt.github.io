let walls = [];
let particle;
let xoff = 0;
let yoff = 10000;

function setup() {
    createCanvas(800, 600);
    for(let i = 0; i < 5; i++) {
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(height);
        let y2 = random(height);
        walls.push(new Boundry(x1, x2, y1, y2));
    }
    walls.push(new Boundry(0, 0, 0, height));
    walls.push(new Boundry(0, 0, width, 0));
    walls.push(new Boundry(width, 0, width, height));
    walls.push(new Boundry(0, height, width, height));
    particle = new Particle();
}

function draw() {
    background(0);
    for(let wall of walls)
        wall.show();

    particle.update(noise(xoff) * width, noise(yoff) * height);
    particle.show();
    particle.look(walls);
    
    xoff += 0.01;
    yoff += 0.01;
    // ray.show();
    // ray.lookAt(mouseX, mouseY);

    // let pt = ray.cast(wall);
    // //console.log(pt);
    // if(pt) {
    //     fill(255);
    //     ellipse(pt.x, pt.y, 12, 12);
    // }
    //noLoop();
}