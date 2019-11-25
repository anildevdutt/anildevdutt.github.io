class DNA {
    constructor(genes) {
        this.genes = genes;        
        this.fitness = 0.0;
    }

    chkfitness(target) {
        let score = 0;
        for(let i = 0; i < this.genes.length; i++) {
            if(this.genes[i] == target[i])
                score++;
        }
        this.fitness = score / this.genes.length;
    }

    crossover(partner) {
        let m = Math.floor(random(this.genes.length));
        let g = this.genes.substr(0, m) + partner.genes.substr(m, partner.genes.length - m);        
        return new DNA(g);
    }

    mutate(mutationrate) {
        let s = "";
        for(let i = 0; i < this.genes.length; i++)
            if(random(1) < mutationrate)
                s += String.fromCharCode(Math.floor(random(32, 128)));
            else
                s += this.genes.charAt(i);
        this.genes = s;
    }
} 