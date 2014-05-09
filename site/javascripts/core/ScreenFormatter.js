//this is mostly UI code and it can be clearly separated from the rest
//of the "Core" - but I won't separate it today. Just know that I know that I should. Just
//know that I know.

"use strict";

var ScreenFormatter = function() {
  var my = function() { };

  my.draw = function(viewPort) {
    var screen = createEmptyScreen();

    drawPillar(screen, viewPort.topPillars, AsciiBirds.topPillarMinRow, AsciiBirds.topPillarMaxRow);

    drawPillar(screen, viewPort.bottomPillars, AsciiBirds.bottomPillarMinRow, AsciiBirds.bottomPillarMaxRow);

    if (!viewPort.outOfBounds) {
      drawPlayer(screen, viewPort);

      if (!viewPort.gameOver) {
        drawTrajectories(screen, viewPort.trajectory);
      }
    }

    var screenText = convertScreenArrayToText(screen);

    //draw "overlays" or "windows" over the rest of the screen
    drawScore(screenText, viewPort.score);
    if (viewPort.gameOver) {
      screenText[5] = "<span class='game-over-alert'> ::: GAME  OVER ::: </span>"
    }

    return screenText;
  };


  function createEmptyScreen() {
    var screen = [];

    for (var row=0; row<AsciiBirds.windowHeight; row++) {
      var rowArray = [];
      for (var col=0; col<AsciiBirds.windowWidth; col++) {
        rowArray.push("\u00B7"); //Unicode character is an 'Interpunct': http://en.wikipedia.org/wiki/Interpunct
      }
      screen.push(rowArray);
    }

    return screen;
  }

  function drawPillar(screen, pillarArray, minRow, maxRow) {
    var pillarsInView = _.filter(pillarArray, function(pillar) { return pillar < AsciiBirds.windowWidth });
    _.each(pillarsInView, function (pillar) {
      for(var row=minRow; row<=maxRow; row++) {
        screen[row][pillar] = "#";
      }
    });
  }

  function drawPlayer(screen, viewPort) {
    var token = "";
    if (viewPort.collided) {
      token = "<span class='collision'>%</span>";
    } else {
      token = "@";
    }

    screen[viewPort.playerLocation.row][viewPort.playerLocation.col] = token;
  }

  function drawTrajectories(screen, trajectories) {
    for (var i=0; i<trajectories.length; i++) {
      _.each(trajectories[i], function(point) {
        screen[point.row][point.col] = "<span class='trajectory-" + i + "'>" + screen[point.row][point.col] + "</span>";
      });
    }
  }

  function convertScreenArrayToText(screen) {
    var screenText = [];
    _.each(screen, function(row) {
      var rowText = "";
      for (var i=0;i<row.length; i++) {
        rowText += row[i];
      }
      screenText.push(rowText);
    });

    return screenText;
  }

  function drawScore(screenText, score) {
    if (score > 999) {
      score = 999;
    }

    var width = 5;
    var scoreString = score.toString() + " ";
    while(scoreString.length < width - 1) {
      scoreString = "0" + scoreString;
    }

    if (scoreString.length < width) {
      scoreString = " " + scoreString;
    }

    screenText[0] = screenText[0].substring(0, screenText[0].length-width) + "<span class='scoreboard'>" + scoreString + "</span>";
  }

  return my;
}();