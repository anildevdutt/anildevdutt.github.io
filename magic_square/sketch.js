let gridSize = 13;
let gridLen = 90;

let cx = Math.floor(gridSize / 2), cy = 0;
let num = 1;
let visited = new Array(gridSize).fill(0).map(() => new Array(gridSize).fill(0));

function drawGrid() {
    let x, y = (height - gridLen * gridSize) / 2;
    stroke(230);
    noFill();
    strokeWeight(2);
    for(let i = 0; i < gridSize; i++) {
        x = (width - gridLen * gridSize) / 2;
        for(let j = 0; j < gridSize; j++) {
            rect(x, y, gridLen, gridLen);
            x += gridLen;            
        }
        y += gridLen;
    }
}

function setup() {
    createCanvas(1200, 1200);    
}

function nextX(px) {
    if(px + 1 >= gridSize) 
        px = 0;
    else
        px += 1;
    return px;
}

function prevY(py) {
    if(py - 1 < 0)
        py = gridSize - 1;
    else
        py -= 1;
    return py;
}

function prevX(px) {
    if(px - 1 < 0)
        px = gridSize - 1;
    else
        px -= 1;
    return px;
}


function nextY(py) {
    if(py + 1 >= gridSize) 
        py = 0;
    else
        py += 1;
    return py;
}

function notValid(x, y) {
    if(visited[x][y] != 0)
        return true;
    return false;
}

function writeNum() {
   
    textSize(50);
    textAlign(CENTER, CENTER);
    for(let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
            if(visited[i][j] != 0) {
                let n = visited[i][j];
                let dx = (width - gridLen * gridSize) / 2;
                dx = dx + (gridLen * (i));
                let dy = (height - gridLen * gridSize) / 2;
                dy = dy + (gridLen * (j));
                text(n, dx + gridLen / 2, dy + gridLen / 2);
            }
        }
    }
    
}

function draw() {
   //frameRate(12);
    background(41);
    drawGrid();

    console.log(cx, cy, num);
    
    visited[cx][cy] = num;
    writeNum();
    num += 1;

    cx = nextX(cx);
    cy = prevY(cy);

    if(notValid(cx, cy)) {
        cy = nextY(cy);
        cy = nextY(cy);
        cx = prevX(cx);
        if(notValid(cx, cy)) {
            console.log("Completed");
            noLoop();
        }
    }
    
}

