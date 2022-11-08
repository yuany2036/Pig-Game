'use strict';

// ! Defining the numbers

let playerOneScore;
let playerTwoScore;
let current;

// ! Active player checker, returns a boolean

let activePlayer = () => playerOne.classList.contains("player--active");

// ! Player specific section, contains class which defines the active player

const playerOne = document.querySelector(".player--0");
const playerTwo = document.querySelector(".player--1");

// ! Where the aggregate scores of players are displayed

let playerOneScoreDisplay = document.querySelector("#score--0");
let playerTwoScoreDisplay = document.querySelector("#score--1");

// ! Where the current score is displayed

let playerOneCurrent = document.querySelector("#current--0");
let playerTwoCurrent = document.querySelector("#current--1");

// ! Roll dice, hold, new game buttons and the dice image

const newGameButton = document.querySelector(".btn--new");
const diceImg = document.querySelector(".dice");
const rollButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");

// ! Changing which current score is active

let currentDisplay = document.querySelector(`#current--${activePlayer ? "0" : "1"}`);

// ! Resetting the game

reset();

// ! Event listener for pressing the new game button

newGameButton.addEventListener("click", reset)

// Functions

function endTurn() {
    current = 0;
    currentDisplay.textContent = current;
    switchPlayer();
}

function winCheck(score) {
    if (score >= 100) {
        gameOver();
        if (activePlayer())
            playerOne.classList.add("player--winner");
        else
            playerTwo.classList.add("player--winner");
    }
}

function gameOver() {
    holdButton.removeEventListener("click", holdButtonEvent);
    rollButton.removeEventListener("click", rollButtonEvent);
}

function rollButtonEvent() {
    const roll = Math.ceil(Math.random() * 6);
    diceImg.setAttribute("src", `dice-${roll}.png`);
    if (roll === 1) {
        endTurn();
        return;
    }
    current += roll;
    currentDisplay.textContent = current;
}

function holdButtonEvent() {
    if (activePlayer()) {
        playerOneScore += current;
        playerOneScoreDisplay.textContent = playerOneScore;
        winCheck(playerOneScore);
    }
    else {
        playerTwoScore += current;
        playerTwoScoreDisplay.textContent = playerTwoScore;
        winCheck(playerTwoScore);
    }
    endTurn();
}

function switchPlayer() {
    document.querySelector(".player--0").classList.toggle("player--active");
    document.querySelector(".player--1").classList.toggle("player--active");
    currentDisplay = document.querySelector(`#current--${playerOne.classList.contains("player--active") ? "0" : "1"}`);
}

function reset() {
    playerOneScore = 0;
    playerTwoScore = 0;
    current = 0;
    playerOneScoreDisplay.textContent = playerOneScore;
    playerTwoScoreDisplay.textContent = playerTwoScore;
    if (!activePlayer()) {
        switchPlayer();
    }
    playerOne.classList.remove("player--winner");
    playerTwo.classList.remove("player--winner");
    // ! Event listener for pressing the roll button
    rollButton.addEventListener("click", rollButtonEvent)
    // ! Event listener for pressing the hold button
    holdButton.addEventListener("click", holdButtonEvent);
}