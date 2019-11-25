class Population {
    constructor(n, target, mutationrate) {
        this.population = [];
        this.target = target;
        this.mutationrate = mutationrate;
        this.matingPool = [];
        for(let i = 0; i < n; i++) {                  
            this.population.push(new DNA(this.randomString()));
        }

    }

    randomString() {
        let randomString = "";
        for(let i = 0; i < target.length; i++) {
            randomString += String.fromCharCode(Math.floor(random(32, 128)));                        
        }
        return randomString;
    }

    fitness() {
        for(let p of this.population)
            p.chkfitness(this.target);
    }

    createMatingPool() {
        this.matingPool = [];
        for(let j = 0; j < this.population.length; j++) {
            let fitness = (this.population[j].fitness * 100).toFixed(0);
            for(let i = 0; i < fitness; i++)
                this.matingPool.push(j);
        }
    }

    reproduce() {
        this.createMatingPool();
        let newPopulation = [];
        for(let i = 0; i < this.population.length; i++) {
            let p1 = this.population[this.matingPool[Math.floor(random(this.matingPool.length))]];
            let p2 = this.population[this.matingPool[Math.floor(random(this.matingPool.length))]];
            let child = p1.crossover(p2);
            child.mutate(this.mutationrate);
            newPopulation.push(child);
        }
        this.population = newPopulation;
    }

    check() {
        for(let p of this.population) {
            if(p.genes == this.target) {
                noLoop();
                console.log(p.genes);
            }
        }
    }

    bestmatch() {
        let f = 0;
        let str = "";
        for(let p of this.population) {
            if(f < p.fitness) {
                f = p.fitness;
                str = p.genes;
            }
        }
        return str;
    }

}