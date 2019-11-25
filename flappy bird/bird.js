class Bird {
    constructor() {
        this.x = 150;
        this.y = 100 + floor(random(height - 200));        
        this.a = 0.2;
        this.v = 0;
        this.r = 30;
    }

    show() {
        stroke(160,10,100);
        fill(230, 10, 100);
        ellipse(this.x, this.y, this.r, this.r);
    }

    update() {
        let t = 1;
        let v1 = this.v + this.a * t;        
        let newY = this.v + ((this.a * Math.pow(t, 2)) / 2);
        this.y = this.y + newY;
        this.v = v1;
    }

    changeVelocity() {
        this.v = -5;
    }
    
}