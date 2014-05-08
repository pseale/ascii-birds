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
    //refactor out these awful temp arrays when I switch out from underscore to lo-dash
    var newTrajectories = [];
    for (var i=0; i<trajectories.length; i++) {
      var newTrajectory = [];
      var legalPoints = _.filter(trajectories[i], function(point) {
        return point.isLegal();
      });

      for (var j=0; j<legalPoints.length; j++) {
        newTrajectory.push(this.shiftLocationForViewPort(scrollLocation, legalPoints[j]));
      }

      newTrajectories.push(newTrajectory);
    }

    return newTrajectories;
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
    };

    return _.extend(result, {
      playerLocation: this.shiftLocationForViewPort(scrollLocation, playerLocation),
      trajectory: this.shiftTrajectoriesForViewPort(
        scrollLocation, 
        this.trajectoryCalculator.getTrajectories(playerLocation)),
    });
  },
});