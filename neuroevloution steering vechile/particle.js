class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.dead = false;
        this.finished = false;
        this.rays = [];
        this.maxspeed = 3;
        this.sight = 100;
        for(let a = 0; a < 360; a += 45) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
        this.brain = new NeuralNetwork(this.rays.length, this.rays.length, 1);
    }

    check(target) {
        const d = p5.Vector.dist(this.pos, target);
        if(d < 10) {
            this.finished = true;
        }
    }

    show() {
        fill(255, 100);
        ellipse(this.pos.x, this.pos.y, 8, 8);
        // for(let ray of this.rays) {
        //     //ray.show();
        // }
    }
    
    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        if(!this.dead && !this.finished) {
            this.pos.add(this.vel);
            this.vel.add(this.acc);
            this.vel.limit(this.maxspeed);
            this.acc.set(0, 0);
        }
    }
     
    look(walls) {        
        const inputs = [];
        for(let ray of this.rays) {            
            let closest = null;
            let record = this.sight;
            for(let wall of walls) {                
                const pt = ray.cast(wall);            
                if(pt) {              
                    const d = p5.Vector.dist(this.pos, pt);  
                    if(d < record && d < this.sight) {
                        record = d;
                        closest = pt;
                    }                    
                }
            }
            inputs.push(map(record, 0, 50, 1, 0));           
           
            if(record < 2) {
                this.dead = true;
            }
            if(closest) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
        const output = this.brain.predict(inputs);
        const angle = map(output[0], 0, 1, 0, TWO_PI);
        const steering = p5.Vector.fromAngle(angle);
        steering.setMag(this.maxspeed);
        steering.sub(this.vel);
        this.applyForce(steering);
        //console.log(output);
    }
}