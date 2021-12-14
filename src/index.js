const app = document.getElementById("app");
const scoreBoard = document.getElementById("score");
const holes = document.getElementsByClassName("hole");
const contentHoles = document.getElementById("container-a-mole");
const buttonStart = document.getElementById("btn-start");
const buttonPause = document.getElementsByClassName("btn-pause");
const liveBoard = document.getElementById("live");
const levelBoard = document.getElementById("level");
const timeBoard = document.getElementById("timeGame");
const buttonSound = document.getElementById("sound");
const jokerLose = new Audio("src/son/joker-lose.mp3");
const jokerTouch = new Audio ("src/son/coup.mp3");
const soundLevel = new Audio("src/son/chauve-souris.mp3");
let levelUp = false;
let lastHoles;
let score = 0;
let live = 5;
let level = 1;
let timeGame = 120;
let timeUpMole = 5000;
let holeActive;
let changeMole;
let interval;

buttonStart.addEventListener("click", startGame);
buttonSound.addEventListener("click", soundGame);



// fonction timer pour lancer le temps du jeu
function timer(){
  interval = setInterval(decompte, 1000);
}

function decompte(){
  if(timeGame === 0){
    timeBoard.textContent = 0;
    pauseGame();
  }
  else{
    timeBoard.textContent = timeGame;
  }
  timeGame--;
}


function randomHole(holes) {
  let index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHoles) {
        return randomHole(holes);
    }
    lastHoles = holes;
    return hole;
}

function showTheMole() {
  contentHoles.addEventListener("click", wack, false);
  holeActive = randomHole(holes);
  holeActive.classList.add("active-a-mole");
  if (live <= 0) {
    scoreBoard.textContent = 0;
    liveBoard.textContent = 0;
    return;
  }
  changeMole = setTimeout(() => {
    holeActive.classList.remove("active-a-mole");
    if (levelUp === true) {
      timeUpMole = timeUpMole / 2;
    }
    showTheMole();
    levelUp = false;
    return;
  }, timeUpMole);
}

function startGame() {
  showTheMole();
  timer();
  scoreBoard.textContent = score;
  liveBoard.textContent = live;
  levelBoard.textContent = level;
  buttonStart.textContent = "Pause";
  buttonStart.classList.add("btn-pause");
  buttonStart.removeEventListener("click", startGame);
 
  buttonPause[0].addEventListener("click", pauseGame);
}

function pauseGame(){
 
  clearTimeout(changeMole);
  clearInterval(interval);
  holeActive.classList.remove("active-a-mole");
  contentHoles.removeEventListener("click", wack);
  buttonStart.textContent = "Start";
  buttonStart.addEventListener("click", startGame);
}

function wack(e) {
  
  if (!e.target.classList.contains("mole")) {
    live--;
    liveBoard.textContent = live;
    jokerLose.play();
    
    if(live === 0){
      pauseGame();
      lose();
    }
  } else if (score !== 0 && (score % 6) === 0) {
    score++;
    level++;
    levelBoard.textContent = level;
    levelUp = true;
  } else{
    score++;
    jokerTouch.play();
    e.target.parentNode.classList.remove("active-a-mole");
    scoreBoard.textContent = score;
  }
}

function lose(){
  app.classList.add("lose");
  let div = document.createElement("div");
  let divSpan = document.createElement("div");

  let span = document.createElement("span");
  let span1 = document.createElement("span");
  let span2 = document.createElement("span");
  let span3 = document.createElement("span");
  let span4 = document.createElement("span");
  let span5 = document.createElement("span");

  let h2Loose = document.createElement("h2");

  let btnTryAgain = document.createElement("button");

  let text = document.createTextNode("HA");
  let text1 = document.createTextNode("HA");
  let text2 = document.createTextNode("HA");
  let text3= document.createTextNode("HA");
  let text4 = document.createTextNode("HA");
  let text5 = document.createTextNode("HA");
  let textLoose = document.createTextNode("You lose");
  let texTryAgain = document.createTextNode("Try again !");

  div.classList.add("lose-content");
  divSpan.classList.add("text-lose");
  btnTryAgain.id = "btn-tryAgain";



  divSpan.appendChild(span).appendChild(text);
  divSpan.appendChild(span1).appendChild(text1);
  divSpan.appendChild(span2).appendChild(text2);
  divSpan.appendChild(span3).appendChild(text3);
  divSpan.appendChild(span4).appendChild(text4);
  divSpan.appendChild(span5).appendChild(text5);


  div.appendChild(h2Loose).appendChild(textLoose);
  div.appendChild(btnTryAgain).appendChild(texTryAgain);
  div.appendChild(divSpan);
  app.appendChild(div);

  btnTryAgain.addEventListener("click", tryAgain);
  
}

function soundGame(){
  let src = buttonSound.getAttribute("src");
  if(src === "./src/img/sound_on.svg"){
    jokerLose.muted = true;
    jokerTouch.muted = true;
    soundLevel.muted = true;
    buttonSound.setAttribute("src","./src/img/sound_off.svg");

  }else{
    jokerLose.muted = false;
    jokerTouch.muted = false;
    soundLevel.muted = false;
    buttonSound.setAttribute("src","./src/img/sound_on.svg");
  }
}

function tryAgain() {
  let loseContent = document.getElementsByClassName("lose-content")[0];
  startGame();
  app.classList.remove("lose");
  app.removeChild(loseContent);
}


