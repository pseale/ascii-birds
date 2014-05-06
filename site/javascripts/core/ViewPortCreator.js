"use strict";

var ViewPortCreator = Class.extend({
  init: function() {
    this.trajectoryCalculator = new TrajectoryCalculator();
  },

  getColumnsInRange: function(scrollLocation, playerLocation, column) {
    return _.map(column.findAllNearby(playerLocation.col), function(col) { 
      return col - scrollLocation;
    });
  },

  shiftTrajectoriesForViewPort: function(scrollLocation, trajectories) {
    var newTrajectories = [];
    for (var i=0; i<trajectories.length; i++) {
      newTrajectories.push(this.shiftArrayForViewPort(scrollLocation, trajectories[i]));
    }

    return newTrajectories;
  },

  shiftArrayForViewPort: function(scrollLocation, array) {
    var newArray = [];
    for (var i=0; i<array.length; i++) {
      newArray.push(this.shiftForViewPort(scrollLocation, array[i]));
    }

    return newArray;
  },

  shiftForViewPort: function(scrollLocation, point) {
    return pointRowCol(point.row, point.col - scrollLocation);
  },

  create: function(scrollLocation, playerLocation, topColumn, bottomColumn, collided, gameOver, points) {
    var viewPort = {
      playerLocation: this.shiftForViewPort(scrollLocation, playerLocation),
      trajectory: this.shiftTrajectoriesForViewPort(
        scrollLocation, 
        this.trajectoryCalculator.getTrajectories(playerLocation)),
      topColumns: this.getColumnsInRange(scrollLocation, playerLocation, topColumn),
      bottomColumns: this.getColumnsInRange(scrollLocation, playerLocation, bottomColumn),
      collided: collided,
      gameOver: gameOver,
      points: points,
    };

    return viewPort;
  },

});