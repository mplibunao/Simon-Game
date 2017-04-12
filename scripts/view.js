"use strict"

	/*
	*
	*/

/*
*	UI Object contains all the methods and variables related to the User Interface
*/

var UI = {


	/*
	*	Property that contains all view related function for the Switch
	*/
	initSwitchUI : function initSwitchUI(){

		/*
		*	Public method that changes the switch ui
		*	Adds or remove class switch-click
		*	@ Param [status] String - The switch status to toggle to
		*/
		this.toggleSwitchView = function toggleSwitchView(status){

			var $this = $('.switch');

			status === "ON" ? $this.addClass('switch-click') : $this.removeClass('switch-click');
		}

	},

	/*
	*	Property that contains all view related functions for the Display UI
	*/
	initDisplayUI : function initDisplayUI(){


		/*
		*	Private Function that sets value in the display view
		*	@ Param [value] String - the value you want to display
		*/
		function setDisplay(value){
			$('#display-text').html(value);
		}


		/*
		*	Public Function that turns on the display when the switch is toggled
		*	Calls setDisplay and initializes to "--" value
		*/
		this.turnOnDisplay = function turnOnDisplay(){
			setDisplay("--");
		}


		/*
		*	Public Function that turns off the display when the switch is toggled
		*	Calls setDisplay and passes an empty String
		*/
		this.turnOffDisplay = function turnOffDisplay(){
			setDisplay("");
		}


		/*
		*	Public Function that retrieves the current Steps Count and displays it
		*	If Count is less than 10, add a zero at the beginning so it looks good
		*/
		this.updateCountDisplay = function updateCountDisplay(){

			var count = globals.game.getStepsCount();

			//	Stringify and prepend zero for single digits
			if (count < 10){
				count.toString();
				count = "0" + count;
			}

			setDisplay(count);
		}

		this.gameWin = function gameWin(){
			setDisplay("WIN");

			// Add pulsate effect
			$('#display-text').effect('pulsate', {times:5}, 2000);
		}


		/*
		*	Public Function that sets Display to "!!" when user used the incorrect pattern sequence
		*/		
		this.incorrectPattern = function incorrectPattern(){
			setDisplay("!!");

			// Add pulsate effect
			$('#display-text').effect('pulsate', {times:3}, 1200);
		}

	},

	/*
	*	Contains the Methods for clicking and unclicking corner panels (For AI)
	*/	
	initCornerPanelsUI : function initCornerPanelsUI(){

		/*
		*	Public Function for when the AI clicks the simon panels
		*	Applies the class aiClick on the specified element
		*	Also applies corresponding light class of the element
		*	@ Param [color] String - color or id of the specified panel
		*/
		this.clickView = function clickView(color){

			var elementId = "#" + color;
			$(elementId).addClass('aiClick');

			switch(color){
				case "green":
					$(elementId).addClass('green-light');
					break;
				case "red":
					$(elementId).addClass('red-light');
					break;
				case "blue":
					$(elementId).addClass('blue-light');
					break;
				case "yellow":
					$(elementId).addClass('yellow-light');
					break;
			}

		}

		/*
		*	Public Function for when the AI unclicks the simon panels
		*	Removes the class aiClick on the specified element and all the light classes
		*	@ Param [id] String - id of the specified panel
		*/
		this.unclickView = function unclickView(id){

			var elementId = "#" + id;
			$(elementId).removeClass('aiClick green-light red-light blue-light yellow-light');
		}

	},

	/*
	*	Contains the state and behavior for Strict Mode UI
	*/
	initStrictModeUI : function initStrictModeUI(){
		
		/*
		*	Public function turning on the Strict Mode Light on the Game
		*/
		this.strictOnView = function strictOnView(){
			var $this = $('#strict-light');
			$this.addClass('strict-click');
		}

		/*
		*	Public function turning off the Strict Mode Light on the Game
		*/
		this.strictOffView = function strictOffView(){
			var $this = $('#strict-light');
			$this.removeClass('strict-click');
		}
	}
}