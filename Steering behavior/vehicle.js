class Vehicle {
    constructor(color) {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.target = p5.Vector.random2D();
        this.maxSpeed = 2;
        this.maxForce = 0.5; 
        this.circleRadious = 20;
        this.circleDistance = 80;
        this.wanderAngle = 0;
        this.color = color;
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
        let desiredVelocity = p5.Vector.sub(this.position, this.target);
        let steering = p5.Vector.sub(desiredVelocity, this.velocity);
        steering.limit(this.maxForce);
        this.velocity.add(steering);
        this.velocity.limit(this.maxSpeed);
        this.position = this.position.add(this.velocity);        
    }

    boundries() {
        if(this.position.x > width) this.position.x = 0;
        if(this.position.y > height) this.position.y = 0;
        if(this.position.x < 0) this.position.x = width;
        if(this.position.y < 0) this.position.y = height;
    }

    wander() {
        let wcircle = this.velocity.copy();
        wcircle.normalize();
        wcircle.mult(this.circleDistance);

        let disp = p5.Vector.fromAngle(this.wanderAngle, -1);
        disp.mult(this.circleRadious);
        this.wanderAngle += random(-0.2, 0.2);
        let wander = p5.Vector.add(wcircle, disp);        
            
        let steering = wander;
        steering.limit(this.maxForce);
        this.velocity.add(steering);
        
        this.velocity.limit(this.maxSpeed);
        this.position = this.position.add(this.velocity);              
        this.boundries();  
    }

    evade(target) {
        let t = p5.Vector.sub(target.position, this.position).mag() / this.maxSpeed;
        //t = 5;
        let futurePosition = p5.Vector.add(target.position, p5.Vector.mult(target.velocity, t));
        let desiredVelocity = p5.Vector.sub(this.position, futurePosition);
        let steering = p5.Vector.sub(desiredVelocity, this.velocity);
        steering.limit(this.maxForce);
        this.velocity.add(steering);
        this.velocity.limit(this.maxSpeed);
        this.position = this.position.add(this.velocity);        
        this.boundries();
    }

    persuit(target) {
        let t = p5.Vector.sub(target.position, this.position).mag() / this.maxSpeed;
        //t = 5;
        let futurePosition = p5.Vector.add(target.position, p5.Vector.mult(target.velocity, t));

        let desiredVelocity = p5.Vector.sub(futurePosition, this.position);
        let dist = desiredVelocity.mag();
        let steering = p5.Vector.sub(desiredVelocity, this.velocity);
        steering.limit(this.maxForce);
        this.velocity.add(steering);
        let speed;
        dist <= this.slowRadious ? speed = map(dist, 0, this.slowRadious, 0, this.maxSpeed) : speed = this.velocity.limit(this.maxSpeed);
        this.velocity.limit(this.maxSpeed);
        this.position = this.position.add(this.velocity);
        this.boundries();
    }

    show() {
        stroke(this.color);
        fill(this.color);
        strokeWeight(2);        
        //console.log(degrees(this.heading));
        let angle = this.velocity.heading() + PI / 2;
        push();
        stroke(this.color);        
        translate(this.position.x, this.position.y);
        rotate(angle);
        triangle(0, -10, -6, 10, 6, 10);        
        pop();
    }
}
