let snake = [];
let snake_len = 5;
let score = 0;
const snake_radious = 10;
const snakeSpeed = 0.8;
let lastKey = "right";
let rat = new Object();
const ratSize = 20;

function init() {
    let s = {
        x: Math.floor(width/2),
        y: Math.floor(height/2),        
        d: "right",
        rat: false
    };
    snake.push(s);
    for(let i = 1; i < snake_len; i++) {
        s = new Object();
        s.x = snake[i - 1].x - snake_radious;
        s.y = snake[i - 1].y;
        s.d = snake[i - 1].d;
        s.rat = snake[i - 1].rat;
        snake.push(s);
    }   
    rat.x = Math.floor(random(width - ratSize)) + ratSize;
    rat.y = Math.floor(random(height - ratSize)) + ratSize;
}

function setup() {
    createCanvas(800, 600);
    init();
}

function drawGame() {
    fill(255);
    stroke(51);
    for(let s of snake) {
        ellipse(s.x, s.y, snake_radious, snake_radious);
    }
}

function gameOver() {
    drawGame();
    console.log("Game Over");
    noLoop();
}

function updateSnake() {

    let i = snake_len - 1;
    if(snake[i].rat == true) {
        let s = new Object();
        s.x = snake[i].x;
        s.y = snake[i].y;
        s.d = snake[i].d;
        s.rat = false;
        snake.push(s);
        snake_len += 1;
    }
    
    for(; i > 0; i--) {        
        snake[i].d = snake[i - 1].d;
        snake[i].x = snake[i - 1].x;
        snake[i].y = snake[i - 1].y;
        snake[i].rat = snake[i - 1].rat;                
    }
    switch(snake[0].d) {
        case "right":                
            snake[0].x += snake_radious;
            snake[0].rat = false;
            if(snake[0].x >= width)
                gameOver();
            break;
        case "left":
            snake[0].x -= snake_radious;
            snake[0].rat = false;
            if(snake[0].x <= 0)
                gameOver();            
            break;
        case "down":
            snake[0].y += snake_radious;
            snake[0].rat = false;
            if(snake[0].y >= height)
                gameOver();    
            break;
        case "up":
            snake[0].y -= snake_radious;
            snake[0].rat = false;
            if(snake[0].y <= 0)
                gameOver();    
    }

    
    
}

function newRat() {
    rat.x = Math.floor(random(width - ratSize)) + ratSize;
    rat.y = Math.floor(random(height - ratSize)) + ratSize;
}

function addSnake() {
    snake[0].rat = true;
    score += 1;
    console.log(score);
}

function detectCollision() {
    if(snake[0].x >= rat.x && snake[0].x <= rat.x + ratSize && snake[0].y >= rat.y && snake[0].y <= rat.y + ratSize) {
        newRat();
        addSnake();
    }
        
}

function draw() {
    frameRate(30);  
    background(0);
    drawGame();
    for(let i = 0; i < snakeSpeed; i++) {
        updateSnake();
        detectCollision();
    }
    rect(rat.x, rat.y, ratSize, ratSize);
}



function keyPressed() {    
    switch(keyCode) {
        case LEFT_ARROW:
            if(lastKey != "right") {
                snake[0].d = "left";
                lastKey = "left";
            }
            break;
        case RIGHT_ARROW:
            if(lastKey != "left") {
                snake[0].d = "right";
                lastKey = "right";
            }
            break;
        case UP_ARROW:
            if(lastKey != "down") {
                snake[0].d = "up";
                lastKey = "up";
            }
            break;
        case DOWN_ARROW:
            if(lastKey != "up") {
                snake[0].d = "down";
                lastKey = "down";
            }
    }
}