var shinChan,shinChanImg;
var capsicum,capsicumImg;
var chocochips,chocochipsImg;
var bgImg;
var score=0;
var ground,invisibleG;
var gameOver,gameOverImg,restart,restartImg,youWonImg;
var obstaclesGroup,pointsGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  //loading images
  shinChanImg=loadImage("hfh.png");
  chocochipsImg=loadImage("sample (1).png");
  bgImg=loadImage("n.jpg");
  gameOverImg=loadImage("abc.png");
  restartImg=loadImage("restart.png");
  capsicumImg=loadImage("hfh (1).png");
  youWonImg=loadImage("you won.png");
}


function setup(){
  canvas = createCanvas(1350,630); 

  //creating sprites
ground=createSprite(645,300,1000,1000);
ground.addImage(bgImg);
ground.scale=2.5;
ground.y=ground.height/2;

shinChan=createSprite(675,500,50,50);
shinChan.addImage(shinChanImg)
shinChan.scale=0.4;

gameOver=createSprite(675,200,50,50);
gameOver.addImage(gameOverImg)
gameOver.scale=0.5;
gameOver.visible=false;

restart=createSprite(675,400,50,50);
restart.addImage(restartImg)
restart.scale=0.5;
restart.visible=false;

obstaclesGroup = new Group();
pointsGroup= new Group();

}


function draw(){
 background("white")

if(gameState === PLAY){
  ground.velocityY=-2;
  if(ground.y<130){
    ground.y=ground.height/2
  }
  
  spawnPoints();
  spawnObstacles();

//moving the character
if(keyDown(LEFT_ARROW)&& shinChan.x>300){
  shinChan.x=shinChan.x-10;
}
if(keyDown(RIGHT_ARROW) && shinChan.x<900){
  shinChan.x=shinChan.x+10;
}
if(obstaclesGroup.isTouching(shinChan)){
  gameState=END;
}
if(pointsGroup.isTouching(shinChan)){
  score+=50
  pointsGroup.destroyEach();
}

}

else if(gameState === END){
ground.velocityY=0;
obstaclesGroup.setVelocityEach=0;
  pointsGroup.setVelocityEach=0;
  obstaclesGroup.destroyEach();
  pointsGroup.destroyEach();
  gameOver.visible=true;
  restart.visible=true;
}

//to restart the game
if(mousePressedOver(restart)) {
  reset();
}

if(score===200){
  gameOver.visible=true;
  gameOver.addImage(youWonImg)
  gameState=END;
}
 drawSprites();

 textSize(30);
textFont("calligraphy")
fill("blue")
text("POINTS: "+score,100,50);
text("Made by:-",1100,30);
text("Poornima Singh",1100,65);
text("To win the game reach 200 points",400,30)

}

function spawnObstacles(){
  if(frameCount%150===0){
    capsicum=createSprite(Math.round(random(500,700)),00);
    capsicum.addImage(capsicumImg)
    capsicum.scale=0.2;
    capsicum.velocityY=3;
    obstaclesGroup.add(capsicum);
    }
}

function spawnPoints(){
  if(frameCount%200===0){
    chocochips=createSprite(Math.round(random(400,800)),00);
    chocochips.addImage(chocochipsImg)
    chocochips.scale=0.2;
    chocochips.velocityY=3;
    pointsGroup.add(chocochips);
    pointsGroup.setLifeTimeEach=300;
    }
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  score=0;
  obstaclesGroup.destroyEach();
  pointsGroup.destroyEach();
}