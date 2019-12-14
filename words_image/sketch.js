let imgMain;
let thrs = 0.4;
let scl = 16;
let wimg;
let tslider;
let sslider;
let button;
let thrstext;
let scltext;
let comments = `In case you fail in MS do drugs, till then enjoy and all the best. Miss you raa Pranav !! However all the best !!Energetic and fun loving person Not to forget, your sarcasm is peaks. All the best for your future!Be Brave dude!!! Have a very bright future...You are one of the disciplined and well mannered people I met so far. All the best and Take careYou have been a good friend and a great help..good luck 😊All the best buddy!New Chapter...New Beginnings...all the very best...loads of success waiting your way.Your down to earth nature never made me feel that you were my senior....surely gonna miss you. Hope we meet again.Being calm and patient even in a very stressful situation makes you different from others. And am surely gonna miss that smiling face opposite to me which holds lots of positivity.Calm, simple, patient but also a silent killer.I’m seriously going to miss you here. Best of luck in your new endeavor. See you soon! Manchi tella pillani Patti Pelli cheskoo..Hey pranav.... . HiAll the best Pranav. Hope you get all you want.Big house small house pranav gaadu mansion house123 pranav gaadu kantriMaaza fruity pranav gaadu naughtyJil jil jiga maa pranav gaadu segaMaa pranav gaadu thopu neeku dammunte aapuMaa pranav gaadu thopu neeku dammunte aapuI'd take a nerf bullet for yuMaa pranav gaadu thopu neeku dammunte aapuI like yu because yu join in on my wierdnessGood bye...you're dead to me now😛😂I'll miss you until you come back but I hope you'll make up for it by getting me awesome gifts. Bon voyageWe really believe leaving this company is the first big step into a great future for you. We wish you lots of success.Great to hear that you’re going away. I can’t wait to hear that you have been crowned as the “phone lover” at the workplace😅Today we are going to lose his sense of humor. Farewell to the guy who made every day seem like Sunday with his jokes and enthusiasm.I wish you the spirit of exploration. You're going to be in a brand new place, so explore it!Stay well and remember us always! Atleast now Focus on 'studies' not on 'girls' 😜😆Life will go on with or without you here. But the good times with yu will be missed. I wish you all the best for the new life abroad.Don't ever rob a bank..enjoy life! Have funBe who yu are and say wat yu feel becoz those who mind don't matter and those who matter don't mind. Phone matladam taginchu ra koncham. Pappaaaani perugu Annam thinu manchiga :P don't miss me much hehe. Pranav is a good boy who takes good care of his frnds or everybody who are close to him. And he is very much emotional and very close to his parents and also having zeal to get success in life. And I will pranav "ALL THE BEST".`;
let cmts = [];
let pos = -1;
let fnt;

function preload() {
    imgMain = loadImage("image.jpg");
    fnt = loadFont("font.ttf");
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
    wimg = createGraphics(img.width * (scl - (scl / 3)), img.height * (scl - (scl / 3)));
    wimg.background(0);    
    wimg.fill(0);
    wimg.textSize(scl + 2);
    wimg.textAlign(CENTER, CENTER);
    wimg.textFont(fnt);
    img.loadPixels();
    
    for(let i = 0; i < img.height; i++) {
        for(let j = 0; j < img.width; j++) {
            index = (j + i * img.width) * 4;
            //if(img.pixels[index] == 0) {                                                                       
                wimg.fill(img.pixels[index] , img.pixels[index + 1], img.pixels[index + 2]);                
                wimg.text(nextChar(), j * (scl - (scl / 3)), i * (scl - (scl / 3)));
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
