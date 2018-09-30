// var playerWins = 0, playerLosses = 0;
// guesses, playerGuess, computerSecretLetter;
var instructionWindow = document.getElementById("instruction-area");
var currentGameWindow = document.getElementById("game-area");
var scoreWindow = document.getElementById("score-area");
var guessedLettersWindow = document.getElementById("guessed-letters-area");
var alphabet = "abcdefghijklmnopqrstuvwxyz";

var psychicGame = {
	"playerWins": 0,
	"playerLosses": 0,
	"numOfGuesses": 0,
	"listOfGuesses": [],
	"secretLetter": "null",
	"maxGuesses": 9,
	"gameInProgress": false,
	"playerWon": false,

	displayCurrentGuesses: function() {
		if (psychicGame.gameInProgress) {
			currentGameWindow.innerHTML = "<p>You have " + (psychicGame.maxGuesses - psychicGame.numOfGuesses) + " guesses to figure out my letter, or you lose.</p>";
		}
		else {
			currentGameWindow.innerHTML = "";
		}
	},

	displayScore: function() {
		var scoreString = "Wins: " + psychicGame.playerWins + " | Losses: " + psychicGame.playerLosses;
		scoreWindow.innerHTML = scoreString;
	},

	initializeGame: function() {
		instructionWindow.innerHTML = "<p>Press RETURN to start a new game.</p>";
		psychicGame.displayScore();
	},

	startNewGame: function() {
		psychicGame.numOfGuesses = 0;
		psychicGame.gameInProgress = true;
		psychicGame.secretLetter = 'a'; // todo: make this random.
		instructionWindow.innerHTML = "<p>I'm thinking of a letter from a to z.</p>";
		psychicGame.displayCurrentGuesses();
	}

};

function displayGuessedLetters() {
	if (psychicGame.gameInProgress) {
		var guessedLettersString = "";
		for(var i = 0; i < psychicGame.listOfGuesses.length; i++) {
			guessedLettersString += psychicGame.listOfGuesses[i];
			if (i + 1 < psychicGame.listOfGuesses.length) {
				guessedLettersString += ", ";
			}
		}
		guessedLettersWindow.innerHTML = "<p>You have guessed: " + guessedLettersString + ".";
	}
	else {
		guessedLettersWindow.innerHTML = "";
	}
}

function gameIsWon() {
	psychicGame.gameInProgress = false;
	instructionWindow.innerHTML = "<p>Congratulations, you have guessed my letter. Press RETURN to start a new game.</p>";
	psychicGame.playerWins++;
	psychicGame.displayScore();
}

function gameIsLost() {
	psychicGame.gameInProgress = false;
	instructionWindow.innerHTML = "<p>Sorry, you have lost the game. Press RETURN to start a new game.</p>";
	psychicGame.playerLosses++;
	psychicGame.displayScore();
}

function userGuesses(guessLetter) {
	if (guessLetter === psychicGame.secretLetter) {
		gameIsWon();
	}
	else {
		instructionWindow.innerHTML = "<p>Incorrect guess - " + guessLetter + " is not my letter.</p>";
		if (psychicGame.listOfGuesses.indexOf(guessLetter) === -1) {
			psychicGame.numOfGuesses++;
			psychicGame.listOfGuesses.push(guessLetter); // count the guess if the letter wasn't already guessed.
			displayGuessedLetters();
		}
		if (psychicGame.numOfGuesses === psychicGame.maxGuesses) {
			gameIsLost();
		}
	}
	psychicGame.displayCurrentGuesses();
}

// Events
window.onload = psychicGame.initializeGame();

document.onkeyup = function(event) {
	var userKeyPress = event.key;
	if (userKeyPress == "Enter" && !psychicGame.gameInProgress) {
		psychicGame.startNewGame();
	}
	else if (psychicGame.gameInProgress && alphabet.includes(userKeyPress)) {
		userGuesses(userKeyPress);
	}
}
