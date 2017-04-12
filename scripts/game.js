"use strict"
/*
	Game object contains all the property functions related to the game

*/
var Game = {

	// Initialize Switch Functionality
	initSwitch : function initSwitch(){

		// Public switch [String] tells whether the game is running (ON) or not (OFF)
		this.switchStatus = "OFF";

		/*	
		*	Public Switch Toggle Function which toggles the value of Switch Status
		*/
		this.switchToggle = function switchStatusToggle(){

			this.switchStatus === "OFF" ? this.turnOnSwitch() : this.turnOffSwitch();

		}

		/*
		*	Public Helper Function that turn on the Switch
		*/
		this.turnOnSwitch = function turnOnSwitch(){

			//	Set Switch State "ON"
			this.switchStatus = "ON";

			//	Change views
			globals.ui.toggleSwitchView("ON");
			globals.ui.turnOnDisplay();

		}

		/*
		*	Public Helper Function that turns off Switch
		*/
		this.turnOffSwitch = function turnOffSwitch(){

			this.disableStrictMode();

			//	Change views
			globals.ui.turnOffDisplay();
			globals.ui.toggleSwitchView("OFF");

			//	Make sure to turn off everything
			this.switchStatus = "OFF";

		}
		
	},

	/*
	*	Contains methods and variables needed to run the game.
	*	Requires switchStatus to be set to "ON" for most of the functions to work
	*/
	initGame: function initGame(){

		//	Private stepsCount [Number] - Number of steps the user has to complete. Increments by one every level
		var stepsCount = 1;

		//	Private steps [Array] - Array containing the pattern the user needs to copy.
		var steps = [];

		//	Public userMoves [Array] - Array containing the pattern the user entered
		this.userMoves = [];

		// Private variable AIDelay is the amount of time in between button presses in Milliseconds
		var AIDelay = 2000;


		/*
		*	Public Function increaseDifficulty that decreases the timeout value between button presses
		*	Checks stepsCount value and reduces the AIDelay in 5th, 9th and 13th level
		*/
		this.increaseDifficulty = function increaseDifficulty(){
			
			//	Set delay to default if count is between 5 and 0 (included 0 but not really needed)
			if ( stepsCount >= 0 && stepsCount < 5 ){
				AIDelay = 1500;
			} else if ( stepsCount >= 5 && stepsCount < 9 ) {
				AIDelay = 1200;
			} else if ( stepsCount >= 9 && stepsCount < 13){
				AIDelay = 900;
			} else{
				AIDelay = 600;
			}

		}

		/*
		*	Private busy [Boolean] - Value which is checked when clicking the panels to make sure ai and user actions don't overlap.
		*	If true, user actions won't work
		*/
		var busy = true;

		/*
		*	Public Function isBusy - Returns [Boolean]
		*/
		this.isBusy = function isBusy(){
			return busy;
		}


		/*
		*	Public Function Get Steps Count returns the current stepsCount value
		*	Returns stepsCount [Number]
		*/
		this.getStepsCount = function getStepsCount(){
			return stepsCount;
		}

		//	Public Setter Function increments the current Steps Count Value by 1
		this.incrementStepCount = function incrementStepCount(){
			stepsCount++;
			return stepsCount;
		}

		/*
		*	Public Function that returns the array steps
		*	Returns steps [Array]
		*/
		this.getSteps = function getSteps(){
			return steps;
		}

		/*
		*	Public Function that checks the state of the game if it is terminal
		*	Checks if stepsCount is already at 20
		*/
		this.isTerminal = function isTerminal(){

			if (stepsCount === 20){

				globals.ui.gameWin();

				return true;
			}

			return false;	
		}


		/*
			Private Function which generates a random number
			@ Param [min] - The lower bound of the range / minimum
			@ Param [max] - The upper bound of the range / maximum
		*/
		function getRandomIntInclusive(min, max) {
  			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		/*
		*	Private Function for when the AI clicks the simon panels
		*	Calls the sound and view for the color
		*	@ Param [color] String - id of the specified panel
		*/
		function click(color){
			//console.log(color);
			globals.game.play(color);
			globals.ui.clickView(color);

		}

		/*
		*	Private Function for when the AI unclicks the simon panels
		*	Stops the sound and view for the color
		*	@ Param [color] String - id of the specified panel
		*/
		function unclick(color){
			globals.ui.unclickView(color);
		}
		

		/*
			Public Function aiMove - Handles the moves for every level
			Also handles the generation of steps the user must copy
		*/
		this.aiMove = function aiMove(){

			//	Check the level every start of turn and adjust delay
			globals.game.increaseDifficulty();

			//	Clear User Moves Array
			globals.game.userMoves.length = 0;

			if (globals.timeout){
				clearTimeout(globals.timeout);
			}

			globals.ui.updateCountDisplay();

			//	If number of steps doesn't match count, generate new step
			if (steps.length < stepsCount){
				
				var nextMove;

				//	Generate randome move
				var randomNum = getRandomIntInclusive(1,20);

				//	Check if number is between a range
				if (randomNum >= 1 && randomNum <= 5){

					nextMove = "green";

				} else if (randomNum >= 6 && randomNum <=10){

					nextMove = "red";

				} else if (randomNum >= 11 && randomNum <= 15){

					nextMove = "yellow";

				} else if (randomNum >= 16 && randomNum <= 20){

					nextMove = "blue";

				}

				//	Add nextMove to list of moves
				steps.push(nextMove);

				aiMove();	// recursion

			} else{

				//	Set Busy as true to prevent user from prematurely clicking the corner panels
				busy = true;

				//	Iterate through steps array and press/make each sound with an interval between each index
				for (let i=0; i<steps.length; i++){

					/*
					*	Enclosed setTimeout in IIFE so that var i gets its own scope per iteration and not as one value
					*
					*	Wow. It seems that let also accomplishes the same thing. I assume that's because for each iteration, let
					*	uses a whole new block scope
					*/
					
					(function aiPress(index){

						//	Wait x seconds before clicking
						setTimeout(function(){
							click(steps[index]);
						}, AIDelay * index);

					})(i);

					/*
					*	See!! Look ma!
					*	Instead of making the formula 2000 * index which is same thing (double the press millisecond)
					*	I added AIDelay at the end instead since 0 multiplied by anything is zero so first press and unpress overlap
					*	Subtracted 200 to the delay between pressing and unpressing since pressing the same color consecutively causes overlapping
					*	in click and unclick. I know this timing stuff is very trial and errory. lol
					*/

						//	Wait x seconds before unclicking
						setTimeout(function(){
							unclick(steps[i]);
						}, AIDelay * i + ( AIDelay - 200 ) );

					
				}

				// Set busy as false after AI is done showing the pattern
				busy = false;

				/*
				*	Give the user time to enter answer
				*	If the user can't answer within the time limit, disqualify the user for that round
				*/
				
				//	Timelimit is (AIClick delay * step) * 2.5 (.5 is used as buffer)
				var timelimit = ( ( steps.length * AIDelay ) * 2.5 )

				globals.timeout = setTimeout(function(){

					globals.ui.incorrectPattern();

					//	Repeat AI Move if strict-mode is disabled
					if (!globals.game.strict){

						setTimeout(function(){
							globals.game.aiMove();
						}, 2000);

					} else{		// Go back to step 1

						setTimeout(function(){
							initGameObjects();
						}, 2000);

					}

				}, timelimit);

				

				

			}

		}

		/*
		*	Public Function that compares the userMove array to the steps Array
		*	Return [Result] Boolean - Correct or Incorrect Result
		*/
		this.checkUserMove = function checkUserMove(){
			return this.userMoves.every(function(current, index){
				return current === steps[index];
			});
		}

		/*
		*	Public Function UserPress that calls the sound and animation when the user clicks the corners
		*/
		this.userPress = function userPress(color){

			//	Click sound and animation helper
			click(color);

			//	Unclick animation helper
			setTimeout(function(){
				unclick(color);
			}, 1000);
		}

	},

	/*
	*	Initialize sound state and methods
	*/
	initSounds : function initSounds(){

		/*
		*	Initializing Private variables for audio
		*/
		var green = new Audio('styles/media/simonSound1.mp3');
		var red = new Audio('styles/media/simonSound2.mp3');
		var yellow = new Audio('styles/media/simonSound3.mp3');
		var blue = new Audio('styles/media/simonSound4.mp3');

		/*
		*	Public Function that Plays the sound for the specified color
		*/
		this.play = function play(color){

			switch (color){

				case "green" :
					green.play();
					break;
				case "red" :
					red.play();
					break;
				case "yellow" :
					yellow.play();
					break;
				case "blue" :
					blue.play();
					break;
			}
		}

		/*
		*	Public Function that sets a new volume value to all sounds
		*/
		this.setVolume = function setVolume(volume){
			green.volume(volume);
			red.volume(volume);
			yellow.volume(volume);
			blue.volume(volume);
		}

		/*
		*	Public Function the pauses the specified color
		*	
		*/
		this.pause = function pause(color){

			switch (color){
				case "green":
					green.pause();
					//green.currentTime = 0;
					break;
				case "red":
					red.pause();
					//red.currentTime = 0;
					break;
				case "yellow":
					yellow.pause();
					//yellow.currentTime = 0;
					break;
				case "blue":
					blue.pause();
					//blue.currentTime = 0;
					break;
			}
		}
	},


	/*
	*	Initialize strict mode behavior and variables
	*/
	initStrictMode : function initStrictMode(){

		/*
		*	Public strict variable [Boolean] - Determines whether strict-mode is applied
		*/
		this.strict = false;

		/*
		*	Public Function that enables strict mode
		*/
		this.enableStrictMode = function enableStrictMode(){

			if (this.switchStatus === "ON"){
				this.strict = true;
				globals.ui.strictOnView();
			}

		}

		/*
		*	Public Function that disables strict mode
		*/
		this.disableStrictMode = function disableStrictMode(){
			console.log('hey');
			if (this.switchStatus === "ON"){
				console.log('pasok');
				this.strict = false;
				globals.ui.strictOffView();
			}
			
		}
	}
};