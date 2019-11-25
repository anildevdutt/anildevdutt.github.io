class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.acc = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.maxspeed = 2;
        this.prevPos = this.pos.copy();
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    follow(flowf) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let force = flowf[index];
        this.applyForce(force);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    show() {
        stroke(0, 5);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);        
        //point(this.pos.x, this.pos.y);
        this.updatePrev();
    }

    

    edges() {
        if(this.pos.x > width) {this.pos.x = 0; this.updatePrev();}
        if(this.pos.x < 0) {this.pos.x = width; this.updatePrev();}
        if(this.pos.y > height) {this.pos.y = 0; this.updatePrev();}
        if(this.pos.y < 0) {this.pos.y = height; this.updatePrev();}
    }
}