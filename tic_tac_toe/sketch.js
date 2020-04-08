let borad;

function setup() {
    createCanvas(600, 600);
    board = new Board();
}

function draw() {
    background(51);
    board.updateGame()
    board.show();
    // board.checkWinner();
}

function mouseClicked() {
    board.clicked(mouseX, mouseY);
}