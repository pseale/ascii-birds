# Daily Programmer #157

## Quickstart

This is a static HTML/CSS/JavaScript site I created to solve Daily Programmer #157, some **eight+ years ago**.

- To try it out NOW, visit https://devsecfailureops.com/ascii-birds/
- To try it out on your machine:
  - Download/clone/unpack the (**eight+ years-old**) source, then
  - launch the game one of three exciting ways!
    - (linux/Mac) run `./launch-ascii-birds.sh`
    - launch `site/index.html` in your browser. (If ASCII Birds is launched from the filesystem, the "(?) HOW TO PLAY" link will not function. You can still view the help page manually.)
    - Using the Sinatra app:
      - `bundle`
      - `bundle exec rackup`
- To run Jasmine specs,
  - launch `spec/javascripts/SpecRunner.html` in your browser.
- To run jshint,
  - install nodejs and jshint (QED--this exercise left for the reader).
  - `jshint site/javascripts/core`

If you plan to inspect the project's source, please do me a solid and read the Notes, Goals, and most importantly, the "Things I could and probably should improve, but won't" section.

## Notes

This is an in-the-browser implementation of "ASCII Birds", which is a simplified, turn-based flappy birds clone. The meat of ASCII Birds is implemented in client-side JavaScript.

For my own convenience, I have included a shell script (`launch-ascii-birds.sh`) that launches Ruby/WEBrick and a browser to open the page. The server runs at port 3000.

For full details of the "ASCII Birds" problem, or to find similar solutions, visit http://www.reddit.com/r/dailyprogrammer/comments/22slvn/4112014_challenge_157_hard_ascii_bird/

## Goals

- Get into the swing of things
- Solve a fun problem
- Try out jasmine specs
- Experiment with organizing JavaScript code
- Try out lo-dash
