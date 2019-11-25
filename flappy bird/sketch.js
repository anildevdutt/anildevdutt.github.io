let pipes = [];
let dist = 0;
let speed = 2;
let bird;
let score = 0;

function setup() {
    createCanvas(800, 600);
    bird = new Bird;
    pipes.push(new Pipe);
}

function drawBackground() {
    background(135,206,250);
}

function updatePipes() {    
    for(let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].update();
        pipes[i].show();
        if(pipes[i].p1x <= -pipes[i].p1w) {
            delete pipes[i];            
            pipes.shift();
        }
        if(pipes[i].score(165) == true) {
            score += 1;
            console.log("Score: " + score);
        }
    }
    if (dist >= 300) {
        pipes.push(new Pipe);
        dist = 0;
    }
    dist += 1 * speed;
}

function updateBird() {
    bird.update();
    bird.show();    
}

function collisionDetection() {    
    let bx = bird.x + bird.r / 2;
    let bx2 = bird.x - bird.r / 2;
    let by = bird.y - bird.r / 2;
    let by2 = bird.y + bird.r / 2;
    if(by > height) 
        return true;
    for(i = 0; i < pipes.length && i < 2; i++) {        
        if(bx >= pipes[i].p1x && bx2 <= (pipes[i].p1x + pipes[i].p1w) && by <= pipes[i].p1h) {            
            return true;
        }
            
        if(bx >= pipes[i].p1x && bx2 <= (pipes[i].p1x + pipes[i].p1w ) && by2 >= pipes[i].p2y) {            
            return true;
        }
    }
    return false;
}


function draw() {
    drawBackground();
    updatePipes();    
    updateBird();
    if(collisionDetection() == true) {
        console.log("Game Over");
        noLoop();
    }
}

function keyPressed() {
    if(keyCode == 32)
        bird.changeVelocity();
}