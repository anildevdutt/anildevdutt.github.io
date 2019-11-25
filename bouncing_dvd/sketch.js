let dvd;
let img_w = 200;
let img_h = 100;
let img_x = 0;
let img_y = 0;
let flag = 0;
let r = 255, g = 255, b = 255;
let speed = 2;

function preload() {
    dvd = loadImage("dvd_invers.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    img_x = floor(random(width - img_w));
    img_y = floor(random(height - img_h));
}

function updateDvd() {
    switch(flag) {
        case 0: //x++, y++            
            img_x++; 
            img_y++;
            if(img_x >= width - img_w && img_y >= height - img_h) {
                flag = 3;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
            if(img_x > width - img_w && img_y < height - img_h) {
                flag = 1;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
            if(img_x < width - img_w && img_y > height - img_h) {
                flag = 2;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
        break;
        case 1: // x--, y++            
            img_x--; 
            img_y++;
            if(img_x <= 0 && img_y >= height - img_h) {
                flag = 2;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
            if(img_x > 0 && img_y >= height - img_h) {
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
                flag = 3;
            }
            if(img_x <= 0 && img_y < height - img_h) {                
                flag = 0;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
        break;
        case 2: //x++, y--;            
            img_x++; 
            img_y--;
            if(img_x >= width - img_w && img_y <= 0) {
                flag = 1;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
            if(img_x >= width - img_w && img_y > 0) {
                flag = 3;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
            if(img_x < width - img_w && img_y <= 0) {
                flag = 0;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
        break;
        case 3: //x--, y--            
            img_x--; 
            img_y--;
            if(img_x <= 0 && img_y <= 0) {
                flag = 0;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
            if(img_x <= 0 && img_y > 0) {
                flag = 2;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
            if(img_x > 0 && img_y <= 0) {
                flag = 1;
                r = 100 + floor(random(155));
                g = 100 + floor(random(155));
                b = 100 + floor(random(155));
            }
        break;

    }
}

function draw() {
    background(0);
    for(let i = 0; i < speed; i++)
        updateDvd();
    color(r, g, b);
    fill(r, g, b);
    rect(img_x, img_y, img_w, img_h);    
    image(dvd, img_x, img_y, img_w, img_h);
}