"use strict";

var TrajectoryCalculator = function() {
  var my = function() { };

  var relativeTrajectories = [
    AsciiBirds.TrajectoryVectors.power0,
    AsciiBirds.TrajectoryVectors.power1,
    AsciiBirds.TrajectoryVectors.power2,
    AsciiBirds.TrajectoryVectors.power3,
    AsciiBirds.TrajectoryVectors.power4,
    ];

  my.getTrajectories = function(playerLocation) {
    return [
      convertRelativeToActualCoordinates(playerLocation, AsciiBirds.TrajectoryVectors.power0),
      convertRelativeToActualCoordinates(playerLocation, AsciiBirds.TrajectoryVectors.power1),
      convertRelativeToActualCoordinates(playerLocation, AsciiBirds.TrajectoryVectors.power2),
      convertRelativeToActualCoordinates(playerLocation, AsciiBirds.TrajectoryVectors.power3),
      convertRelativeToActualCoordinates(playerLocation, AsciiBirds.TrajectoryVectors.power4),
    ];
  };

  my.getTrajectory = function(playerLocation, power) {
    return convertRelativeToActualCoordinates(playerLocation, relativeTrajectories[power]);
  };

  function convertRelativeToActualCoordinates(playerLocation, trajectory) {
    var rowOffset = playerLocation.row;
    var columnOffset = playerLocation.col;
    
    return _.map(trajectory, function(point) {
      return pointRowCol(point.row + rowOffset, point.col + columnOffset);
    });
  }

  return my;
}();