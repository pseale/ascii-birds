"use strict";

var GameController = Class.extend({
  init: function() {
    this.topColumn = new Column();
    this.bottomColumn = new Column();
    this.trajectoryCalculator = new TrajectoryCalculator();

    this.playerLocation = pointRowCol(4, 0); //starting point of game
    this.collided = false;
    this.gameOver = false;
    this.points = 0;
    this.scrollLocation = -1; //game starts displaying player 1 away from left side of screen
  },

  getColumnsInRange: function(column) {
    var loc = this.scrollLocation;
    return _.map(column.findAllNearby(this.playerLocation.col), function(col) { 
      return col - loc;
    });
  },

  shiftTrajectoriesForViewPort: function(trajectories) {
    var newTrajectories = [];
    for (var i=0; i<trajectories.length; i++) {
      newTrajectories.push(this.shiftArrayForViewPort(trajectories[i]));
    }

    return newTrajectories;
  },

  shiftArrayForViewPort: function(array) {
    var newArray = [];
    for (var i=0; i<array.length; i++) {
      newArray.push(this.shiftForViewPort(array[i]));
    }

    return newArray;
  },

  shiftForViewPort: function(point) {
    return pointRowCol(point.row, point.col - this.scrollLocation);
  },

  createViewPort: function() {
    var viewPort = {
      playerLocation: this.shiftForViewPort(this.playerLocation),
      trajectory: this.shiftTrajectoriesForViewPort(this.trajectoryCalculator.getTrajectories(this.playerLocation)),
      topColumns: this.getColumnsInRange(this.topColumn),
      bottomColumns: this.getColumnsInRange(this.bottomColumn),
      collided: this.collided,
      points: this.points,
      gameOver: this.gameOver,
    };

    return viewPort;
  },

  lift: {
    0: -2,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
  },

  move: function(power) {
    if (!(power in this.lift)) {
      throw new Error("Invalid 'power', expected power 0-4, got: " + power);
    }

    if (this.gameOver) {
      throw new Error("Game over, cannot perform any action.");
    }

    var trajectory = this.trajectoryCalculator.getTrajectory(this.playerLocation, power);
    var topCollision = this.topColumn.findCollision(trajectory, 0, 4);
    if (topCollision.collided) {
      this.collided = true;
      this.gameOver = true;
      this.playerLocation = topCollision.point;
      return;
    }

    var bottomCollision = this.bottomColumn.findCollision(trajectory, 6, 9);
    if (bottomCollision.collided) {
      this.collided = true;
      this.gameOver = true;
      this.playerLocation = bottomCollision.point;
      return;
    }

    this.scrollLocation += 2;
    this.playerLocation.col += 2;
    this.playerLocation.row -= this.lift[power];
  },
});