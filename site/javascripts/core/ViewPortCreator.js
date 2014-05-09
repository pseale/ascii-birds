"use strict";

var ViewPortCreator = Class.extend({
  init: function() {
    this.trajectoryCalculator = new TrajectoryCalculator();
  },

  findPillarsInViewPort: function(scrollLocation, pillar) {
    return _.map(pillar.findAllNearby(scrollLocation), function(col) { 
      return col - scrollLocation;
    });
  },

  shiftTrajectoriesForViewPort: function(scrollLocation, trajectories) {
    var shiftLocationFunc = this.shiftLocationForViewPort;    

    return _(trajectories).map(function(trajectory) {
      return  _(trajectory).filter(function(point) { return point.isLegal(); })
        .map(function(point) { return shiftLocationFunc(scrollLocation, point); })
        .value();
    }).value();
  },

  shiftLocationForViewPort: function(scrollLocation, point) {
    if (point === undefined) {
      return undefined;
    }
    return pointRowCol(point.row, point.col - scrollLocation);
  },

  create: function(scrollLocation, playerLocation, topPillar, bottomPillar, collided, outOfBounds, gameOver, score, justScored) {
    var result = {
      topPillars: this.findPillarsInViewPort(scrollLocation, topPillar),
      bottomPillars: this.findPillarsInViewPort(scrollLocation, bottomPillar),
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
      playerLocation: this.shiftLocationForViewPort(scrollLocation, playerLocation),
      trajectory: this.shiftTrajectoriesForViewPort(
        scrollLocation, 
        this.trajectoryCalculator.getTrajectories(playerLocation)),
    });
  },
});