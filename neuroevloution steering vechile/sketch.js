let walls = [];

let population = [];
let savedParticles = [];

let start, end;

function setup() {
    createCanvas(800, 600);
    tf.setBackend("cpu");
    walls.push(new Boundry(100, 600, 100, 200));
    walls.push(new Boundry(100, 200, 250, 50));
    walls.push(new Boundry(250, 50, 600, 50));

    walls.push(new Boundry(200, 600, 200, 200));
    walls.push(new Boundry(200, 200, 250, 150));
    walls.push(new Boundry(250, 150, 600, 150));
    walls.push(new Boundry(100, 599, 200, 599));
    walls.push(new Boundry(600, 50, 600, 150));

    start = createVector(150, 500);
    end = createVector(600, 100);
    
    for(let i = 0; i < 100; i++) {
        population.push(new Particle(start.x, start.y));
    }
    
}

function draw() {
    background(0);
    for(let wall of walls) {
        wall.show();
    }
    
    for(let particle of population) {
        particle.look(walls);       
        particle.check(end);
        particle.update();
        particle.show();
    }


    for(let i = population.length - 1; i >= 0; i--) {
        const particle = population[i];
        if(particle.dead || particle.finished) {
            savedParticles.push(population.splice(i, 1));
        }
    }
    
    if(population.length == 0) {
        console.log("next gen");
    }
    
    //ellipse(start.x, start.y, 12, 12);
    ellipse(end.x, end.y, 12, 12);
}