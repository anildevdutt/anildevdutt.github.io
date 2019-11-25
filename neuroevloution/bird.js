class Bird {
    constructor(weights) {
        this.x = 150;
        this.y = 100 + floor(random(height - 200));        
        this.a = 0.2;
        this.v = 0;
        this.r = 30;        
        this.maxv = 5;      
        this.score = 0;
        this.fitness = 0;     
        this.brain = tf.sequential({
            layers: [
                tf.layers.dense({inputShape: [5], units: 4, activation: "sigmoid"}),
                tf.layers.dense({units: 2, activation: "sigmoid"})
            ]
        });     
        if(weights) {
            const weightCopies = [];
            for (let i = 0; i < weights.length; i++) {
                weightCopies[i] = weights[i].clone();
            }
            this.brain.setWeights(weightCopies);
        }
    }
   
    mutate() {
        tf.tidy(() => {
        const weights = this.brain.getWeights();
      const mutatedWeights = [];
      for (let i = 0; i < weights.length; i++) {
        let tensor = weights[i];
        let shape = weights[i].shape;
        let values = tensor.dataSync();
        for (let j = 0; j < values.length; j++) {
          if (random(1) < 0.001) {
            let w = values[j];
            values[j] = w + random(-0.05, 0.05);
          }
        }
        let newTensor = tf.tensor(values, shape);
        mutatedWeights[i] = newTensor;
      }
      this.brain.setWeights(mutatedWeights);   
    });
        
    }

    think(pipe) {
        let tensor = tf.tensor([[this.y / height, (this.v + 5) / 10, (pipe.p1x - this.x) / (width + 70),  pipe.p1h / height, pipe.p2y / height]]);        
        let action = this.brain.predict(tensor).dataSync();
        //console.log(action);
        if(action[0] > action[1]) 
            this.changeVelocity();
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
        if(this.v < -5)
            this.v = -5;
        if(this.v > this.maxv)
            this.v = this.maxv;
    }

    changeVelocity() {
        this.v = -5;
    }

    collisionDetection(pipes) {    
        let bx = this.x + this.r / 2;
        let bx2 = this.x - this.r / 2;
        let by = this.y - this.r / 2;
        let by2 = this.y + this.r / 2;
        if(by < 0)
            return true;
        if(by > height) 
            return true;
        for(let i = 0; i < pipes.length && i < 2; i++) {        
            if(bx >= pipes[i].p1x && bx2 <= (pipes[i].p1x + pipes[i].p1w) && by <= pipes[i].p1h) {            
                return true;
            }
                
            if(bx >= pipes[i].p1x && bx2 <= (pipes[i].p1x + pipes[i].p1w ) && by2 >= pipes[i].p2y) {            
                return true;
            }
        }
        return false;
    }

    copy() {

    }
    
}