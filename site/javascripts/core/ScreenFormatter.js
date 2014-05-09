//this is mostly UI code and it can be clearly separated from the rest
//of the "Core" - but I won't separate it today. Just know that I know that I should. Just
//know that I know.

"use strict";

var ScreenFormatter = {
  draw: function(viewPort) {
    var screen = this.createEmptyScreen();

    this.drawPillar(screen, viewPort.topPillars, AsciiBirds.topPillarMinRow, AsciiBirds.topPillarMaxRow);

    this.drawPillar(screen, viewPort.bottomPillars, AsciiBirds.bottomPillarMinRow, AsciiBirds.bottomPillarMaxRow);

    if (!viewPort.outOfBounds) {
      this.drawPlayer(screen, viewPort);

      if (!viewPort.gameOver) {
        this.drawTrajectories(screen, viewPort.trajectory);
      }
    }

    var screenText = this.convertScreenArrayToText(screen);

    //draw "overlays" or "windows" over the rest of the screen
    this.drawScore(screenText, viewPort.score);
    if (viewPort.gameOver) {
      screenText[5] = "<span class='game-over-alert'> ::: GAME  OVER ::: </span>"
    }

    return screenText;
  },


  createEmptyScreen: function() {
    var screen = [];

    _(_.range(0, AsciiBirds.windowHeight)).each(function(row) {

      screen.push(
        _(_.range(0, AsciiBirds.windowWidth)).map(function(col) {
          return "\u00B7"; //Unicode character is an 'Interpunct': http://en.wikipedia.org/wiki/Interpunct
        })
        .value());

    });

    return screen;
  },

  drawPillar: function(screen, pillarArray, minRow, maxRow) {
    var pillarsInView = _.filter(pillarArray, function(pillar) { return pillar < AsciiBirds.windowWidth });
    _.each(pillarsInView, function (pillar) {
      _.each(_.range(minRow, maxRow+1), function(row) {
        screen[row][pillar] = "#";
      });
    });
  },

  drawPlayer: function(screen, viewPort) {
    var token = "";
    if (viewPort.collided) {
      token = "<span class='collision'>%</span>";
    } else {
      token = "@";
    }

    screen[viewPort.playerLocation.row][viewPort.playerLocation.col] = token;
  },

  drawTrajectories: function(screen, trajectories) {
    _(_.range(0, trajectories.length)).each(function(i) {
      _.each(trajectories[i], function(point) {
        screen[point.row][point.col] = "<span class='trajectory-" + i + "'>" + screen[point.row][point.col] + "</span>";
      });
    });
  },

  convertScreenArrayToText: function(screen) {
    return _.map(screen, function(row) {
      return row.join('');
    });
  },

  drawScore: function(screenText, score) {
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
  },
};