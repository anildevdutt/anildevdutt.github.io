class Particle {
    constructor(pos) {
        this.position = createVector(pos.x, pos.y);
        this.velocity = createVector(0, 0); 
        this.target = createVector(pos.x, pos.y);  
        this.maxSpeed = 5;     
    }


    update() {
        
        let d = p5.Vector.sub(this.target, this.position)
        this.velocity.add(d);
        this.velocity.limit(5);
        this.position.add(this.velocity);
        
    }
    
    applyForce(force) {
        this.velocity = p5.Vector.add(force, this.velocity);
        this.update();
    }
    
    show() {        
        strokeWeight(2);
        point(this.position.x, this.position.y);
    }
}

