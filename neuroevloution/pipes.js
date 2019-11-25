class Pipe {
    constructor() {                
        this.gap = 200;
        this.p1y = 0;
        this.p1x = width + 70;
        this.p1h = 100 + floor(random(height - 200 - this.gap));
        this.p1w = 70;
        
        this.p2y = this.p1h + this.gap;
        this.p2x = width + 70;
        this.p2h = height;
        this.p2w = 70;    
        this.sc = true;            
    }


    show() {
        fill(0,200,0);
        stroke(0,100,0);
        strokeWeight(2);
        rect(this.p1x, this.p1y, this.p1w, this.p1h);
        rect(this.p2x, this.p2y, this.p2w, this.p2h);
    }

    update() {
        this.p1x -= 1 * speed;
        this.p2x -= 1 * speed;    
    }

    score(pos) {
        if(this.sc == true) {
            if(this.p1x + this.p1w < pos) {
                this.sc = false;
                return true;
            }            
        }
        return false;
    }

}