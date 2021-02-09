const scoreBoard = document.getElementById("score");
const holes = document.getElementsByClassName("hole");
const contentHoles = document.getElementById("container-a-mole");
const buttonStart = document.getElementById("btn-start");
const liveBoard = document.getElementById("live");
const levelBoard = document.getElementById("level");
const jokerLose = new Audio("src/son/joker-lose.mp3");
let levelUp = false;
let lastHoles;
let score = 0;
let live = 5;
let level = 1;
let time;

buttonStart.addEventListener("click", startGame);
contentHoles.addEventListener("click", wack, false);

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
  const holeActive = randomHole(holes);
  holeActive.classList.add("active-a-mole");
  if (live <= 0) {
    scoreBoard.textContent = 0;
    liveBoard.textContent = 0;
    return;
  }
  setTimeout(() => {
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
}

function wack(e) {
  if (!e.target.classList.contains("mole")) {
    live--;
    liveBoard.textContent = live;
    jokerLose.play();
  } else if (score >= 6) {
    level++;
    levelBoard.textContent = level;
    score = 0;
    levelUp = true;
  } else {
    score++;
    this.parentNode.classList.remove("active-a-mole");
    scoreBoard.textContent = score;
  }
}
