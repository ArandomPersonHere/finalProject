//grid project 
// what i want it to do 
// 1 - play different audio files in different parts of the grid
// 2 - simultainiously play audio files in a collum
// 3 - have an auto play feature that visually dispays what collum it's playing

//const { PolySynth } = require("p5");


//grid sizes 
let gridSize = 15;
let grid;


//line control varriables
let whatLine = 0;
let whatColl = 0;
 


//grid display
let whiteOrb, yellowOrb, greenOrb,  blueOrb,  greyOrb,  swirlOrb,  reallyWhiteOrb,redOrb;
let monoSynth;
let gridState = [];

// state changer
// I'll need a class i think to hold multiple variables
// it'll need to hold key and display info, possinbly more

// premade sounds
let mySound = [];

// non-premade sounds
let velocity;
let time = 0;
let dur = 1/6;
let note = [
  [ "A4","B4", "C4", "D4", "E4","F4", "G4","A5", "B5", "C5"] , 
  ["A4","Bb4", "C4", "D4", "Eb4","F4", "G4","A5", "Bb5", "C5"]
];

// i need a way to change the key
let Keystate = 1;

let keyNote = new Map();
keyNote.set(0, [ "A4","B4", "C4", "D4", "E4","F4", "G4","A5", "B5", "C5"]);
keyNote.set(1,[ "A4","Bb4", "C4", "D4", "Eb4","F4", "G4","A5", "Bb5", "C5"]);

function preload(){
   
  //premade sounds
  mySound[1] = loadSound("assets/life.wav");
  mySound[2] = loadSound("assets/hjm-tesla_sound_shot.wav");
  mySound[3] = loadSound("assets/loseSound.wav");
  mySound[4] = loadSound("assets/pcp.ogg");

  //images and icons
  whiteOrb = loadImage("assets/Lightless.png"); 
  yellowOrb = loadImage("assets/Flameless.png");
  blueOrb = loadImage("assets/BlueOrb.png");
  greenOrb = loadImage("assets/greenOrb.png");
  greyOrb = loadImage("assets/greYOrb.png");
  swirlOrb = loadImage("assets/Empty Orb.png");
  reallyWhiteOrb = loadImage("assets/LightOrb.png");
  redOrb = loadImage("assets/bloodless.png");

}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2DArray(gridSize, gridSize);

  monoSynth = new p5.PolySynth();
  
  velocity = random();
}

function draw() {
  
  displayGrid(whatLine, whatColl);

}

function keyPressed(){

  //press any named note on the keyboard(upper and lower case) and it will fill the grid
  if (key === "a" ||key === "A" ){
    grid = createEmpty2DArray(gridSize, gridSize);
  }if (key === "b" ||key === "B" ){
    grid = createEmpty2DArray(gridSize, gridSize,1);
  }if (key === "c" ||key === "C" ){
    grid = createEmpty2DArray(gridSize, gridSize, 2);
  }if (key === "d" ||key === "D" ){
    grid = createEmpty2DArray(gridSize, gridSize, 3);
  }if (key === "e" ||key === "E" ){
    grid = createEmpty2DArray(gridSize, gridSize, 4);
  }if (key === "f" ||key === "F" ){
    grid = createEmpty2DArray(gridSize, gridSize, 5);
  }if (key === "g" ||key === "G" ){
    grid = createEmpty2DArray(gridSize, gridSize, 6);
  }
 
  if (key === "r"|| key === "R" ){
    grid = createRandom2DArray(gridSize, gridSize);
  }
  

  // should move linePlayer
  //Down Arrow
  if (keyCode === 40){
    if (whatLine !== gridSize){
      whatLine ++;
    }
  } //Up Arrow
  if (keyCode === 38){
    if (whatLine !== 0){
      whatLine --;
    }
  }
  
  // should move chordPlayer
  if (keyCode === 39){
    //right Arrow
    if (whatColl !== gridSize){
      whatColl ++;
    }   
  }
  if (keyCode === 37){
    //left Arrow
    if (whatColl !== 0){
      whatColl --;
    }
  }
  if (key === "p" ){
    linePlayer(whatLine);
  }
  if ( key === "P" ){
    chordPlayer();
  }


}


function linePlayer(theLine){
  // reads the first line *horizontal* of the grid and plays the notes seperately
  // without changing the tiles
  let notesToPlay = [];
  for (let i = 0; i <gridSize; i++){   

    // time = 0;
    notesToPlay.push(grid[theLine][i]);   
    playSynth(notesToPlay[i], 0.2);
  }
  time = 0;
}

function chordPlayer(){
  // takes in a collum of the grid and plays notes 'simultaniously' to make a chord
  // without changing the tiles

  let chordArray = [];

  for (let i = 0; i<gridSize; i++){
    chordArray.push(grid[i][0]);   
    playSynth(chordArray[i], 0);
  }
  time = 0;
}

function playSynth(colorToNote, delayAdd) {
  userStartAudio();
  // colorToNote give an int, found in randomArray function in the variable possNotes 


  // note velocity (volume, from 0 to 1)
  velocity = random();
  // time from now (in seconds)
  let myTime = time += delayAdd;
  // note duration (in seconds)
  dur = 1/4;

  //monoSynth.play(keyNote.get(Keystate, [colorToNote]), velocity, myTime, dur);
  monoSynth.play(note[Keystate][colorToNote], velocity, myTime, dur);
  
}

function mousePressed() {
  let cellWidth = width/gridSize;
  let cellHeight = height/gridSize;
  let cellX = Math.floor(mouseX/ cellWidth);
  let cellY = Math.floor(mouseY/ cellHeight);

  //master if/else statement to avoid pain
  if  (grid[cellY][cellX] === 7) {
    
    
    playSynth(grid[cellY][cellX],0);
    grid[cellY][cellX]  = 0;
    
  }
  else{
    playSynth(grid[cellY][cellX], 0);
    grid[cellY][cellX] ++;
  }
  //saved 50 lines


  //linePlayer?
  
}



function displayGrid(whatLine, whatColl){
  let myOrbs = [
    whiteOrb, yellowOrb, greenOrb, blueOrb, greyOrb, swirlOrb, reallyWhiteOrb, redOrb
  ];
  let cellWidth = width/gridSize;
  let cellHeight = height/gridSize;

  for (let y = 0; y<gridSize; y++){
    for (let x = 0; x<gridSize; x++){
      // saved 25 lines

      //make grid icons
      //master statement to avoid pain
      image(myOrbs[grid[y][x]],x *cellWidth, y *cellHeight, cellWidth, cellHeight);
      textAlign(CENTER,CENTER);
      textSize(cellHeight/2);

      // main note display
      if ( y !== whatLine && x !== whatColl){
        fill("Blue");
        text(note[Keystate][grid[y][x]],x *cellWidth + cellWidth/2, y *cellHeight + cellHeight/2);
      }

      //whatLine display
      else if (y === whatLine && x!== whatColl){
        fill("red");
        text(note[Keystate][grid[y][x]],x *cellWidth + cellWidth/2, y *cellHeight + cellHeight/2);
      }

      //whatColl display
      else if (y!== whatLine && x === whatColl){
        fill("purple");
        text(note[Keystate][grid[y][x]],x *cellWidth + cellWidth/2, y *cellHeight + cellHeight/2);
      }
      else {
        fill("black");
        text(note[Keystate][grid[y][x]],x *cellWidth + cellWidth/2, y *cellHeight + cellHeight/2);
      }
    }
  }
}

function createRandom2DArray(rows,cols, numToFill = 0){
  let grid = [];
  for (let y = 0; y<rows; y++){
    grid.push([]);
    for (let x = 0; x<cols; x++) {

      // one line to save you from if/ifelse pain
      let possNotes = [0, 0, 1, 2, 2, 3, 4, 5, 6,7];

      grid[y].push(random(possNotes));
      // // saves 20 lines

    }
  }
  return grid;
}


function createEmpty2DArray(rows,cols,numToFill= 0){
  let grid = [];
  for (let y = 0; y<rows; y++){
    grid.push([]);
    for (let x = 0; x<cols; x++){
      grid[y].push(numToFill);
    }
  }
  return grid;
}