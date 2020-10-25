/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const player0El = document.querySelector(".player-0-panel");
const player1El = document.querySelector(".player-1-panel");

const currentScore0 = document.querySelector("#current-0");
const currentScore1 = document.querySelector("#current-1");
const score0 = document.querySelector("#score-0");
const score1 = document.querySelector("#score-1");
const playerName1 = document.querySelector("#name-0");
const playerName2 = document.querySelector("#name-1");

const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnNew = document.querySelector(".btn-new");
const displayDice = document.querySelector(".dice");

let dice, scores, activePlayer, roundScore;
let gamePlaying = true;

init();

btnRoll.addEventListener("click", function () {
  if (gamePlaying) {
    //1. Random number
    dice = Math.floor(Math.random() * 6 + 1);
    displayDice.src = "dice-" + dice + ".png";
    displayDice.style.display = "block";

    //2.Update score
    if (dice !== 1) {
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      displayDice.style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.querySelector("#current-" + activePlayer).textContent = 0;

  player0El.classList.toggle("active");
  player1El.classList.toggle("active");

  displayDice.style.display = "none";
}

btnNew.addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  displayDice.style.display = "none";

  currentScore0.textContent = 0;
  score0.textContent = 0;
  currentScore1.textContent = 0;
  score1.textContent = 0;
  playerName1.textContent = "Player 1";
  playerName2.textContent = "Player 2";
  player0El.classList.remove("winner");
  player1El.classList.remove("winner");
  player0El.classList.remove("active");
  player1El.classList.remove("active");
  player0El.classList.add("active");
}
