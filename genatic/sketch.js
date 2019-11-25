const target = "unicords and rainbows";
let population;
let bm, genc;
let gcount = 0;
let mutationrate = 0.01;

function setup() {    
    noCanvas();    
    
    population = new Population(1000, target, mutationrate);
    
    bm = createElement("h2", "Best Match: ");
    genc = createElement("h2", "Generation: ");
    createElement("h2", "Mutation Rate: " + (mutationrate * 100) + "%");
}

function draw() {    
    population.check();
    population.fitness();    
	

    bm.elt.innerText = "Best Match: " + population.bestmatch();
    genc.elt.innerText = "Generation: " + gcount;    
    gcount += 1;

    population.reproduce();    
    
}
