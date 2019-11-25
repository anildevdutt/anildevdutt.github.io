class Particle {
    constructor(pos) {
        this.position = createVector(pos.x, pos.y);
        this.velocity = createVector(0, 0); 
        this.target = createVector(pos.x, pos.y);       
    }


    seek() {                
        let desiredVelocity = p5.Vector.sub(this.target, this.position);
        let dist = desiredVelocity.mag();
        let steering = p5.Vector.sub(desiredVelocity, this.velocity);
        steering.limit(this.maxForce);
        this.velocity.add(steering);
        let speed;
        dist <= this.slowRadious ? speed = map(dist, 0, this.slowRadious, 0, this.maxSpeed) : speed = this.velocity.limit(this.maxSpeed);
        this.velocity.limit(speed);
        this.position = this.position.add(this.velocity);        
    }
    
    applyForce(force) {
        this.velocity = this.velocity.add(force);
        this.seek();
    }
    
    show() {        
        strokeWeight(2);
        point(this.position.x, this.position.y);
    }
}

