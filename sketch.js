const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onsling";
var bg = "bg1.webp";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1366,650);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(700,height,1366,20);
    platform = new Ground(150, 600, 300, 170);
    worldborder = new Ground(1365,290,10,1365)
    worldborder2 = new Ground(682,0,1365,10)
    worldborder3 = new Ground(0,325,10,1365)

    box1 = new Box(700,600,70,70);
    box2 = new Box(920,600,70,70);
    pig1 = new Pig(810, 515);
    log1 = new Log(810,550,300, PI/2);

    box3 = new Box(700,500,70,70);
    box4 = new Box(920,500,70,70);
    pig3 = new Pig(810, 616);

    log3 =  new Log(810,470,300, PI/2);

    box5 = new Box(810,420,70,70);
    log4 = new Log(760,370,150, PI/7);
    log5 = new Log(870,370,150, -PI/7);

    bird = new Bird(200,345);
    
    slingshot = new SlingShot(bird.body,{x:200, y:345});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35);
        fill("white");
        text("Score  " + score, width-300, 50);
    
    Engine.update(engine);
    box1.display();
    box1.score();

    box2.display();
    box2.score();

    pig1.display();
    pig1.score();

    log1.display();
    log1.score();

    box3.display();
    box3.score();

    box4.display();
    box4.score();

    pig3.display();
    pig3.score();

    log3.display();
    log3.score();

    box5.display();
    box5.score();

    log4.display();
    log4.score();

    log5.display();
    log5.score();

    bird.display();
    platform.display();
    worldborder.display();
    worldborder2.display();
    worldborder3.display();
    slingshot.display();    
    ground.display();
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }

}

function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}
function keyPressed(){
    if(keyCode === 32 && bird.body.speed <= 1){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body,{x:200,y:300});
        Matter.Body.setAngle(bird.body,0);
        slingshot.attach(bird.body);
        gameState = "onsling";
    }
}
async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>= 0000 && hour<= 1200){
        bg = "bg1.webp";
    }
    else{
        bg = "bg2.webp";
    }

    backgroundImg = loadImage(bg);
}