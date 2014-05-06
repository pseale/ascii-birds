"use strict";

var ViewPortCreator = Class.extend({
  init: function() {
    this.trajectoryCalculator = new TrajectoryCalculator();
  },

  findPillarsInViewPort: function(scrollLocation, playerLocation, column) {
    return _.map(column.findAllNearby(playerLocation.col), function(col) { 
      return col - scrollLocation;
    });
  },

  shiftTrajectoriesForViewPort: function(scrollLocation, trajectories) {
    //refactor out these awful temp arrays when I switch out from underscore to lo-dash
    var newTrajectories = [];
    for (var i=0; i<trajectories.length; i++) {
      var newTrajectory = [];

      for (var j=0; j<trajectories[i].length; j++) {
        newTrajectory.push(this.shiftLocationForViewPort(scrollLocation, trajectories[i][j]));
      }

      newTrajectories.push(newTrajectory);
    }

    return newTrajectories;
  },

  shiftLocationForViewPort: function(scrollLocation, point) {
    return pointRowCol(point.row, point.col - scrollLocation);
  },

  create: function(scrollLocation, playerLocation, topColumn, bottomColumn, collided, gameOver, points) {
    var viewPort = {
      playerLocation: this.shiftLocationForViewPort(scrollLocation, playerLocation),
      trajectory: this.shiftTrajectoriesForViewPort(
        scrollLocation, 
        this.trajectoryCalculator.getTrajectories(playerLocation)),
      topColumns: this.findPillarsInViewPort(scrollLocation, playerLocation, topColumn),
      bottomColumns: this.findPillarsInViewPort(scrollLocation, playerLocation, bottomColumn),
      collided: collided,
      gameOver: gameOver,
      points: points,
    };

    return viewPort;
  },
});