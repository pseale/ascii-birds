"use strict";

var TrajectoryCalculator = Class.extend({
  init: function() {
    this.relativeTrajectories = [
      this.power0,
      this.power1,
      this.power2,
      this.power3,
      this.power4,
      ];
  },

  getTrajectories: function(playerLocation) {
    return [
      this.convertRelativeToActualCoordinates(playerLocation, this.power0),
      this.convertRelativeToActualCoordinates(playerLocation, this.power1),
      this.convertRelativeToActualCoordinates(playerLocation, this.power2),
      this.convertRelativeToActualCoordinates(playerLocation, this.power3),
      this.convertRelativeToActualCoordinates(playerLocation, this.power4),
    ];
  },

  getTrajectory: function(playerLocation, power) {
    return this.convertRelativeToActualCoordinates(playerLocation, this.relativeTrajectories[power]);
  },

  convertRelativeToActualCoordinates: function(playerLocation, trajectory) {
    var rowOffset = playerLocation.row;
    var columnOffset = playerLocation.col;
    var actualTrajectory = _.map(trajectory, function(point) {
      return pointRowCol(point.row + rowOffset, point.col + columnOffset);
    });

    return _.filter(actualTrajectory, function(point) {
      return point.isLegal();
    });
  },

  power0: [
    pointRowCol(1, 1),
    pointRowCol(2, 2),
  ],

  power1: [
    pointRowCol(0, 1),
    pointRowCol(-1, 2),
  ],

  power2: [
    pointRowCol(-1, 1),
    pointRowCol(-2, 2),
  ],

  power3: [
    pointRowCol(-1, 1),
    pointRowCol(-2, 1),
    pointRowCol(-3, 2),
  ],

  power4: [
    pointRowCol(-1, 1),
    pointRowCol(-2, 1),
    pointRowCol(-3, 2),
    pointRowCol(-4, 2),
  ],
});