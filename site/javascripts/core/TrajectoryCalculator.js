"use strict";

var TrajectoryCalculator = Class.extend({
  init: function() {
    this.relativeTrajectories = [
      AsciiBirds.TrajectoryVectors.power0,
      AsciiBirds.TrajectoryVectors.power1,
      AsciiBirds.TrajectoryVectors.power2,
      AsciiBirds.TrajectoryVectors.power3,
      AsciiBirds.TrajectoryVectors.power4,
      ];
  },

  getTrajectories: function(playerLocation) {
    return [
      this.convertRelativeToActualCoordinates(playerLocation, AsciiBirds.TrajectoryVectors.power0),
      this.convertRelativeToActualCoordinates(playerLocation, AsciiBirds.TrajectoryVectors.power1),
      this.convertRelativeToActualCoordinates(playerLocation, AsciiBirds.TrajectoryVectors.power2),
      this.convertRelativeToActualCoordinates(playerLocation, AsciiBirds.TrajectoryVectors.power3),
      this.convertRelativeToActualCoordinates(playerLocation, AsciiBirds.TrajectoryVectors.power4),
    ];
  },

  getTrajectory: function(playerLocation, power) {
    return this.convertRelativeToActualCoordinates(playerLocation, this.relativeTrajectories[power]);
  },

  convertRelativeToActualCoordinates: function(playerLocation, trajectory) {
    var rowOffset = playerLocation.row;
    var columnOffset = playerLocation.col;
    
    return _.map(trajectory, function(point) {
      return pointRowCol(point.row + rowOffset, point.col + columnOffset);
    });
  },
});