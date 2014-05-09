"use strict";

var HardcodedPillarGenerator = Class.extend({
  init: function(array) {
    this.array = array;
  },

  next: function() {
    var value = this.array.shift();
    if (value === undefined)
      return Infinity;

    return value;
  }
});

var ObjectMother = {
  createGameWithHardcodedTopPillars: function(pillarArray) {
    return this.createGameWithHardcodedPillars(pillarArray, [500]);
  },

  createGameWithHardcodedPillars: function(topPillarArray, bottomPillarArray) {
    if (topPillarArray === null || topPillarArray.length === 0 || bottomPillarArray === null || bottomPillarArray.length === 0 ) {
      throw new Error("Test setup error: can't create a hardcoded game with no pillars whatsoever. If you don't want pillars in your game, create pillars far away (e.g. pillar at location 500)");
    }

    var game = new GameController();

    var topPillar = new Pillar();
    topPillar.pillarGenerator = new HardcodedPillarGenerator(topPillarArray);
    game.topPillar = topPillar;

    var emptyBottomPillar = new Pillar();
    emptyBottomPillar.pillarGenerator = new HardcodedPillarGenerator(bottomPillarArray);
    game.bottomPillar = emptyBottomPillar;

    return game;
  },
};

function containsPoint(collection, point) {
  return _.any(collection, function(item) {
    return item.row === point.row && item.col === point.col;
  });
}

//test helper method that translates a billion ugly asserts that are hard to read,
//into a picture that you understand immediately. In the case that an assertion fails,
//it's probably a little harder to tell exactly what failed...probably.
//
//A trajectory string consists of a "@" being the origin, "." to indicate empty space,
// and "x" to indicate a point on the trajectory. Whitespace (spaces) are ignored.
//
//E.g.
//
//@..
//.x.
//..x
function trajectoryExactlyMatches(viewPort, power, expectedTrajectoryString) {
  var map = convertTrajectoryMap(expectedTrajectoryString);
  var expectedTrajectory = adjustRelativeTrajectoriesToViewPortPoints(viewPort, map);

  var actualTrajectory = viewPort.trajectory[power];
  expect(actualTrajectory.length).toEqual(expectedTrajectory.length);

  for (var i=0; i<expectedTrajectory.length; i++) {
    expect(containsPoint(actualTrajectory, expectedTrajectory[i])).toBeTruthy();
  }

  return true;
}

//while a relative trajectory is useful, we can only make useful comparisons
//to the viewPort's position. This function converts relative trajectory points
//to viewPort-relative points.
function adjustRelativeTrajectoriesToViewPortPoints(viewPort, map) {
  var rowOffset = viewPort.playerLocation.row;
  var columnOffset = 1;

  return _.map(map.trajectory, function(point) {
    return pointRowCol(point.row+rowOffset, point.col+columnOffset);
  });  
}

function convertTrajectoryMap(expectedTrajectoryString) {
  var lines = _.map(expectedTrajectoryString.split("\n"), function(line) {
    return line.trim();
  });

  //get a raw "where in the ascii drawing is this trajectory point"
  var trajectoryPoints = [];
  var startPoint = [];
  for (var line =0; line < lines.length; line++) {
    for (var col=0; col<lines[line].length; col++) {
      if (lines[line][col] === 'x') {
        trajectoryPoints.push(pointRowCol(line, col));
      } else if (lines[line][col] === '@') {
        startPoint = pointRowCol(line, col);
      }
    }
  }

  //adjust the raw trajectory points to a "relative distance" from the start point
  _.each(trajectoryPoints, function(point) {
    point.row -= startPoint.row;
    point.col -= startPoint.col;
  });

  return {
    startPoint: startPoint,
    trajectory: trajectoryPoints,
  };
}

function convertTrajectoryString(token) {
  if (token === "@") {
    return 
  }  
}

