class Board {
    constructor() {
        this.mat = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];        

        this.player1 = new Player("p1");
        this.player2 = new Player("p2");

        this.turn = "p1";

        this.winner =  "";
    }

    clicked(x, y) {
        console.log(x, y);
        if(this.turn == "p1") {
            this.player1.move[0] = floor(x / (width / 3));
            this.player1.move[1] = floor(y / (height / 3));
            this.player1.hasMoved = true;
        } else {
            this.player2.move[0] = floor(x / (width / 3));
            this.player2.move[1] = floor(y / (height / 3));
            this.player2.hasMoved = true;
        }
    }

    updateGame() {
        if(this.turn == "p1") {            
            if(this.player1.hasMoved) {
                console.log("Player 1 turn made his turn");
                this.mat[this.player1.move[1]][this.player1.move[0]] = -1;
                this.player1.hasMoved = false;
                this.turn = "p2";
            }            
        } else {
            if(this.player2.hasMoved) {
                console.log("Player 1 turn made his turn");
                this.mat[this.player2.move[1]][this.player2.move[0]] = 1;
                this.player2.hasMoved = false;
                this.turn = "p1";
            }     
        }
    }

    checkWinner() {
        //check rows        
        for(let i = 0; i < this.mat.length; i++) {
           if(this.mat[i][0] == 1 && this.mat[i][1] == 1 && this.mat[i][2] == 1) {              
                   this.player1.winner = true;
                   this.winner = "p1";
                   console.log("game over", this.player1.name, "win1");
                   noLoop();
                   return;
           }
           if(this.mat[i][0] == -1 && this.mat[i][1] == -1 && this.mat[i][2] == -1) {              
                this.player2.winner = true;
                this.winner = "p2";
                console.log("game over", this.player2.name, "win1");
                noLoop();
                return;
            }

            if(this.mat[0][i] == 1 && this.mat[1][i] == 1 && this.mat[2][i] == 1) {              
                this.player1.winner = true;
                this.winner = "p1";
                console.log("game over", this.player1.name, "win1");
                noLoop();
                return;
            }
            if(this.mat[0][i] == -1 && this.mat[1][i] == -1 && this.mat[2][i] == -1) {              
                this.player2.winner = true;
                this.winner = "p2";
                console.log("game over", this.player2.name, "win1");
                noLoop();
                return;
            }

            if(this.mat[i][i] == 1 && this.mat[i][i] == 1 && this.mat[i][i] == 1) {              
                this.player1.winner = true;
                this.winner = "p1";
                console.log("game over", this.player1.name, "win1");
                noLoop();
                return;
            }
            if(this.mat[i][i] == -1 && this.mat[i][i] == -1 && this.mat[i][i] == -1) {              
                this.player2.winner = true;
                this.winner = "p2";
                console.log("game over", this.player2.name, "win1");
                noLoop();
                return;
            }

            // if(this.mat[2 - i][2 - i] == 1 && this.mat[2 - i][2 - i] == 1 && this.mat[2 - i][2 - i] == 1) {              
            //     this.player1.winner = true;
            //     this.winner = "p1";
            //     console.log("game over", this.player1.name, "win1");
            //     noLoop();
            //     return;
            // }
            // if(this.mat[2- i][2 -i] == -1 && this.mat[2 - i][2 - i] == -1 && this.mat[2 - i][2 - i] == -1) {              
            //     this.player2.winner = true;
            //     this.winner = "p2";
            //     console.log("game over", this.player2.name, "win1");
            //     noLoop();
            //     return;
            // }
        }

       
    }

    show() {
        let offs = 100;
        stroke(255);
        strokeWeight(3);
        let cx = width / 3;
        let cy = height / 3;
        line(width / 3, 0, width / 3, height);
        line((width / 3) * 2, 0, (width / 3) * 2, height);
        line(0, height / 3, width, height / 3);        
        line(0, (height / 3) * 2, width, (height / 3) * 2);        
        noFill();
        for(let i = 0; i < this.mat.length; i++) {
            for(let j = 0; j < this.mat[i].length; j++) {
                switch(this.mat[i][j]) {
                    case -1:
                        this.displayX(cx * j, cy * i, cx, cy);
                        break;
                    case 1:
                        this.displayO(cx * j, cy * i, cx, cy);
                        break;                    
                }
            }
        }
    }


    displayX(x, y, w, h) {
        push();
        translate(x + w / 2, y + h / 2);
        line(0, 0, 50, 50);
        line(0, 0, -50, -50);
        line(0, 0, 50, -50);
        line(0, 0, -50, 50);
        pop();
    }

    displayO(x, y, w, h) {
        push();
        translate(x + w / 2, y + h / 2);
        ellipse(0, 0, 100, 100);
        pop();
    }
}