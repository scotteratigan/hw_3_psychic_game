// var playerWins = 0, playerLosses = 0;
// guesses, playerGuess, computerSecretLetter;
var instructionWindow = document.getElementById("instruction-area");
var currentGameWindow = document.getElementById("game-area");
var scoreWindow = document.getElementById("score-area");
var guessedLettersWindow = document.getElementById("guessed-letters-area");

var psychicGame = {
	"alphabet": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
	"gameInProgress": false,
	"listOfGuesses": [],
	"maxGuesses": 9,
	"numOfGuesses": 0,
	"playerLosses": 0,
	"playerWins": 0,
	"playerWon": false,
	"secretLetter": "null",

	displayCurrentGuesses: function() {
		if (psychicGame.gameInProgress) {
			currentGameWindow.innerHTML = "<p>You have " + (psychicGame.maxGuesses - psychicGame.numOfGuesses) + " guesses remaining to figure out my letter, or you lose.</p>";
		}
		else {
			currentGameWindow.innerHTML = "";
		}
	},

	displayGuessedLetters: function() {
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
	},

	displayScore: function() {
		var scoreString = "Wins: " + psychicGame.playerWins + " | Losses: " + psychicGame.playerLosses;
		scoreWindow.innerHTML = scoreString;
	},

	gameIsLost: function() {
		psychicGame.gameInProgress = false;
		instructionWindow.innerHTML = "<p>Sorry, you have lost the game. Press RETURN to start a new game.</p>";
		psychicGame.playerLosses++;
		psychicGame.displayScore();
	},

	gameIsWon: function() {
		psychicGame.gameInProgress = false;
		instructionWindow.innerHTML = "<p>Congratulations, " + psychicGame.secretLetter + " was my letter. Press RETURN to start a new game.</p>";
		psychicGame.playerWins++;
		psychicGame.displayScore();
	},

	initializeGame: function() {
		instructionWindow.innerHTML = "<p>Press RETURN to start a new game.</p>";
		psychicGame.displayScore();
	},

	startNewGame: function() {
		psychicGame.numOfGuesses = 0;
		psychicGame.gameInProgress = true;
		psychicGame.secretLetter = 'a'; // todo: make this random.
		psychicGame.secretLetter = psychicGame.alphabet[Math.floor(Math.random() * psychicGame.alphabet.length)];
		instructionWindow.innerHTML = "<p>I'm thinking of a letter from a to z.</p>";
		psychicGame.listOfGuesses = [];
		psychicGame.displayCurrentGuesses();
	},

	userGuesses: function(guessLetter) { // todo: grab value from class instead of passing it as argument
		if (guessLetter === psychicGame.secretLetter) {
			psychicGame.gameIsWon();
		}
		else {
			instructionWindow.innerHTML = "<p>Incorrect guess - " + guessLetter + " is not my letter.</p>";
			if (psychicGame.listOfGuesses.indexOf(guessLetter) === -1) {
				psychicGame.numOfGuesses++;
				psychicGame.listOfGuesses.push(guessLetter); // count the guess if the letter wasn't already guessed.
				psychicGame.displayGuessedLetters();
			}
			if (psychicGame.numOfGuesses === psychicGame.maxGuesses) {
				psychicGame.gameIsLost();
			}
		}
		psychicGame.displayCurrentGuesses();	
	}
};

// Events
window.onload = psychicGame.initializeGame();

document.onkeyup = function(event) {
	var userKeyPress = event.key;
	if (userKeyPress == "Enter" && !psychicGame.gameInProgress) {
		psychicGame.startNewGame();
	}
	else if (psychicGame.gameInProgress && psychicGame.alphabet.indexOf(userKeyPress) > -1) {
		psychicGame.userGuesses(userKeyPress);
	}
}
