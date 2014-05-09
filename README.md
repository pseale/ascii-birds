Daily Programmer #157
=====================

Quickstart tl;dr
------------------
This is a static HTML/CSS/JavaScript site I created to solve Daily Programmer #157. To try it out:

* Download/clone/unpack the source to your local machine
* Either:
  * (linux/Mac) run ./launch-ascii-birds.sh
  * launch ./site/index.html in your browser. (Due to browser security, loading help will not work.)
* To run Jasmine tests,
  * launch spec/javascripts/SpecRunner.html in your browser.
* To run the capybara/RSpec specs (now broken),
  * `bundle`
  * `bundle exec rspec`


If you plan to inspect the project's source, please do me a solid and read the Notes, Goals, and most importantly, the "Things I could and probably should improve, but won't" sections.

Notes
-----
This is an in-the-browser implementation of "ASCII birds", a simplified, turn-based flappy birds clone. The meat of the game is implemented in JavaScript.

For my own convenience, I have included a shell script (`launch-ascii-birds.sh`)that launches Ruby/WEBrick and a browser to open the page. The server runs at port 3000.

Full details of the problem (and similar solutions) can be found at http://www.reddit.com/r/dailyprogrammer/comments/22slvn/4112014_challenge_157_hard_ascii_bird/

Goals
-----

* Get into the swing of things
* Solve a fun problem
* Try out jasmine specs


Things I could and probably should improve, but won't
-----------------------------------------------------

* UI:
  * I use a lot of "id" tags in the HTML instead of "class"es. Mostly. In "real" apps I'd favor using classes over ids as things were much more likely to be reused.
  * I sacrificed some usability (tab-friendliness and consistency on link/button clicking) to make my artisanal ASCII buttons.

* "Just delete the RSpec specs and convert the project to Node" - I'm aware that everything related to RSpec/Ruby is an absolute mess, and I will delete it all. Probably.
  * RSpec specs broke, but I'm not willing to delete them until I delete all of RSpec from this project. I am absolutely willing to drive an app from a browser-only interface, but I don't have the gumption to do it for this project.
  * The abomination that is all of the Sinatra/Rack/Rakefile/Gemfile/etc/etc infrastructure - the file & folder mental weight far overshadows the app itself.
  * The abomination that is the mixture of Jasmine specs alongside the Jasmine spec runner alongside the Jasmine support files. So be it (until I wipe out all of RSpec).

