let pipes = [];
let dist = 0;
let speed = 2;
let birds = [];
let deadBirds = [];
let score = 1;
let fcount = 0;
let brain;
let gc = 1;
let d = 1;

function setup() {
    createCanvas(800, 600);
    for(let i = 0; i < 100; i++)
        birds.push(new Bird);
    pipes.push(new Pipe);
    tf.setBackend("cpu");
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

function calcFitness() {
    for(let i = 0; i < deadBirds.length; i++) {
        deadBirds[i].fitness = deadBirds[i].score / (100000);
    }
}

function resetGame() {
    score = 0;
    pipes = [];
    pipes.push(new Pipe);
}

function createMatingPool() {
    let mp;
    let max = 0;
    for(let i = 0; i < deadBirds.length; i++) {
        let n = deadBirds[i].fitness * 100;
        if(max < n) {
            max = n;
            mp = i;
        }
        
        // for(let j = 0; j < n; j++) {
        //     mp.push(i);
        // }
    }
    console.log("Fintness: " + max);
    for(let i = 0; i < deadBirds.length; i++) {
        let b;
        if(random(1) < 0.2)
            b = new Bird(deadBirds[floor(random(deadBirds.length))].brain.getWeights());
        else
            b = new Bird(deadBirds[mp].brain.getWeights());
        b.mutate();
        birds.push(b);
    }

    for(let b of deadBirds) {
        b.brain.dispose();
    }
    deadBirds = [];
}



function draw() {
    
    for(let dr = 0; dr < d; dr++) {
        drawBackground();
    updatePipes();    
    fcount++;
    for(let i = 0; i < birds.length; i++) {
        birds[i].update();
        birds[i].show();  
      
        if(birds[i].collisionDetection(pipes)) {
            deadBirds.push(birds[i]);
            birds.splice(i, 1);
            continue;
        }   
        birds[i].score = fcount;
        if(pipes[0].p1x < birds[i].x)   
            birds[i].think(pipes[1]);
        else
            birds[i].think(pipes[0]);        
    }

        if(birds.length == 0) {
            calcFitness();        
            createMatingPool();
            resetGame();
            gc++;
            fcount = 0;
            score = 1;
            dist = 0;
            console.log(gc);
        }
    }
    
}
