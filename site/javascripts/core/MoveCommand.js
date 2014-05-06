"use strict";

var MoveCommand = Class.extend({
  createCollisionResult: function(collision) {
    return {
      collided: true,
      gameOver: true,
      playerLocation: collision.point,
    };
  },

  createMoveResult: function(trajectory) {
    return {
      collided: false,
      gameOver: false,
      playerLocation: trajectory[trajectory.length-1],
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

    return this.createMoveResult(trajectory);
  },  
});
