"use strict";

var ViewPortCreator = function() {
  var my = function() { };

  my.findPillarsInViewPort = function(scrollLocation, pillar) {
    return _.map(pillar.findAllNearby(scrollLocation), function(col) { 
      return col - scrollLocation;
    });
  };

  function shiftTrajectoriesForViewPort(scrollLocation, trajectories) {
    return _(trajectories).map(function(trajectory) {
      return  _(trajectory).filter(function(point) { return point.isLegal(); })
        .map(function(point) { return shiftLocationForViewPort(scrollLocation, point); })
        .value();
    }).value();
  }

  function shiftLocationForViewPort(scrollLocation, point) {
    if (point === undefined) {
      return undefined;
    }
    return pointRowCol(point.row, point.col - scrollLocation);
  }

  my.create = function(scrollLocation, playerLocation, topPillar, bottomPillar, collided, outOfBounds, gameOver, score, justScored) {
    var result = {
      topPillars: my.findPillarsInViewPort(scrollLocation, topPillar),
      bottomPillars: my.findPillarsInViewPort(scrollLocation, bottomPillar),
      collided: collided,
      outOfBounds: outOfBounds,
      gameOver: gameOver,
      score: score,
      justScored: justScored
    };

    if (playerLocation === undefined) {
      return result;
    }

    return _.extend(result, {
      playerLocation: shiftLocationForViewPort(scrollLocation, playerLocation),
      trajectory: shiftTrajectoriesForViewPort(
        scrollLocation, 
        TrajectoryCalculator.getTrajectories(playerLocation)),
    });
  };

  return my;
}();
