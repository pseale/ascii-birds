Daily Programmer #157
=====================

Quickstart
----------

This is a static HTML/CSS/JavaScript site I created to solve Daily Programmer #157. 

* To try it out NOW, visit http://ascii-birds.herokuapp.com/
* To try it out on your machine:
  * Download/clone/unpack the source, then
  * launch the game one of three exciting ways!
    * (linux/Mac) run `./launch-ascii-birds.sh`
    * launch `site/index.html` in your browser. (If ASCII Birds is launched from the filesystem, the "(?) HOW TO PLAY" link will not function. You can still view the help page manually.)
    * Using the Sinatra app:
      * `bundle`
      * `bundle exec rackup` 
* To run Jasmine specs,
  * launch `spec/javascripts/SpecRunner.html` in your browser.
* To run jshint,
  * install nodejs and jshint (QED--this exercise left for the reader).
  * `jshint site/javascripts/core`


If you plan to inspect the project's source, please do me a solid and read the Notes, Goals, and most importantly, the "Things I could and probably should improve, but won't" section.

Notes
-----
This is an in-the-browser implementation of "ASCII Birds", which is a simplified, turn-based flappy birds clone. The meat of ASCII Birds is implemented in client-side JavaScript.

For my own convenience, I have included a shell script (`launch-ascii-birds.sh`) that launches Ruby/WEBrick and a browser to open the page. The server runs at port 3000.

For full details of the "ASCII Birds" problem, or to find similar solutions, visit http://www.reddit.com/r/dailyprogrammer/comments/22slvn/4112014_challenge_157_hard_ascii_bird/

Goals
-----

* Get into the swing of things
* Solve a fun problem
* Try out jasmine specs
* Experiment with organizing JavaScript code
* Try out lo-dash

Things I could and probably should improve, but won't
-----------------------------------------------------

* UI:
  * I use a lot of "id" tags in the HTML instead of "class"es. Mostly. In real apps I favor using classes over ids as content is more likely to be reused.
  * I sacrificed some usability--specifically, tab-friendliness and consistency on link/button clicking--to make my artisanal ASCII buttons.
  * There is a lot of duplication in the HTML that I could eliminate if I used either server-side templates, or even client-side JavaScript templates. I didn't do either, just know that I could, and know that I know you know I could.
  * I use boolean flags to enable/disable features (e.g. you can't use the move command unless you're in-game), and I am aware I can improve this. If it gets any more complicated than it already is (3 flags currently), I'll make a state machine.

* Code organization:
  * I experimented with a lot of things, from naked global functions, to modules, to a class.js helper library. On larger projects I would be strict about using modules--but this isn't a larger project. 
  * Even so, I should do something about the naked pointRowCol() function.

* Jasmine specs:
  * I have real problems with getting Jasmine to do what I want to do, how I want to do it. Specifically, I feel like I should never be using beforeEach() blocks; instead I want to  replace any beforeEach() calls with a call to some kind of context() method that is called once per describe block. With this in mind, I half gave up cleaning up my Jasmine specs until I figure out how to write them in my style.
  * I keep saying this without ever doing it (see my other recent project)--I want to experiment with Test Data Builders, **but** these problems are a little too simple. What we're left with on this project is an Object Mother with a grand total of two (2) methods, and a large pile of code that converts ASCII drawings to game state.
  * Towards the end, my spec coverage got awful. Specifically for collision detection, I need specs that tell me:
    * Flying in the air near a pillar doesn't cause a collision
    * Colliding with the bottom pillar causes a collision
    * Flying out of bounds doesn't cause a collision
