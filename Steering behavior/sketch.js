let vehicles = [];
//let f = 1;

function setup() {
    createCanvas(800, 600);
    vehicles.push(new Vehicle("red"));
    for(let i = 1; i < 2; i++) {        
        vehicles.push(new Vehicle("white"));
    }
}


function draw() {    
    background(0);       
    vehicles[0].evade(vehicles[1]);    
    vehicles[1].persuit(vehicles[0]);
    
    for(let i = 0; i < vehicles.length; i++) {        
        vehicles[i].show();
    }
    
}