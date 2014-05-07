"use strict";

var ViewPortCreator = Class.extend({
  init: function() {
    this.trajectoryCalculator = new TrajectoryCalculator();
  },

  findPillarsInViewPort: function(scrollLocation, column) {
    return _.map(column.findAllNearby(scrollLocation), function(col) { 
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

  create: function(scrollLocation, playerLocation, topColumn, bottomColumn, collided, outOfBounds, gameOver, score) {
    var topColumns = this.findPillarsInViewPort(scrollLocation, topColumn);
    var bottomColumns = this.findPillarsInViewPort(scrollLocation, bottomColumn);

    if (playerLocation === undefined) {
      return {
        topColumns: topColumns,
        bottomColumns: bottomColumns,
        collided: collided,
        outOfBounds: outOfBounds,
        gameOver: gameOver,
        score: score,
      };
    };

    return {
      playerLocation: this.shiftLocationForViewPort(scrollLocation, playerLocation),
      trajectory: this.shiftTrajectoriesForViewPort(
        scrollLocation, 
        this.trajectoryCalculator.getTrajectories(playerLocation)),
      topColumns: topColumns,
      bottomColumns: bottomColumns,
      collided: collided,
      outOfBounds: outOfBounds,
      gameOver: gameOver,
      score: score,
    };
  },
});