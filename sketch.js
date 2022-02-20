var backImage,backgr;
var player , player_running;
var ground,invisibleGround,ground_Img;

var FoodGroup, fishImage;
var ObstaclesGroup,Obstacle_Img;

var gameOver;
var score=0;

function preload(){
  
  backImage=loadImage("water.jpg");
  player_running =loadAnimation("shark.png");
  fishImage = loadImage("fish.png");
  Obstacle_Img = loadImage("jellyFish.png");
 
   
   
}


function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(100,150,800,400);
  backgr.addImage(backImage);
  backgr.scale=9.0;
  backgr.velocityX=-4;
  
  player=createSprite(100,340,20,50);
  player.addAnimation("running",player_running);
  player.scale=0.2;
  
 // ground=createSprite(400,350,900,10);
  //ground.addImage(ground_Img);
 // ground.scale=2.8;
 // ground.velocityX=-4;
 // ground.x=ground.width/2;
  //player.depth=ground.depth+1;
 // ground.x=player;
 
  invisibleGround = createSprite(400,390,800,10);
  invisibleGround.visible = false;
  
  FoodGroup = new Group();
  ObstaclesGroup = new Group();
  
  player.setCollider("rectangle",0,0,player.width,player.height);
  
  
  score=0;
}
  
function draw() {

  background(255);
 
  //if(ground.x<0){
 //  ground.x=ground.width/2; 
  
 // }
  
  if(backgr.x<0){
    backgr.x=backgr.width/2;
  }
  
  switch(score){
      case 10: player.scale=0.12;
              break;
      case 20: player.scale=0.14;
              break;
      case 30: player.scale=0.16;
              break;
      case 40: player.scale=0.18;
              break;
      default:break;
  }
   
  if(keyDown("space") && player.y>=100) {
    player.velocityY = -12;
  } 
  
  player.velocityY = player.velocityY +0.8;
  
  player.collide(invisibleGround);
  
 
  spawnFood();
  spawnObstacles();
  
  if(ObstaclesGroup.isTouching(player)) {
        player.scale=0.08;
      }
  
  if(FoodGroup.isTouching(player)){
    player.scale=0.1;
    FoodGroup.destroyEach();
    score=score +2;
  }
   
drawSprites();
  
stroke("white");
textSize(20);
fill("white");
text("Score:" +score, 500,50);
  
   function spawnFood() {
    if (frameCount % 80 === 0) {
    var fish = createSprite(600,250,40,10);
    fish.y = random(120,200);
    fish.addImage(fishImage);
    fish.scale = 0.1;
    fish.velocityX = -5;
    fish.lifetime = 300;
    player.depth=fish.depth +1;
    FoodGroup.add(fish);
    }
    }
  
     function spawnObstacles(){
   if (frameCount % 300 === 0){
   var Obstacle = createSprite(800,350,10,40);
   Obstacle.velocityX = -6;
   Obstacle.addImage(Obstacle_Img);
   Obstacle.scale = 0.2;
   Obstacle.lifetime = 300;
   player.depth=Obstacle.depth +1;
   ObstaclesGroup.add(Obstacle);
    }
     }
  }
 


