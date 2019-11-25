class Particle {
    constructor(pos) {
        this.position = createVector(pos.x, pos.y);
        this.velocity = createVector(0, 0); 
        this.target = createVector(pos.x, pos.y);  
        this.maxSpeed = 10;     
        this.slowRadious = 5;
        this.maxForce = 1;
        this.flag = false;
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

    flee() {
        let desiredVelocity = p5.Vector.sub(p5.Vector.random2D(), this.position);
        let steering = p5.Vector.sub(desiredVelocity, this.velocity);
        steering.limit(this.maxForce);
        this.velocity.add(steering);
        this.velocity.limit(this.maxSpeed);
        this.position = this.position.add(this.velocity);        
    }

    update() {
       
        if(this.flag) {
            
            this.flee();
            let d = dist(this.position.x , this.position.y, this.target.x, this.target.y);
            if(d > 100) {
                this.flag = false;
            }
        } else {
            this.seek();
        }
    }

    applyForce() {
        this.flag = true;        
    }
    
    show() {        
        strokeWeight(2);
        point(this.position.x, this.position.y);
    }
}

