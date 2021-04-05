//Create variables here
var dog,dogImg, happyDogImg, database, foodS, foodStock;
function preload()
{
	dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250,250,5,5);
  dog.scale=  0.2;
  dog.addImage(dogImg);

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    WriteStock(foodS);
    dog.addImage(happyDogImg);
  }

  dog.display();
  drawSprites();
  //add styles here
  fill(255,255,254);
  stroke("black");
  textSize(20);
  text("Food Remaining: " +foodS,170,100);
  textSize(13);
  text("Nore:Press Up Arrow Key To Feed Drago Milk!",130,10,300,20);
}

function readStock(data)
{
    foodS = data.val()
}
function WriteStock(x){
  if(x<=0){
    x=0
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x})
}



