let imgMain;
let thrs = 0.4;
let scl = 16;
let wimg;
let tslider;
let sslider;
let button;
let thrstext;
let scltext;
let comments = `abcdefghijklmnopqrstuvwxyz`;
let cmts = [];
let pos = -1;

function preload() {
    imgMain = loadImage("image.jpg");
}

function processesComments() {
    for(let i = 0; i < comments.length; i++) {
        if(comments[i].toUpperCase() != comments[i].toLowerCase()) {
            cmts.push(comments[i]);
        }
    }
}

function nextChar() {
    pos++;
    if(pos == cmts.length) {
        pos = 0;
    }
    return cmts[pos];
}

function setup() {
    createCanvas(800, 600);
    processesComments();
    thrstext = createP("Threshold: 0.4");

    tslider = createSlider(0, 1, 0.4, 0.01);
    //tslider.position(0.4, 0.4);
    thrs = tslider.value();

    scltext = createP("Scale: 16");
    sslider = createSlider(1, 50, 16, 1);
    //sslider.position(16, 16);
    scl = sslider.value();

    button = createButton('Update');
    //button.position(19, 19);
    button.mousePressed(updateImg);

    button = createButton('Download Image');
    button.mousePressed(downloadImg);

    imgMain.resize(0, 200);

    w2i();
}


function w2i() {
    let img = createImage(imgMain.width, imgMain.height);
    img.copy(imgMain, 0, 0, imgMain.width, imgMain.height, 0, 0, imgMain.width, imgMain.height);
    //img.filter(THRESHOLD, thrs);    
    //wimg = createGraphics(img.width * scl, img.height * scl);
    wimg = createGraphics(img.width * (scl - (scl / 2)), img.height * (scl - (scl / 2)));
    wimg.background(255);    
    wimg.fill(0);
    wimg.textSize(scl);
    wimg.textAlign(CENTER, CENTER);
    img.loadPixels();
    
    for(let i = 0; i < img.height; i++) {
        for(let j = 0; j < img.width; j++) {
            index = (j + i * img.width) * 4;
            //if(img.pixels[index] == 0) {    
             
                wimg.fill(img.pixels[index] , img.pixels[index + 1], img.pixels[index + 2]);                
                wimg.text(nextChar(), j * (scl - (scl / 2)), i * (scl - (scl / 2)));
                //wimg.text(nextChar(), j * scl, i * scl);
            //} 
        }
    }

    img.updatePixels();    
    resizeCanvas(wimg.width, wimg.height);
    image(wimg, 0, 0);

}

function updateImg() {
    thrs = tslider.value();
    scl = sslider.value();
    thrstext.elt.textContent = "Threshold: " + thrs;
    scltext.elt.textContent = "Scale: " + scl;
    console.log(thrs, scl);
    w2i();

}

function downloadImg() {
    saveCanvas(wimg, "wordimg", "jpg");
}
