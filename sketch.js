//grid project 
// what i want it to do 
// 1 - play different audio files in different parts of the grid
// 2 - simultainiously play audio files in a collum
// 3 - have an auto play feature that visually dispays what collum it's playing




//grid sizes 
let gridSize = 10;
let grid;


//line control varriables
let whatLine = 0;
let whatColl = 0;

// i need a way to change+ display the key
let keystate = 4;
let keyAlpha = 0;

let instructionsOnScreen = true;
let helpQue = true;

//grid display
let infoBackground, whiteOrb, yellowOrb, greenOrb, blueOrb, greyOrb, swirlOrb, reallyWhiteOrb, redOrb,keyOrb;
let monoSynth;
let gridState = [];

// premade sounds
let mySound = [];

// non-premade sounds
let velocity;
let time = 0;
let dur = 1/6;
let note = [
  ["A4","B4", "C4", "D4", "E4","F4", "G4","A5", "B5", "C5", "Cscale, A4 to C5 max9"] ,  //Cscale

  ["A4","Bb4", "C4", "D4", "Eb4","F4", "G4","A5", "Bb5", "C5","Bbmajor, A4 to C5 max9"],//Bbmajor
  ["A3","B3", "C3", "D3", "E3","F3", "G3","A4", "B4", "C4","C3scale, A3 to C4, max9"],//C3scale(an octave belov middle C)
  [ "A4","Bb4", "C4", "D4", "E4","F4", "G4","A5", "Bb5", "C5","Fmajor, A4 to C5 max9"], //Fmajor
  [ "C4","Db4", "F4", "F#4", "G4","Bb4", "C5","Db5", "F5", "F#5", "bluesScale, C4 to F#5 max9"],// bluesScale
  [ "B4","D4", "E4", "F#4", "A4","B4", "D5","E5", "F#5", "A5", "Bminor pentatonic, B4 to A5"]// Bminor pentatonic scale
];



function preload(){
  //images and icons
  whiteOrb = loadImage("assets/Lightless.png"); 
  yellowOrb = loadImage("assets/Flameless.png");
  blueOrb = loadImage("assets/BlueOrb.png");
  greenOrb = loadImage("assets/greenOrb.png");
  greyOrb = loadImage("assets/greYOrb.png");
  swirlOrb = loadImage("assets/Empty Orb.png");
  reallyWhiteOrb = loadImage("assets/LightOrb.png");
  redOrb = loadImage("assets/bloodless.png");
  keyOrb = loadImage("assets/Ecto Orb.png");
  infoBackground = loadImage("assets/tvBackground.jpg");

}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  grid = createEmpty2DArray(gridSize, gridSize);

  monoSynth = new p5.PolySynth();
  
  velocity = random();
}

function draw() {
  displayGrid(whatLine, whatColl); 
  keyDisplay(note);
}


function keyPressed(){

  //press any named note on the keyboard(upper and lower case) and it will fill the grid
 
  if (key === "e" ||key === "E" ){
    grid = createEmpty2DArray(gridSize, gridSize, 1);
  }
  if (key === "r"|| key === "R" ){
    grid = createRandom2DArray(gridSize, gridSize);
  }


  // moves linePlayer
  if (keyCode === 40){ //Down Arrow
    if (whatLine < gridSize-1){
      whatLine ++;
    }
  }if (keyCode === 38){ //Up Arrow
    if (whatLine !== 0){
      whatLine --;
    }
  }
  //  moves chordPlayer
  if (keyCode === 39){//right Arrow
    if (whatColl < gridSize-1){
      whatColl ++;
    }   
  }if (keyCode === 37){ //left Arrow
    if (whatColl !== 0){
      whatColl --;
    }
  }
  // changes the Key
  if (keyCode === 49){//1
    if (keystate !== note.length-1){
      keystate ++;
    }   
  }if (keyCode === 50){//2
    if (keystate !== 0){
      keystate --;
    } 
  }
   
  // adjusts lineplayer
  if (key === "l" || key === "L" ){
    linePlayer(whatLine);
  }
  //adjusts chordplayer
  if ( key === "c" ||key === "C"){
    chordPlayer(whatColl);
  }
  if ( key === "Z"||key === "z" ){
    chordLinePlayer();
  }

  //makes the info screen come up & off
  if (key === "h"||key === "H"){
    instructionsOnScreen = !instructionsOnScreen;
  }
  if (key === "i" ||key === "I"){
    helpQue = !helpQue;
  }
}

function  keyDisplay(note){
  
  let ySize = 150;
  
  if (helpQue){
    image(keyOrb, 0, windowHeight - ySize, windowWidth/5, ySize);
    textSize(windowWidth/15);
    text("Press h for Help screen", windowWidth/2, windowHeight/4);
  }

  if (instructionsOnScreen){
    
    image(infoBackground, 0, 0, windowWidth, windowHeight);
    //header text
    textSize(windowWidth/20);
    textStyle(BOLD);
    textFont("Georgia");
    text("Caleb's Digital Synthisizer", windowWidth/2, windowHeight/5);

    //other text
    fill("black");
    textSize(windowWidth/36);
    textFont("Times New Roman");
    text("Here are the Controls:", windowWidth/4, windowHeight/3);
    text("Click on any Orb, and change the Note", windowWidth/2, windowHeight/2.5);
    text(note[keystate][10], windowWidth/2, windowHeight/4);
    text("h for Help, or i for Info will bring you here", windowWidth/2, windowHeight/2);
    text("r will Randomise the grid, while 1 & 2 will change the Key, 3 to see", windowWidth/2, windowHeight/1.7);
    text("CASE Sensitive, p will play the selected Line and arrows adjust Lines", windowWidth/2, windowHeight/1.5);
    text("CASE Sensitive, P will play the selected Column and arrows adjust Columns", windowWidth/2, windowHeight/1.35);
    text("Z will play chords across the grid", windowWidth/2, windowHeight/1.27);

  }
}


function chordLinePlayer(){
  //max chordsize is 8, if gridsize is more than 8 chords are redused to 5
  let temp = whatColl;
  whatColl = 0;
  let chordArray = [];
  for (let b = 0; b <gridSize; b++){   
    
    let chordArray = [];
    
    if (gridSize<9){
      for (let i = 0; i<gridSize; i++){
        chordArray.push(grid[i][whatColl]);   
        playSynth(chordArray[i], 0);
      } 
    }

    // changes what line the chord starts to form at 
    else if(whatLine+5 <=gridSize){
      for (let i = whatLine; i<whatLine+5; i++){
        chordArray.push(grid[i][whatColl]);   
        playSynth(chordArray[i], 0);
      } 
    }

    else{
      for (let i = 0; i<5; i++){
        chordArray.push(grid[i][whatColl]);   
        playSynth(chordArray[i], 0);
      } 
    }
    time += 0.5; 
    if (whatColl < gridSize){
      whatColl ++;
    }   
  }
  time = 0;
  whatColl = temp;
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

function chordPlayer(collumVar){
  // takes in a collum of the grid and plays notes 'simultaniously' to make a chord
  // without changing the tiles
  let chordArray = [];

  for (let i = 0; i<gridSize; i++){
    
    chordArray.push(grid[i][collumVar]);   
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
  monoSynth.play(note[keystate][colorToNote], velocity, myTime, dur);
  
}

function mousePressed() {
  let cellWidth = width/gridSize;
  let cellHeight = height/gridSize;
  let cellX = Math.floor(mouseX/ cellWidth);
  let cellY = Math.floor(mouseY/ cellHeight);
  //will pause for infoscreen
  if (!instructionsOnScreen){
    //number of different notes can be changed here
    if  (grid[cellY][cellX] === 7) {
      playSynth(grid[cellY][cellX],0);
      grid[cellY][cellX]  = 0;
    }
    else{
      playSynth(grid[cellY][cellX], 0);
      grid[cellY][cellX] ++;
    }
  }
  //saved 50 lines 
}

function displayGrid(whatLine, whatColl){
  let myOrbs = [
    whiteOrb, yellowOrb, greenOrb, blueOrb, greyOrb, swirlOrb, reallyWhiteOrb, redOrb
  ];
  let cellWidth = windowWidth/gridSize;
  let cellHeight = windowHeight/gridSize;

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
        fill("Black");
        text(note[keystate][grid[y][x]],x *cellWidth + cellWidth/2, y *cellHeight + cellHeight/2);
      }

      //whatLine display
      else if (y === whatLine && x!== whatColl){
        fill("red");
        textStyle(BOLD);
        text(note[keystate][grid[y][x]],x *cellWidth + cellWidth/2, y *cellHeight + cellHeight/2);
      }

      //whatColl display
      else if (y!== whatLine && x === whatColl){
        fill("purple");
        textStyle(BOLD);
        text(note[keystate][grid[y][x]],x *cellWidth + cellWidth/2, y *cellHeight + cellHeight/2);
      }
      else {
        fill("black");
        textStyle(BOLD);
        text(note[keystate][grid[y][x]],x *cellWidth + cellWidth/2, y *cellHeight + cellHeight/2);
      }
    }
  }
}

function createRandom2DArray(rows,cols){
  let grid = [];
  for (let y = 0; y<rows; y++){
    grid.push([]);
    for (let x = 0; x<cols; x++) {

      // one line to save you from if/ifelse pain
      let possNotes = [0, 0, 1, 2, 3,3,3, 4, 5,5,5, 6,7];

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