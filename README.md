# Simon-Game
Final Project for Free Code Camp's Front End Development Certification

Link to the actual challenge : https://www.freecodecamp.com/challenges/build-a-simon-game



User Story: I am presented with a random series of button presses.

User Story: Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.

User Story: I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.

User Story: If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.

User Story: I can see how many steps are in the current series of button presses.

User Story: If I want to restart, I can hit a button to do so, and the game will return to a single step.

User Story: I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.

User Story: I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.


--

I used prototype inhertance in implementing the game again and I think I'm getting used to it.
At first I was paralyzed by the decisions I had to make. Whether to make a variable a public variable and use setters/getters or to make the variable a public one.
Although I did get used to it the more that I did it.

Since I was new to prototypal inheritance, my breaking up and putting together of the different modules wasn't as ideal as I'd like, although honestly it's not too shabby ( I think sitting down and dedicating time to planning how I would like the functions and modules to work definitely helped )

What I did like was how fast I did the whole project. Previously it would take me around 3-5 days per Free Code Camp project if I did it whenever I had free time.
This project took me 1 day for the UI and another day for most of the functionality. I had a few (extra not part of the user story) functionalities left during the end of the second day however I wasn't able to work on it on the 3rd day since my Family and I had our family vacation because of Holy Week.

One of the hardest parts of the project was definitely the timing of events. Making sure clicking and unclicking event don't overlap and such. Creating a timelimit for the user to enter the password. Although it's wasn't too hard. More annoying really cause it involved a lot of trial and error to make it work the way I wanted.

Another thing I really like was how I was able to apply my knowledge of closures and scopes when the clicking the sequence (since it used setTimeout which caused the for loop to default to a single value) I was a bit surprised to know that ES6's let actually created a whole new scope for each iteration when used in a for loop but it actually makes sense.