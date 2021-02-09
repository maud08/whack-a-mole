const scoreBoard = document.getElementById("score");
const holes = document.getElementsByClassName("hole");
const contentHoles = document.getElementById("container-a-mole");
const buttonStart = document.getElementById("btn-start");
const buttonStop = document.getElementsByClassName("btn-stop");
const liveBoard = document.getElementById("live");
const levelBoard = document.getElementById("level");
const jokerLose = new Audio("src/son/joker-lose.mp3");
const jokerTouch = new Audio ("src/son/coup.mp3");
const soundLevel = new Audio("src/son/chauve-souris.mp3");
let levelUp = false;
let lastHoles;
let score = 0;
let live = 5;
let level = 1;
let time;
let holeActive;
let changeMole;

buttonStart.addEventListener("click", startGame);

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
      time = time / 2;
    }
    showTheMole();
    levelUp = false;
    return;
  }, time);
}

function startGame() {
  showTheMole();
  time = 3000;
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
  contentHoles.removeEventListener("click", wack);
}

function wack(e) {
  if (!e.target.classList.contains("mole")) {
    live--;
    liveBoard.textContent = live;
    jokerLose.play();
    if(live === 0){
      stopGame();
    }
  } else if (score >= 6) {
    level++;
    levelBoard.textContent = level;
    score = 0;
    levelUp = true;
    soundLevel.play();
  } else{
    score++;
    jokerTouch.play();
    e.target.parentNode.classList.remove("active-a-mole");
    scoreBoard.textContent = score;
  }
  
}
