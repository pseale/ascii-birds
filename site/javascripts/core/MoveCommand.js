"use strict";

var MoveCommand = Class.extend({
  createCollisionResult: function(collision) {
    return {
      collided: true,
      outOfBounds: false,
      gameOver: true,
      playerLocation: collision.point,
      scoreToAdd: 0,
    };
  },

  outOfBoundsResult: function() {
    return {
      collided: false,
      outOfBounds: true,
      gameOver: true,
      scoreToAdd: 0,
    };
  },

  createMoveResult: function(trajectory) {
    return {
      collided: false,
      outOfBounds: false,
      gameOver: false,
      playerLocation: trajectory[trajectory.length-1],
      scoreToAdd: 0,
    };
  },

  execute: function(trajectory, topColumn, bottomColumn) {
    var topCollision = topColumn.findCollision(trajectory, 0, 4);
    if (topCollision.collided) {
      return this.createCollisionResult(topCollision);
    }

    var bottomCollision = bottomColumn.findCollision(trajectory, 6, 9);
    if (bottomCollision.collided) {
      return this.createCollisionResult(bottomCollision);
    }

    var areAnyPointsOutOfBounds = _.any(trajectory, function(point) {
      return !point.isLegal();
    });

    if (areAnyPointsOutOfBounds) {
      return this.outOfBoundsResult();
    }

    return this.createMoveResult(trajectory);
  },  
});
