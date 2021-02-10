const app = document.getElementById("app");
const scoreBoard = document.getElementById("score");
const holes = document.getElementsByClassName("hole");
const contentHoles = document.getElementById("container-a-mole");
const buttonStart = document.getElementById("btn-start");
const buttonStop = document.getElementsByClassName("btn-stop");
const liveBoard = document.getElementById("live");
const levelBoard = document.getElementById("level");
const timeBoard = document.getElementById("timeGame");
const jokerLose = new Audio("src/son/joker-lose.mp3");
const jokerTouch = new Audio ("src/son/coup.mp3");
const soundLevel = new Audio("src/son/chauve-souris.mp3");
let levelUp = false;
let lastHoles;
let score = 0;
let live = 5;
let level = 1;
let timeGame = 120;
let timeUpMole;
let holeActive;
let changeMole;
let interval;

buttonStart.addEventListener("click", startGame);

// fonction timer pour lancer le temps du jeu
function timer(){
  interval = setInterval(decompte, 1000);
}

function decompte(){
  if(timeGame === 0){
    timeBoard.textContent = 0;
    stopGame();
  }
  else{
    timeBoard.textContent = timeGame;
  }
  timeGame--;
}

/* La fonction Math.floor(x) renvoie le plus grand entier qui est inférieur ou égal à un nombre  */
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
  timeUpMole = 5000;
  scoreBoard.textContent = score;
  liveBoard.textContent = live;
  levelBoard.textContent = level;
  buttonStart.textContent = "Stop";
  buttonStart.classList.add("btn-stop");
  buttonStart.removeEventListener("click", startGame);
  // addEventListener se met sur un élement si j'ai un calsse je dois pécifier a quel niveau je veux le placer ou bouclé sur toutes les classe
  buttonStop[0].addEventListener("click", stopGame);
}

function stopGame(){
  // permet de supprimer le timeout et supprimer l'ajout de la classe active-a-mole
  clearTimeout(changeMole);
  clearInterval(interval);
  contentHoles.removeEventListener("click", wack);
}

function wack(e) {
  
  if (!e.target.classList.contains("mole")) {
    live--;
    liveBoard.textContent = live;
    jokerLose.play();
    if(live === 0){
      stopGame();
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

  let span = document.createElement("span");
  let span1 = document.createElement("span");
  let span2 = document.createElement("span");
  let span3 = document.createElement("span");
  let span4 = document.createElement("span");
  let span5 = document.createElement("span");

  let h2Loose = document.createElement("h2");

  let text = document.createTextNode("HA");
  let text1 = document.createTextNode("HA");
  let text2 = document.createTextNode("HA");
  let text3= document.createTextNode("HA");
  let text4 = document.createTextNode("HA");
  let text5 = document.createTextNode("HA");
  let textLoose = document.createTextNode("You lose");

  div.classList.add("text-lose");

  div.appendChild(span).appendChild(text);
  div.appendChild(span1).appendChild(text1);
  div.appendChild(span2).appendChild(text2);
  div.appendChild(span3).appendChild(text3);
  div.appendChild(span4).appendChild(text4);
  div.appendChild(span5).appendChild(text5);
  div.appendChild(span5).appendChild(text5);
  div.appendChild(h2Loose).appendChild(textLoose);
  app.appendChild(div);
}
