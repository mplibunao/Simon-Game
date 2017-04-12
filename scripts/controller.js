"use strict"
// globals object will contain all the Game related Objects

var globals = {};


/*
*	Helper function that re/initializes the Game Objects and their properties
*	Basically restarts the game
*/
var initGameObjects = function initGameObjects(){

	//	Initialize Game variables
	globals.game.initGame();

	//	Start Move
	globals.game.aiMove();

}


/*
*	Switch Button Event Listener
*	Toggles the switch variable
*/
$('.switch').on('click', function(){
	globals.game.switchToggle();
});


/*
*	Start Button Event Listener
*	Initializes the Game values	
*/
$('#start').on('click', function(){

	if (globals.game.switchStatus === "ON"){

		initGameObjects();

	}

});


/*
*	Strict Mode Button Event Listener
*	Toggles Strict Mode
*/
$('#strict').on('click', function(){

	globals.game.strict === false ? globals.game.enableStrictMode() : globals.game.disableStrictMode();
});


/*
*	Corner Panels Event Listener
*	Stores the color of the panel the user clicked to User Moves [Array]
*	Then compares the user's sequence to the AI's sequence
*	Go back to step 1 if strict mode is on
*/
$('.corner-panel').on('click', function(){

	if (globals.game.switchStatus === "ON" && globals.game.isBusy() === false){

		var $this = $(this);

		//	Get the color of the clicked elemen
		var color = $this.attr('id');
		
		//	Click animation and sound as well unpress
		globals.game.userPress(color);
		
		// Push color to userMoves Array
		var userMoves = globals.game.userMoves;
		userMoves.push(color);

		//	Check current iteration of usermove
		var result = globals.game.checkUserMove();

		//	If incorrect, show error then either show the sequence again or go back to step 1
		if (result === false){

			if (globals.timeout){
				clearTimeout(globals.timeout);
			}

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

		} else{

			//	If correct, check if the player has entered the whole sequence (compare the lengths of User Move and Steps Array)
			var stepsCount = globals.game.getStepsCount();

			if ( stepsCount === userMoves.length){

				if (globals.timeout){
				clearTimeout(globals.timeout);
				}

				//	Check if game is over
				var state = globals.game.isTerminal();

				if (state === false){

					// Move to the next stage but add short timeout before making the AI Move again to not overlap wtih user
					setTimeout(function(){
						globals.game.incrementStepCount();
						globals.game.aiMove();
					}, 2000);

				} else{

					setTimeout(function(){
						//	Player won, restart game
						initGameObjects();
					}, 4000);
					
				}

			}
		}








		/*
		//	When user has inputed the same number of colors as the AI, compare the results
		var stepsCount = globals.game.getStepsCount();
		if ( stepsCount === userMoves.length){

			var result = globals.game.checkUserMove();
			
			//	If correct Increment steps count and let the ai move again
			if (result === true){

				// Add short timeout before making the AI Move again to not overlap wtih user
				setTimeout(function(){
					globals.game.incrementStepCount();
					globals.game.aiMove();
				},2000);

			} else {

				//	Result === False
				globals.ui.incorrectPattern();

				//	Repeat AI Move if strict-mode is disabled
				if (!globals.game.strict){

					globals.game.aiMove();

				} else{		// Restart from step 1


					initGameObjects();
				}
			}
		}
		*/
	}

});




// Initialize Object during initial page load
$(document).ready(function(){

	// initialize game object
	globals.game = Object.create(Game);
	globals.game.initSwitch();
	globals.game.initSounds();
	globals.game.initStrictMode();

	// initialize ui object
	globals.ui = Object.create(UI);
	globals.ui.initSwitchUI();
	globals.ui.initDisplayUI();
	globals.ui.initCornerPanelsUI();
	globals.ui.initStrictModeUI();


});