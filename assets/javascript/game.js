var instructionWindow = document.getElementById("instruction-area");
var currentGameWindow = document.getElementById("game-area");
var scoreWindow = document.getElementById("score-area");
var guessedLettersWindow = document.getElementById("guessed-letters-area");

// I'm really not clear on why the path requires linking like this instead of ../sounds/notapsychic.m4a - perhaps has to do with exactly how files are actually linked in browser
var notAPsychicSound = new Audio("assets/sounds/notapsychic.m4a");
var propheciesTrueSound = new Audio("assets/sounds/propheciestrue.m4a");
var backroundMusic = new Audio("assets/sounds/xfilesthemeshortbackground.mp3");
// Todo: add fallback option for old computers that don't support mp3 or m4a?

var psychicGame = {
	"alphabet": ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
	"gameInProgress": false,
	"listOfGuesses": [],
	"maxGuesses": 9,
	"numOfGuesses": 0,
	"playerLosses": 0,
	"playerWins": 0,
	"playerWon": false,
	"playSounds": false,
	"secretLetter": "null",
	// "notAPsychicSound": new Audio("assets/sounds/notapsychic.m4a"),
	// "propheciesTrueSound": new Audio("assets/sounds/propheciestrue.m4a"),
	// "backgroundMusic": new Audio("assets/sounds/xfilesthemeshortbackground.mp3"),

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
			guessedLettersWindow.innerHTML = "<p>You guessed: " + guessedLettersString + ".";
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
		if (psychicGame.playSounds) {
			backroundMusic.pause();
			notAPsychicSound.load(); // loading to ensure we start from beginning
			notAPsychicSound.play();
		}
		instructionWindow.innerHTML = "<p>Sorry, you have lost the game. My letter was " + psychicGame.secretLetter + ". Press RETURN to start a new game.</p>";
		psychicGame.playerLosses++;
		psychicGame.displayScore();
	},

	gameIsWon: function() {
		psychicGame.gameInProgress = false;
		if (psychicGame.playSounds) {
			backroundMusic.pause();
			propheciesTrueSound.load();
			propheciesTrueSound.play();
		}
		instructionWindow.innerHTML = "<p>Congratulations, " + psychicGame.secretLetter + " was my letter. Press RETURN to start a new game.</p>";
		guessedLettersWindow.innerHTML = "";
		psychicGame.playerWins++;
		psychicGame.displayScore();
	},

	initializeGame: function() {
		instructionWindow.innerHTML = "<p>Press RETURN to start a new game.</p>";
	},

	startNewGame: function() {
		if (psychicGame.playSounds && backroundMusic.paused) { // don't re-start if theme is already playing or sound is disabled
			backroundMusic.load(); // reload to start theme at the beginning
			backroundMusic.play();
		}
		psychicGame.numOfGuesses = 0;
		psychicGame.gameInProgress = true;
		psychicGame.secretLetter = 'a'; // todo: make this random.
		psychicGame.secretLetter = psychicGame.alphabet[Math.floor(Math.random() * psychicGame.alphabet.length)];
		instructionWindow.innerHTML = "<p>I'm thinking of a letter from a to z.</p>";
		guessedLettersWindow.innerHTML = "";
		psychicGame.listOfGuesses = [];
		psychicGame.displayCurrentGuesses();
	},

	userGuesses: function(guessLetter) { // todo: grab value from class instead of passing it as argument
		if (guessLetter === psychicGame.secretLetter) {
			psychicGame.gameIsWon();
		}
		else {
			if (psychicGame.listOfGuesses.indexOf(guessLetter) === -1) {
				instructionWindow.innerHTML = "<p>Incorrect guess - " + guessLetter + " is not my letter.</p>";
				psychicGame.numOfGuesses++;
				psychicGame.listOfGuesses.push(guessLetter); // count the guess if the letter wasn't already guessed.
				psychicGame.displayGuessedLetters();
			}
			else {
				instructionWindow.innerHTML = "<p>You have already guessed " + guessLetter + " and it still isn't the correct letter. Some psychic you are!";
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

document.getElementById("sound-enabled").onclick = function() {
	psychicGame.playSounds = true;
	backroundMusic.load();
	backroundMusic.play();
	// console.log(event);
	// if (event.returnValue == true) {
	// 	alert("Sound enabled.");
	// }
}

document.getElementById("sound-disabled").onclick = function() {
	psychicGame.playSounds = false;
	notAPsychicSound.pause();
	propheciesTrueSound.pause();
	backroundMusic.pause();
	// console.log(event);
	// if (event.returnValue == false) {
	// 	alert("Sound disabled.");
	// }
}






